import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import TextGothic from "@/components/common/TextGothic";
import BasicInfo from "@/components/home/BasicInfo";
import NewBooks from "@/components/home/NewBooks";
import { api } from "@/utils/api";
import icon_right from "@/img/icon_right.svg";
import main from "@/img/main.png";

export default function Home() {
  const router = useRouter();
  const [newBookList, setNewBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewBooks = async () => {
      try {
        const { data, status } = await api.get(`/api/v1/recent/books`, {
          params: {
            memberId: 2,
            size: 6,
          },
        });
        setNewBookList(data.bookInfoDtoList);

        const { data: categoryData } = await api.get(
          `/api/v1/categories/interest`,
        );
        console.log(categoryData);

        const { data: categoryBookData } = await api.get(
          `/api/v1/categories/${7}/books`,
          {
            params: {
              page: 1,
              size: 3,
            },
          },
        );
        console.log(categoryBookData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewBooks();
  }, []);

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
          <div className={styles.textBox}>
            <TextGothic
              text="함께 즐기는 작은 도서관"
              fontWeight={700}
              fontSize={48}
              lineHeight={48}
              style={{
                display: "block",
                marginBottom: "16px",
              }}
            />
            <TextGothic
              text="리터러리에서 간편하게 도서를 대여하세요!"
              fontWeight={700}
              fontSize={48}
              lineHeight={48}
              style={{
                display: "block",
                marginBottom: "32px",
              }}
            />
            <TextGothic
              text="리터러리에서 도서를 공유해 회사 사람들과 따뜻한 교류를 쌓아보세요."
              fontWeight={400}
              fontSize={28}
              lineHeight={28}
              style={{
                display: "block",
                marginBottom: "32px",
              }}
            />
            <Image src={main} alt="" />
          </div>
        </div>
        <div className={styles.infoBox}>
          <div className={styles.info} onClick={() => router.push("/register")}>
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
          <div className={styles.info} onClick={() => router.push("/rental")}>
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
        <section className={styles.mainSection}>
          {!isLoading && newBookList.length === 0 && <BasicInfo />}
          {!isLoading && newBookList.length > 0 && (
            <NewBooks data={newBookList} />
          )}
        </section>
      </main>
    </>
  );
}
