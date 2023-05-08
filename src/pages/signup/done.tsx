import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/Entrance.module.scss";
import TextGothic from "@/components/common/TextGothic";
import Button from "@/components/common/Button";

export default function Done() {
  const router = useRouter();
  const [nickName, setNickName] = useState("");

  useEffect(() => {
    if (router?.query?.nickname) {
      setNickName(router?.query?.nickname as string);
    }
  }, [router]);

  const onStart = () => {
    router.replace("/signin");
  };

  return (
    <>
      <Head>
        <title>회원가입 완료</title>
        <meta name="description" content="회원가입 완료" />
      </Head>
      <main className={styles.signup}>
        <section className={styles.done}>
          <div>
            <TextGothic
              text={`${nickName}님,`}
              fontWeight={700}
              fontSize={36}
              lineHeight={44}
              style={{ display: "block" }}
            />
            <TextGothic
              text="회원가입이 완료되었어요!"
              fontWeight={700}
              fontSize={36}
              lineHeight={44}
              style={{ display: "block", marginBottom: "16px" }}
            />
            <TextGothic
              text="리터러리에서 간편하게 도서를 대여하세요!"
              fontWeight={400}
              fontSize={16}
              lineHeight={24}
              style={{ display: "block", marginBottom: "96px" }}
            />
          </div>
          <Button
            text="리터러리 시작하기"
            onClick={onStart}
            textColor="#1a1a1a"
            backgroundColor="#00FFB2"
          />
        </section>
      </main>
    </>
  );
}
