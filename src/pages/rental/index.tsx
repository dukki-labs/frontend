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

      // const data = {
      //   page: 1,
      //   size: 10,
      //   totalCount: 5,
      //   totalPage: 1,
      //   last: true,
      //   rentalBookResponseList: [
      //     {
      //       id: 8,
      //       author: "박경리 지음",
      //       content:
      //         "43년 만에 다시 태어나는 박경리의 &lt;토지&gt;. 이번 마로니에북스판 &lt;토지&gt;는 &lt;토지&gt; 출간 이후 43년 동안 연재와 출판을 거듭하며 와전되거나 훼손되었던 작가의 원래 의도를 복원한 판본이란 점에서 큰 의미를 지닌다.",
      //       createdAt: "2023-04-13T12:04:41.641425",
      //       deadLine: "ONE_WEEK",
      //       imageUrl:
      //         "https://image.aladin.co.kr/product/1889/81/cover150/896053241x_1.jpg",
      //       publishDate: "2012-08-14",
      //       publisher: "마로니에북스",
      //       recommendCount: 0,
      //       returnLocation: "제자리",
      //       review: "",
      //       title: "토지 1 - 1부 1권",
      //       updatedAt: "2023-04-13T12:04:41.641436",
      //       categoryId: 12,
      //       bookCategory: "OTHER",
      //       companyId: 2,
      //       memberId: 2,
      //       rentalUseYn: "Y",
      //       newTag: "NEW",
      //     },
      //     {
      //       id: 7,
      //       author: "호프 자렌 지음, 김희정 옮김",
      //       content:
      //         "2016년 출간과 함께 베스트셀러에 오르며 뜨거운 관심을 받은 &lt;랩걸-나무, 과학 그리고 사랑&gt;이 출간되었다. 올리버 색스와 제이 굴드의 부재를 아쉬워하던 독자들에게 호프 자런이라는 ‘좋은 글을 쓰는 과학자의 등장’은 무엇보다 반가운 소식이다.",
      //       createdAt: "2023-04-13T11:28:12.985077",
      //       deadLine: "TWO_WEEK",
      //       imageUrl:
      //         "https://image.aladin.co.kr/product/10189/11/cover150/k852536383_2.jpg",
      //       publishDate: "2017-02-16",
      //       publisher: "알마",
      //       recommendCount: 0,
      //       returnLocation: "내자리요",
      //       review: "",
      //       title: "랩 걸 - 나무, 과학 그리고 사랑",
      //       updatedAt: "2023-04-13T11:28:12.985082",
      //       categoryId: 6,
      //       bookCategory: "SCIENCE_TECHNOLOGY",
      //       companyId: 2,
      //       memberId: 2,
      //       rentalUseYn: "Y",
      //       newTag: "NEW",
      //     },
      //     {
      //       id: 6,
      //       author: "헤르만 헤세 지음, 이미영 옮김, 김선형",
      //       content:
      //         "헤르만 헤세의 ‘영혼의 전기’로 소개되는 《데미안》은 깊이 있는 정신분석과 자기 탐구로 가시밭 같은 자아 성찰의 길을 섬세하게 그려낸 그의 대표작이다. 이 책을 1919년 오리지널 초판본의 우아한 표지로 다시 만나보자.",
      //       createdAt: "2023-04-05T12:19:52.895261",
      //       deadLine: "THREE_WEEK",
      //       imageUrl:
      //         "https://image.aladin.co.kr/product/9871/8/cover150/k042535550_2.jpg",
      //       publishDate: "2016-12-31",
      //       publisher: "코너스톤",
      //       recommendCount: 0,
      //       returnLocation: "제 자리",
      //       review: "좋아요!",
      //       title: "데미안 (오리지널 초판본 표지디자인) - 최신 원전 완역본",
      //       updatedAt: "2023-04-05T12:19:52.895276",
      //       categoryId: 8,
      //       bookCategory: "LITERATURE",
      //       companyId: 2,
      //       memberId: 2,
      //       rentalUseYn: "Y",
      //       newTag: "NEW",
      //     },
      //     {
      //       id: 5,
      //       author: "칼 세이건 지음, 홍승수 옮김",
      //       content:
      //         "칼 세이건의 <코스모스> 특별판이 세이건의 서거 10주기를 기념하여 출간되었다. 이 특별판은 지난 2004년 12월에 출간된 <코스모스>(양장본)의 텍스트 전문과 도판 일부를 사용하고 판형을 휴대하기 쉬운 신국판으로 바꿔 출간한 책으로, 독자들이 좀 더 쉽게 칼 세이건의 메시지를 만날 수 있도록 배려한 책이다.",
      //       createdAt: "2023-04-04T13:37:47.51754",
      //       deadLine: "THREE_WEEK",
      //       imageUrl:
      //         "https://image.aladin.co.kr/product/87/9/cover150/s922637499_3.jpg",
      //       publishDate: "2006-12-19",
      //       publisher: "사이언스북스",
      //       recommendCount: 0,
      //       returnLocation: "내자리",
      //       review: "창백한 푸른 점",
      //       title: "코스모스 - 보급판",
      //       updatedAt: "2023-04-04T13:37:47.517556",
      //       categoryId: 6,
      //       bookCategory: "SCIENCE_TECHNOLOGY",
      //       companyId: 2,
      //       memberId: 2,
      //       rentalUseYn: "Y",
      //       newTag: "NEW",
      //     },
      //     {
      //       id: 4,
      //       author: "헨리 데이비드 소로우 지음, 강승영 옮김",
      //       content:
      //         "19세기 미국의 위대한 저술가이자 사상가인 헨리 데이빗 소로우의 대표작 &lt;월든&gt;은 시간이 지날수록 그 가치를 더해가고 전 세계 독자들을 끊임없이 새로이 각성시키는 불멸의 고전이다. 그동안 국내에 수많은 번역본이 출간되었지만, 강승영 번역의 &lt;월든&gt; 2011년 개정판이 새롭게 출간되었다.",
      //       createdAt: "2023-04-04T12:55:44.046676",
      //       deadLine: "TWO_WEEK",
      //       imageUrl:
      //         "https://image.aladin.co.kr/product/1284/8/cover150/8956605416_3.jpg",
      //       publishDate: "2011-08-21",
      //       publisher: "은행나무",
      //       recommendCount: 0,
      //       returnLocation: "내자리!",
      //       review: "무소유의 경지는 언제 올까.",
      //       title: "월든 - 완결판",
      //       updatedAt: "2023-04-04T12:55:44.046679",
      //       categoryId: 8,
      //       bookCategory: "LITERATURE",
      //       companyId: 2,
      //       memberId: 2,
      //       rentalUseYn: "Y",
      //       newTag: "NEW",
      //     },
      //   ],
      // };
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
                    text={`${v.publisher} | ${v.bookCategory}`}
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
              <div className={styles.rentalButton}>
                <TextGothic
                  text="대여하기"
                  fontWeight={700}
                  fontSize={16}
                  lineHeight={24}
                  color="#fff"
                />
              </div>
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
