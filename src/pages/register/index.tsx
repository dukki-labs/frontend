import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Text from "@/components/common/Text";
import TextGothic from "@/components/common/TextGothic";
import Button from "@/components/common/Button";
import { api } from "@/utils/api";
import UseMemberId from "@/utils/useMemberId";
import UseAlertModal from "@/utils/useAlertModal";
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
  const [period, setPeriod] = useState("ONE_WEEK");
  const [place, setPlace] = useState("");
  const [comment, setComment] = useState("");
  const { memberId } = UseMemberId();
  const { alertModal, setAlertModal } = UseAlertModal();

  const onSearch = async () => {
    setSelectBook([]);
    const { data, status } = await api.get(`/api/v1/books/container/search`, {
      params: {
        searchKeyword: keyward,
        page: 1,
        size: 10,
      },
    });
    if (status === 200) {
      setSearchResult(data.bookList);
    }
  };

  const onSelectBook = (book: SearchResult) => {
    setSelectBook([book]);
  };

  const onRegister = async () => {
    const body = {
      title: selectedBook[0].title,
      imageUrl: selectedBook[0].imageUrl,
      content: selectedBook[0].description,
      review: comment,
      deadLine: period,
      author: selectedBook[0].author,
      publisher: selectedBook[0].publisher,
      publishDate: selectedBook[0].pubDate,
      returnLocation: place,
      memberId: memberId,
    };
    const { status } = await api.post(
      `/api/v1/categories/${selectedBook[0].categoryMapId}/books`,
      body,
    );
    if (status === 201) {
      setAlertModal({
        ...alertModal,
        title: "도서 등록에 성공했어요!",
        desc: "마이페이지에서 등록 내역을 확인할 수 있어요.",
        buttonText: "메인으로 돌아가기",
        isOpen: true,
        onConfirm: () => {
          setAlertModal((prev) => ({ ...prev, isOpen: false }));
          router.replace("/");
        },
      });
    }
  };

  const isValidation = useMemo(() => {
    if (selectedBook.length === 0 || place === "") {
      return false;
    }
    return true;
  }, [selectedBook, place]);

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
              marginBottom: "16px",
            }}
          />
          <TextGothic
            text="보유하고 있는 도서를 리터러리에 등록해 주세요."
            fontWeight={400}
            fontSize={16}
            lineHeight={24}
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
                {[
                  {
                    name: "ONE_WEEK",
                    nameKo: "1주",
                  },
                  {
                    name: "TWO_WEEK",
                    nameKo: "2주",
                  },
                  {
                    name: "THREE_WEEK",
                    nameKo: "3주",
                  },
                  {
                    name: "FOUR_WEEK",
                    nameKo: "4주",
                  },
                ].map((v, i) => (
                  <div
                    key={i}
                    className={`${styles.period} ${
                      v.name === period ? styles.on : ""
                    }`}
                    onClick={() => setPeriod(v.name)}
                  >
                    <TextGothic
                      text={v.nameKo}
                      fontWeight={v.name === period ? 700 : 400}
                      fontSize={16}
                      lineHeight={24}
                      color="#1a1a1a"
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
                text="전달 내용"
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
                  placeholder="추가로 전달하고 싶은 내용이 있나요?"
                />
              </div>
            </div>
          </div>
          <div className={styles.buttonBox}>
            <Button
              text="취소하기"
              onClick={() => router.back()}
              textColor="#1A1A1A"
              backgroundColor="#ffffff"
              borderColor="#EDEDED"
            />
            {isValidation ? (
              <Button
                text="등록하기"
                onClick={onRegister}
                textColor="#1A1A1A"
                backgroundColor="#00FFB2"
              />
            ) : (
              <Button
                text="등록하기"
                onClick={() => {}}
                textColor="#ffffff"
                backgroundColor="#EDEDED"
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
