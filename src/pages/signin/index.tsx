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

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(0);
  const [isEyeOn, setIsEyeOn] = useState(false);
  const router = useRouter();
  const { setMemberId } = UseMemberId();

  const onSignIn = async () => {
    const { data, status } = await api.post(`/api/v1/account/login`, {
      email,
      password,
    });
    console.log(data);
    if (status === 200) {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;
      router.replace("/");
      setMemberId(data.memberId);
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
            <TextGothic
              text="우리만의 작은 도서관"
              fontWeight={700}
              fontSize={36}
              lineHeight={44}
              style={{
                display: "block",
                marginBottom: "8px",
              }}
            />
            <TextGothic
              text="리터러리를 만나보세요!"
              fontWeight={700}
              fontSize={36}
              lineHeight={44}
            />
          </div>
          <div className={styles.singinBox}>
            <div className={`${styles.inputBox} ${active === 1 && styles.on}`}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
                onFocus={() => setActive(1)}
                onBlur={() => setActive(0)}
              />
            </div>
            <div className={`${styles.inputBox} ${active === 2 && styles.on}`}>
              <input
                value={password}
                type={isEyeOn ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="패스워드"
                onFocus={() => setActive(2)}
                onBlur={() => setActive(0)}
              />
              <Image
                src={isEyeOn ? icon_eye_on : icon_eye_off}
                alt=""
                onClick={() => setIsEyeOn(!isEyeOn)}
              />
            </div>
            <div
              className={`${styles.button} ${
                email && password ? styles.on : ""
              }`}
              onClick={email && password ? onSignIn : () => {}}
            >
              <TextGothic
                text="로그인하기"
                fontWeight={700}
                fontSize={20}
                lineHeight={28}
                color="white"
              />
            </div>
            <div className={styles.lost}>
              <Text
                text="이런, 계정을 분실했나요?"
                fontSize={16}
                lineHeight={24}
              />
            </div>
            <div
              className={styles.signupButton}
              onClick={() => router.push("/signup")}
            >
              <TextGothic
                text="리터러리 가입하기"
                fontWeight={700}
                fontSize={20}
                lineHeight={28}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
