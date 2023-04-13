import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import TextGothic from "@/components/common/TextGothic";
import BasicInfo from "@/components/home/BasicInfo";
import icon_right from "@/img/icon_right.svg";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Litarary</title>
        <meta name="description" content="litarary" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}></div>
        <div className={styles.infoBox}>
          <div className={styles.info}>
            <div className={styles.text}>
              <TextGothic
                text="도서 등록하기"
                fontWeight={700}
                fontSize={20}
                lineHeight={28}
                style={{
                  display: "block",
                  marginBottom: "8px",
                }}
              />
              <TextGothic
                text="보유 중인 도서를 등록하고 싶어요."
                fontWeight={400}
                fontSize={16}
                lineHeight={24}
              />
            </div>
            <Image src={icon_right} alt="" />
          </div>
          <div className={styles.info}>
            <div className={styles.text}>
              <TextGothic
                text="대여 신청하기"
                fontWeight={700}
                fontSize={20}
                lineHeight={28}
                style={{
                  display: "block",
                  marginBottom: "8px",
                }}
              />
              <TextGothic
                text="읽고 싶은 도서를 대여하고 싶어요."
                fontWeight={400}
                fontSize={16}
                lineHeight={24}
              />
            </div>
            <Image src={icon_right} alt="" />
          </div>
          <div className={styles.info}>
            <div className={styles.text}>
              <TextGothic
                text="도서 반납하기"
                fontWeight={700}
                fontSize={20}
                lineHeight={28}
                style={{
                  display: "block",
                  marginBottom: "8px",
                }}
              />
              <TextGothic
                text="대여했던 도서를 반납하고 싶어요."
                fontWeight={400}
                fontSize={16}
                lineHeight={24}
              />
            </div>
            <Image src={icon_right} alt="" />
          </div>
        </div>
        <BasicInfo />
      </main>
    </>
  );
}
