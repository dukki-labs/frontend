import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/Profile.module.scss";
import stylesEntrance from "@/styles/Entrance.module.scss";
import TextGothic from "@/components/common/TextGothic";
import Button from "@/components/common/Button";
import { CATEGORY_KO } from "@/utils";
import { api } from "@/utils/api";

const CATEGORY_LIST = [
  ["HISTORY_CULTURE", "EDUCATION"],
  ["FAMILY_LIFE", "HOBBY"],
  ["ECONOMIC_MANAGEMENT", "SCIENCE_TECHNOLOGY"],
  ["COMPUTER_MOBILE", "LITERATURE"],
  ["ENTERTAINMENT", "SELF_DEVELOPMENT"],
  ["LANGUAGE", "OTHER"],
];

export default function Register() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>({});
  const [selectedTab, setSelectedTab] = useState(0);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [interest, setInterest] = useState<string[]>([]);

  useEffect(() => {
    const fetchRental = async () => {
      const { data } = await api.get(`/api/v1/profile`);
      setProfile(data);
      setNickName(data.nickName);
      setInterest(data.categoryInfoList.map((v: any) => v.bookCategory));
    };
    fetchRental();
  }, []);

  const onClickInterest = (v: string) => {
    setInterest((prev: string[]) => {
      if (prev.includes(v)) {
        return prev.filter((p) => p !== v);
      }
      if (prev.length === 4) {
        return prev;
      }
      return prev.concat(v);
    });
  };

  const onSubmit = () => {
    console.log(password);
    console.log(nickName);
    console.log(interest);
  };

  return (
    <>
      <Head>
        <title>마이페이지</title>
        <meta name="description" content="마이페이지" />
      </Head>
      <main className={styles.main}>
        <div className={styles.my}>
          <div className={styles.left}>
            <TextGothic
              text={`${profile.nickName || ""}님`}
              fontWeight={700}
              fontSize={30}
              lineHeight={38}
              style={{
                display: "block",
                marginBottom: "64px",
              }}
            />
            <TextGothic
              text="회원정보 변경"
              fontWeight={700}
              fontSize={20}
              lineHeight={28}
              style={{
                display: "block",
                marginBottom: "16px",
              }}
            />
            <TextGothic
              text="도서 이용내역"
              fontWeight={400}
              fontSize={20}
              lineHeight={28}
              style={{
                display: "block",
                marginBottom: "64px",
              }}
            />
            <div className={styles.logout}>
              <TextGothic
                text="로그아웃"
                fontWeight={700}
                fontSize={16}
                lineHeight={24}
              />
            </div>
          </div>
          <div className={styles.right}>
            <TextGothic
              text="회원정보 변경"
              fontWeight={700}
              fontSize={30}
              lineHeight={38}
              style={{
                display: "block",
                marginBottom: "38px",
              }}
            />
            <div className={styles.tabs}>
              <div
                className={`${styles.tab} ${selectedTab === 0 && styles.on}`}
                onClick={() => setSelectedTab(0)}
              >
                <TextGothic
                  text="기본 정보"
                  fontWeight={700}
                  fontSize={20}
                  lineHeight={28}
                />
              </div>
              <div
                className={`${styles.tab} ${selectedTab === 1 && styles.on}`}
                onClick={() => setSelectedTab(1)}
              >
                <TextGothic
                  text="관심사"
                  fontWeight={700}
                  fontSize={20}
                  lineHeight={28}
                />
              </div>
            </div>
            {selectedTab === 0 && (
              <div className={styles.infos}>
                <TextGothic
                  text="이메일"
                  fontWeight={700}
                  fontSize={16}
                  lineHeight={24}
                  style={{
                    display: "block",
                    marginBottom: "16px",
                  }}
                />
                <div className={styles.input}>
                  <input value={profile.email || ""} disabled={true} />
                </div>
                <TextGothic
                  text="패스워드"
                  fontWeight={700}
                  fontSize={16}
                  lineHeight={24}
                  style={{
                    display: "block",
                    margin: "32px 0 16px",
                  }}
                />
                <div className={styles.input}>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="패스워드 입력(8자 이상)"
                  />
                </div>
                <div className={styles.input}>
                  <input
                    type="password"
                    value={passwordCheck}
                    onChange={(e) => setPasswordCheck(e.target.value)}
                    placeholder="패스워드 재입력"
                  />
                </div>
                <TextGothic
                  text="닉네임"
                  fontWeight={700}
                  fontSize={16}
                  lineHeight={24}
                  style={{
                    display: "block",
                    margin: "32px 0 16px",
                  }}
                />
                <div className={styles.input}>
                  <input
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                    placeholder="닉네임 입력"
                  />
                </div>
              </div>
            )}
            {selectedTab === 1 && (
              <div className={styles.infos}>
                <div className={stylesEntrance.interest}>
                  {CATEGORY_LIST.map((list, i) => (
                    <div key={i} className={stylesEntrance.box}>
                      {list.map((v, idx) => (
                        <div
                          key={idx}
                          className={`${stylesEntrance.card} ${
                            interest.includes(v) ? stylesEntrance.on : ""
                          } ${
                            interest.length === 4 &&
                            !interest.includes(v) &&
                            stylesEntrance.off
                          }`}
                          onClick={() => onClickInterest(v)}
                        >
                          <TextGothic
                            text={CATEGORY_KO[v]}
                            fontWeight={interest.includes(v) ? 700 : 400}
                            fontSize={16}
                            lineHeight={24}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <Button
              text="변경하기"
              onClick={onSubmit}
              textColor="#ffffff"
              backgroundColor="#1A1A1A"
            />
          </div>
        </div>
      </main>
    </>
  );
}
