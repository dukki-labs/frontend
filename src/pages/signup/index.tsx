import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/Entrance.module.scss";
import Title from "@/components/signup/Title";
import Terms from "@/components/signup/Terms";
import UserInfo from "@/components/signup/UserInfo";
import Interest from "@/components/signup/Interest";
import { api } from "@/utils/api";

export default function SignUp() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [terms, setTerms] = useState<boolean[]>([false, false, false]);
  const [userInfo, setUserInfo] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
    nickName: "",
  });
  const [interest, setInterest] = useState<string[]>([]);

  const onClickTerm = (idx: number) => {
    if (idx === 3) {
      const agreeCnt = terms.filter((v) => v).length;
      if (agreeCnt === 3) {
        setTerms([false, false, false]);
        return;
      } else {
        setTerms([true, true, true]);
        return;
      }
    }
    setTerms((prev) => {
      return prev.map((v, i) => {
        if (i === idx) {
          return !v;
        }
        return v;
      });
    });
  };

  const onClickButton = async () => {
    if (step === 1) {
      setStep(2);
      return;
    }
    if (step === 3) {
      console.log(interest);
      const body = {
        nickName: userInfo.nickName,
        email: userInfo.email,
        password: userInfo.password,
        accessRoles: ["USER"],
        serviceTerms: terms[0],
        privacyTerms: terms[1],
        serviceAlarm: terms[2],
      };
      console.log(body);
      const { status } = await api.post(`/api/v1/account/sign-up`, {
        ...body,
      });
      if (status === 200) {
        router.replace("/signup/done");
      }
    }
  };
  const onClickUserInfo = (e: string, p: string, n: string) => {
    setUserInfo({
      email: e,
      password: p,
      nickName: n,
    });
    setStep(3);
  };

  return (
    <>
      <Head>
        <title>signup</title>
        <meta name="description" content="회원가입" />
      </Head>
      <main className={styles.signup}>
        <section>
          <div className={styles.bar}>
            <div className={styles.progress}></div>
            {step === 1 && <div className={styles.step} />}
            {step === 2 && <div className={`${styles.step} ${styles.two}`} />}
            {step === 3 && <div className={`${styles.step} ${styles.three}`} />}
          </div>
          <Title step={step} />
          {step === 1 && (
            <Terms
              terms={terms}
              onClickTerm={onClickTerm}
              onClickButton={onClickButton}
            />
          )}
          {step === 2 && <UserInfo onClickButton={onClickUserInfo} />}
          {step === 3 && (
            <Interest
              interest={interest}
              setInterest={setInterest}
              onClickButton={onClickButton}
            />
          )}
        </section>
      </main>
    </>
  );
}
