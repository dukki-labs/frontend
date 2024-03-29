import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Text from "@/components/common/Text";
import TextGothic from "@/components/common/TextGothic";
import styles from "@/styles/Entrance.module.scss";
import { api } from "@/utils/api";
import UseMemberId from "@/utils/useMemberId";
import icon_eye_on from "@/img/icon_eye_on.svg";
import icon_eye_off from "@/img/icon_eye_off.svg";
import icon_signin_logo from "@/img/icon_signin_logo.png";
import icon_logo_small from "@/img/icon_logo_small.svg";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(0);
  const [isEyeOn, setIsEyeOn] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const { setMemberId } = UseMemberId();

  const onSignIn = async () => {
    try {
      const { data, status } = await api.post(`/api/v1/account/login`, {
        email,
        password,
      });
      if (status === 200) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        router.replace("/");
        setMemberId(data.memberId);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  return (
    <>
      <Head>
        <title>signin</title>
        <meta name="description" content="로그인" />
      </Head>
      <main className={styles.signin}>
        <div className={styles.signinWrapper}>
          <div className={styles.title}>
            <Image src={icon_signin_logo} alt="" />
          </div>
          <div className={styles.singinBox}>
            <div
              className={`${styles.inputBox} ${active === 1 && styles.on} ${
                isError && styles.error
              }`}
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 입력"
                onFocus={() => setActive(1)}
                onBlur={() => setActive(0)}
              />
            </div>
            {isError && (
              <Text
                text="로그인정보를 확인해주세요!"
                fontWeight={400}
                fontSize={14}
                lineHeight={20}
                color="#FF007A"
                style={{
                  display: "block",
                  margin: "8px 0 16px",
                }}
              />
            )}
            <div
              className={`${styles.inputBox} ${active === 2 && styles.on} ${
                isError && styles.error
              }`}
            >
              <input
                value={password}
                type={isEyeOn ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="패스워드 입력"
                onFocus={() => setActive(2)}
                onBlur={() => setActive(0)}
              />
              {password && (
                <Image
                  src={isEyeOn ? icon_eye_on : icon_eye_off}
                  alt=""
                  onClick={() => setIsEyeOn(!isEyeOn)}
                />
              )}
            </div>
            {isError && (
              <Text
                text="로그인정보를 확인해주세요!"
                fontWeight={400}
                fontSize={14}
                lineHeight={20}
                color="#FF007A"
                style={{
                  display: "block",
                  margin: "8px 0 0",
                }}
              />
            )}
            <div
              className={`${styles.signinButton} ${
                email && password ? styles.on : ""
              }`}
              onClick={email && password ? onSignIn : () => {}}
            >
              <TextGothic
                text="로그인하기"
                fontWeight={700}
                fontSize={16}
                lineHeight={24}
                color="white"
              />
            </div>
            <div
              className={styles.signupButton}
              onClick={() => router.push("/signup")}
            >
              <Image src={icon_logo_small} alt="" />
              <TextGothic
                text="리터러리 가입하기"
                fontWeight={700}
                fontSize={16}
                lineHeight={24}
              />
            </div>
            <div className={styles.lost}>
              <Text
                text="패스워드를 분실했나요?"
                fontWeight={400}
                fontSize={16}
                lineHeight={24}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
