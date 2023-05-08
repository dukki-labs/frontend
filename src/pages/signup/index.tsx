import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/Entrance.module.scss";
import Title from "@/components/signup/Title";
import Terms from "@/components/signup/Terms";
import UserInfo from "@/components/signup/UserInfo";
import Interest from "@/components/signup/Interest";
import { api } from "@/utils/api";
import UseAlertModal from "@/utils/useAlertModal";

export default function SignUp() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [terms, setTerms] = useState<boolean[]>([false, false, false]);
  const [userInfo, setUserInfo] = useState<{ [key: string]: string | number }>({
    memberId: 0,
    email: "",
    password: "",
    nickName: "",
  });
  const [interest, setInterest] = useState<string[]>([]);
  const { alertModal, setAlertModal } = UseAlertModal();

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
    try {
      if (step === 1) {
        setStep(2);
        return;
      }
      if (step === 2) {
        const body = {
          memberId: userInfo.memberId,
          nickName: userInfo.nickName,
          email: userInfo.email,
          password: userInfo.password,
          accessRoles: ["USER"],
          serviceTerms: terms[0],
          privacyTerms: terms[1],
          serviceAlarm: terms[2],
          bookCategoryList: interest,
        };
        // console.log(body);
        const { status } = await api.post(`/api/v1/account/sign-up`, {
          ...body,
        });
        if (status === 201) {
          router.replace(`/signup/done?nickname=${userInfo.nickName}`);
        }
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.errorMessage;
      setAlertModal({
        title: "안내",
        desc: errorMessage,
        buttonText: "확인",
        isOpen: true,
        onConfirm: () => {
          setAlertModal((prev) => ({ ...prev, isOpen: false }));
        },
      });
    }
  };

  const onClickUserInfo = (i: number, e: string, p: string, n: string) => {
    setUserInfo({
      memberId: i,
      email: e,
      password: p,
      nickName: n,
    });
    setStep(2);
  };

  return (
    <>
      <Head>
        <title>signup</title>
        <meta name="description" content="회원가입" />
      </Head>
      <main className={styles.signup}>
        <section className={styles.section}>
          <Title step={step} />
          {step === 1 && (
            <UserInfo
              terms={terms}
              onClickTerm={onClickTerm}
              onClickButton={onClickUserInfo}
            />
          )}
          {step === 2 && (
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
