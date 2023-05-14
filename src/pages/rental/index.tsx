import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Text from "@/components/common/Text";
import TextGothic from "@/components/common/TextGothic";
import { CATEGORY_KO } from "@/utils";
import { api } from "@/utils/api";
import icon_heart from "@/img/icon_heart.svg";
import icon_search from "@/img/icon_search.svg";
import icon_sort from "@/img/icon_sort.svg";

export default function Register() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [bookList, setBookList] = useState<any[]>([]);

  useEffect(() => {
    const fetchRental = async () => {
      const { data, status } = await api.get(`/api/v1/books/rentals`, {
        params: {
          searchType: "NEW",
          bookCategory: "",
          searchKeyword: "",
          page: 1,
          size: 10,
        },
      });
      setBookList(data.rentalBookResponseList);
      setTotalPage(data.totalPage);
      setCurrentPage(data.page);
    };
    fetchRental();
  }, []);

  return (
    <>
      <Head>
        <title>대여 신청하기</title>
        <meta name="description" content="대여 신청하기" />
      </Head>
      <main className={styles.rentalWrapper}>
        <div className={styles.top}>
          <div className={styles.title}>
            <TextGothic
              text="대여 신청하기"
              fontWeight={700}
              fontSize={33}
              lineHeight={44}
            />
            <div className={styles.option}>
              <div className={styles.search}>
                <Image src={icon_search} alt="" />
                <TextGothic
                  text="검색"
                  fontWeight={700}
                  fontSize={16}
                  lineHeight={24}
                />
              </div>
              <div className={styles.sort}>
                <Image src={icon_sort} alt="" />
                <TextGothic
                  text="신규 순"
                  fontWeight={700}
                  fontSize={16}
                  lineHeight={24}
                />
              </div>
            </div>
          </div>
          <TextGothic
            text="리터러리에 등록된 도서를 대여 신청할 수 있어요."
            fontWeight={500}
            fontSize={16}
            lineHeight={24}
          />
        </div>
        <div className={styles.tagBox}>
          {["전체"].concat(Object.values(CATEGORY_KO)).map((v, i) => (
            <div key={i} className={styles.tag}>
              <TextGothic
                text={v}
                fontWeight={400}
                fontSize={16}
                lineHeight={24}
              />
            </div>
          ))}
        </div>
        <div className={styles.bookList}>
          {bookList.map((v) => (
            <div key={v.id} className={styles.bookCard}>
              <div className={styles.bookBox}>
                <Image
                  className={styles.bookImg}
                  src={v.imageUrl}
                  alt=""
                  width={143}
                  height={204}
                />
                <div className={styles.info}>
                  <TextGothic
                    text={v.title}
                    fontWeight={700}
                    fontSize={20}
                    lineHeight={28}
                    style={{
                      display: "block",
                      marginBottom: "8px",
                    }}
                  />
                  <TextGothic
                    text={`${v.author} | ${v.bookCategory}`}
                    fontWeight={500}
                    fontSize={16}
                    lineHeight={24}
                    style={{
                      display: "block",
                      marginBottom: "24px",
                    }}
                  />
                  <TextGothic
                    text={v.content}
                    fontWeight={400}
                    fontSize={16}
                    lineHeight={24}
                    style={{
                      display: "block",
                      marginBottom: "24px",
                    }}
                  />
                  <div className={styles.like}>
                    <Image src={icon_heart} alt="" />
                    <Text
                      text={v.recommendCount}
                      fontWeight={400}
                      fontSize={16}
                      lineHeight={24}
                    />
                  </div>
                </div>
              </div>
              {v.rentalUseYn == "Y" ? (
                <div
                  className={styles.rentalButton}
                  onClick={() => router.push(`/rental/${v.id}`)}
                >
                  <TextGothic
                    text="신청하기"
                    fontWeight={700}
                    fontSize={16}
                    lineHeight={24}
                    color="#fff"
                  />
                </div>
              ) : (
                <div
                  style={{
                    marginLeft: "135px",
                    width: "101px",
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.pagenationBox}>
          {[...Array(totalPage)].map((v, i) => (
            <div key={i}>
              <Text
                text={(i + 1).toString()}
                fontWeight={currentPage === i + 1 ? 700 : 400}
                fontSize={16}
                lineHeight={24}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
