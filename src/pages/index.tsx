import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import TextGothic from "@/components/common/TextGothic";

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
        <div className={styles.center}>
          <TextGothic
            text={`우리 회사가 도서관으로!\n`}
            fontWeight={700}
            fontSize={48}
            lineHeight={64}
            color="white"
          />
          <TextGothic
            text={`부담없고 간편하게 도서를 공유해요.`}
            fontWeight={700}
            fontSize={48}
            lineHeight={64}
            color="white"
          />
          <TextGothic
            text="리터러리는 도서 공유로 사내 구성원과 교류를 쌓을 수 있는 곳이에요."
            fontWeight={400}
            fontSize={20}
            lineHeight={28}
            color="white"
            style={{
              display: "block",
              marginTop: "24px",
              marginBottom: "96px",
            }}
          />
          <div
            className={styles.button}
            onClick={() => router.push("/register")}
          >
            <TextGothic
              text="도서 등록하기"
              fontWeight={700}
              fontSize={24}
              lineHeight={32}
              color="#1A1A1A"
            />
          </div>
        </div>
        <div className={styles.info1}>
          <div></div>
          <div>
            <TextGothic
              text={`평소 인상깊게 읽었던 도서를\n`}
              fontWeight={700}
              fontSize={48}
              lineHeight={64}
              color="#1A1A1A"
            />
            <TextGothic
              text={`사내 구성원에 공유해요.`}
              fontWeight={700}
              fontSize={48}
              lineHeight={64}
              color="#1A1A1A"
            />
            <TextGothic
              text="평소에 인상깊게 읽었고 공유하고 싶었던 도서를 가지고 있나요? 하루 중에 가장 오래 머물고 있는 사무실에서, 누군가도 그 도서를 읽고 싶을 수 있어요. 리터러리에서 도서를 공유하고 사내 구성원과 따뜻함을 공유해 보세요!"
              fontWeight={400}
              fontSize={20}
              lineHeight={28}
              color="#1A1A1A"
              style={{
                display: "block",
                marginTop: "24px",
              }}
            />
          </div>
        </div>
        <div className={styles.info2}>
          <TextGothic
            text="등록된 도서를 빌려보고, 반납해요."
            fontWeight={700}
            fontSize={48}
            lineHeight={64}
            color="#1A1A1A"
          />
          <div className={styles.detail}>
            <div className={styles.left}>
              <TextGothic
                text="빌려보기"
                fontWeight={700}
                fontSize={32}
                lineHeight={40}
                color="#1A1A1A"
                style={{
                  display: "block",
                  marginBottom: "24px",
                }}
              />
              <TextGothic
                text="내 도서가 등록되면 사내 구성원만 빌려볼 수 있고, 한 명이 한 권씩 빌려볼 수 있어서 분실할 확률이 적어요! 도서를 빌리고 반납하는 장소를 잘 살펴보고, 빌리면서 한 마디 따뜻한 대화를 나누어 보세요."
                fontWeight={400}
                fontSize={20}
                lineHeight={28}
                color="#1A1A1A"
              />
            </div>
            <div className={styles.right}>
              <TextGothic
                text="반납하기"
                fontWeight={700}
                fontSize={32}
                lineHeight={40}
                color="#1A1A1A"
                style={{
                  display: "block",
                  marginBottom: "24px",
                }}
              />
              <TextGothic
                text="분쟁을 막기 위해 빌린 도서를 반납 시기에 맞추어 깨끗하게 반납할 수 있도록 해주세요. 도서를 추천하면 사내 구성원들이 참고할 수 있어요!"
                fontWeight={400}
                fontSize={20}
                lineHeight={28}
                color="#1A1A1A"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
