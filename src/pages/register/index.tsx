import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Text from "@/components/common/Text";
import TextGothic from "@/components/common/TextGothic";
import Button from "@/components/common/Button";
import { api } from "@/utils/api";
import icon_close from "@/img/icon_close_black.svg";

interface SearchResult {
  title: string;
  author: string;
  pubDate: string;
  description: string;
  imageUrl: string;
  categoryMapId: number;
  bookCategory: string;
  publisher: string;
}
interface Input {
  type: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const Input = ({ type, value, onChange, placeholder }: Input) => {
  return (
    <div className={styles.inputBox}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default function Register() {
  const router = useRouter();
  const [keyward, setKeyward] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [selectedBook, setSelectBook] = useState<SearchResult[]>([]);
  const [period, setPeriod] = useState("1주");
  const [place, setPlace] = useState("");
  const [comment, setComment] = useState("");

  const onSearch = async () => {
    setSelectBook([]);
    const { data, status } = await api.get(`/api/v1/books/container/search`, {
      params: {
        searchKeyword: "코스모스",
        page: 1,
        size: 10,
      },
    });
    console.log(data);
    // const data = {
    //   page: 1,
    //   size: 5,
    //   totalCount: 10,
    //   bookList: [
    //     {
    //       title: "자바 ORM 표준 JPA 프로그래밍",
    //       author: "김영한 지음",
    //       pubDate: "2015-07-27",
    //       description: "도서 내용 설명",
    //       imageUrl:
    //         "https://image.aladin.co.kr/product/6268/14/cover150/8960777331_1.jpg",
    //       categoryMapId: 33,
    //       bookCategory: "Computer_Mobile",
    //       publisher: "에이콘출판",
    //     },
    //     {
    //       title: "코스모스 - 보급판",
    //       author: "칼 세이건 (지은이), 홍승수 (옮긴이)",
    //       pubDate: "2006-12-20",
    //       description: "도서 내용 설명",
    //       imageUrl:
    //         "https://image.aladin.co.kr/product/87/9/coversum/s922637499_3.jpg",
    //       categoryMapId: 33,
    //       bookCategory: "Science",
    //       publisher: "사이언스북스",
    //     },
    //   ],
    // };
    // setSearchResult(data.bookList);
  };

  const onSelectBook = (book: SearchResult) => {
    setSelectBook([book]);
  };

  const onRegister = () => {
    const body = {
      selectedBook,
      period,
      place,
      comment,
    };
    console.log(body);
  };

  return (
    <>
      <Head>
        <title>도서 등록하기</title>
        <meta name="description" content="도서 등록하기" />
      </Head>
      <main className={styles.registerWrapper}>
        <div className={styles.registerBox}>
          <TextGothic
            text="도서 등록하기"
            fontWeight={700}
            fontSize={33}
            lineHeight={44}
            style={{
              display: "block",
              marginBotton: "80px",
            }}
          />
          <div className={styles.inputWrapper}>
            <div className={styles.register}>
              <TextGothic
                text="도서 검색"
                fontWeight={700}
                fontSize={20}
                lineHeight={28}
                style={{
                  display: "block",
                  marginBottom: "16px",
                }}
              />
              <div className={styles.search}>
                <Input
                  type="text"
                  value={keyward}
                  onChange={setKeyward}
                  placeholder="보유하고 있는 도서를 검색해 주세요."
                />
                <div
                  className={`${styles.searchButton} ${
                    keyward ? styles.on : ""
                  }`}
                  onClick={onSearch}
                >
                  <TextGothic
                    text="검색"
                    fontWeight={700}
                    fontSize={20}
                    lineHeight={28}
                    color="white"
                  />
                </div>
              </div>
            </div>
            {searchResult.length > 0 && (
              <div className={styles.searchResultBox}>
                <TextGothic
                  text="검색과 연관있는 도서가 있어요!"
                  fontWeight={700}
                  fontSize={20}
                  lineHeight={28}
                  style={{
                    display: "block",
                    marginBottom: "20px",
                  }}
                />
                {selectedBook.length === 0 ? (
                  <div className={styles.searchResultList}>
                    {searchResult.map((v, i) => (
                      <div key={i} className={styles.searchResult}>
                        <div className={styles.bookInfo}>
                          <Image
                            src={v.imageUrl}
                            alt=""
                            width={85}
                            height={120}
                          />
                          <div className={styles.bookDesc}>
                            <div className={styles.category}>
                              <Text
                                text={v.bookCategory}
                                fontWeight={500}
                                fontSize={14}
                                lineHeight={20}
                                color="#999999"
                              />
                            </div>
                            <TextGothic
                              text={v.title}
                              fontWeight={700}
                              fontSize={20}
                              lineHeight={28}
                              style={{
                                display: "block",
                                marginBottom: "28px",
                              }}
                            />
                            <Text
                              text={`${v.author}ㆍ${v.publisher}ㆍ${v.pubDate}`}
                              fontWeight={400}
                              fontSize={16}
                              lineHeight={24}
                              color="#999999"
                            />
                          </div>
                        </div>
                        <div
                          className={styles.bookSelect}
                          onClick={() => onSelectBook(v)}
                        >
                          <TextGothic
                            text="선택"
                            fontWeight={700}
                            fontSize={16}
                            lineHeight={24}
                            color="#999999"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  selectedBook.map((v, i) => (
                    <div
                      key={i}
                      className={`${styles.searchResult} ${styles.selected}`}
                    >
                      <div className={styles.bookInfo}>
                        <Image
                          src={v.imageUrl}
                          alt=""
                          width={85}
                          height={120}
                        />
                        <div className={styles.bookDesc}>
                          <div className={styles.category}>
                            <Text
                              text={v.bookCategory}
                              fontWeight={500}
                              fontSize={14}
                              lineHeight={20}
                              color="#999999"
                            />
                          </div>
                          <TextGothic
                            text={v.title}
                            fontWeight={700}
                            fontSize={20}
                            lineHeight={28}
                            style={{
                              display: "block",
                              marginBottom: "28px",
                            }}
                          />
                          <Text
                            text={`${v.author}ㆍ${v.publisher}ㆍ${v.pubDate}`}
                            fontWeight={400}
                            fontSize={16}
                            lineHeight={24}
                            color="#999999"
                          />
                        </div>
                      </div>
                      <Image
                        src={icon_close}
                        alt="x"
                        onClick={() => setSelectBook([])}
                      />
                    </div>
                  ))
                )}
              </div>
            )}
            <div className={styles.register}>
              <TextGothic
                text="대여 기간"
                fontWeight={700}
                fontSize={20}
                lineHeight={28}
                style={{
                  display: "block",
                  marginBottom: "20px",
                }}
              />
              <div className={styles.periodBox}>
                {["1주", "2주", "3주", "4주"].map((v, i) => (
                  <div
                    key={i}
                    className={`${styles.period} ${
                      v === period ? styles.on : ""
                    }`}
                    onClick={() => setPeriod(v)}
                  >
                    <TextGothic
                      text={v}
                      fontWeight={700}
                      fontSize={20}
                      lineHeight={28}
                      color={v === period ? "#1a1a1a" : "#999999"}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.register}>
              <TextGothic
                text="대여 / 반납 장소"
                fontWeight={700}
                fontSize={20}
                lineHeight={28}
                style={{
                  display: "block",
                  marginBottom: "16px",
                }}
              />
              <Input
                type="text"
                value={place}
                onChange={setPlace}
                placeholder="직접 만나는 장소는 어디가 좋을까요?"
              />
            </div>
            <div className={styles.register}>
              <TextGothic
                text="첨부 내용"
                fontWeight={700}
                fontSize={20}
                lineHeight={28}
                style={{
                  display: "block",
                  marginBottom: "16px",
                }}
              />
              <div className={styles.textAreaBox}>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="추가로 알려주고 싶은 내용이 있나요?"
                />
              </div>
            </div>
          </div>
          <div className={styles.buttonBox}>
            <Button
              text="등록하기"
              onClick={onRegister}
              textColor="white"
              backgroundColor="#e6e6e6"
            />
            <Button
              text="취소하기"
              onClick={() => {}}
              textColor="white"
              backgroundColor="#1a1a1a"
            />
          </div>
        </div>
      </main>
    </>
  );
}
