import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/Entrance.module.scss";
import TextGothic from "@/components/common/TextGothic";
import Button from "@/components/common/Button";

export default function Done() {
  const router = useRouter();

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
        <section>
          <div>
            <TextGothic
              text={`닉네임님,`}
              fontWeight={700}
              fontSize={36}
              lineHeight={44}
              style={{ display: "block" }}
            />
            <TextGothic
              text="리터러리 가입이 완료되었어요!"
              fontWeight={700}
              fontSize={36}
              lineHeight={44}
              style={{ display: "block", marginBottom: "16px" }}
            />
            <TextGothic
              text="사무실 속 작은 도서관, 리터러리에서 만나보세요!"
              fontWeight={400}
              fontSize={20}
              lineHeight={28}
              style={{ display: "block", marginBottom: "80px" }}
            />
          </div>
          <Button
            text="리터러리 시작하기"
            onClick={onStart}
            textColor="white"
            backgroundColor="#1a1a1a"
          />
        </section>
      </main>
    </>
  );
}
