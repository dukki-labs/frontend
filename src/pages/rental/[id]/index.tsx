import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Rental.module.scss";
import TextGothic from "@/components/common/TextGothic";
import Text from "@/components/common/Text";
import Button from "@/components/common/Button";
import Pagination from "@/components/common/Pagination";
import { api } from "@/utils/api";
import { CATEGORY_KO, DEADLINE_KO } from "@/utils";
import UseAlertModal from "@/utils/useAlertModal";

export default function Detail() {
  const [detail, setDetail] = useState<any>({});
  const [review, setReview] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { alertModal, setAlertModal } = UseAlertModal();

  useEffect(() => {
    if (!router.query) return;
    const fetchDetail = async () => {
      const { data } = await api.get(`/api/v1/books/${router.query.id}/detail`);
      setDetail(data.bookContent);
    };
    fetchDetail();
  }, [router]);

  useEffect(() => {
    if (!router.query) return;
    const fetchDetail = async () => {
      const { data } = await api.get(`/api/v1/reviews`, {
        params: {
          bookId: router.query.id,
          page: currentPage,
          size: 5,
        },
      });
      console.log(data);
      setReview(data);
    };
    fetchDetail();
  }, [router, currentPage]);

  const onRental = async (bookId: number) => {
    setAlertModal({
      title: "이 도서로 대여 신청할까요?",
      desc: "대여 기간 동안 다른 도서는 대여할 수 없어요.",
      buttonText: "신청하기",
      isOpen: true,
      isTwoButton: true,
      onConfirm: async () => {
        setAlertModal((prev) => ({ ...prev, isOpen: false }));
        const { status } = await api.post(`/api/v1/books/${bookId}/rental`);
        if (status === 200) {
          router.push(`/rental/${bookId}/done`);
        }
      },
    });
  };

  const onClickPage = (p: number) => {
    setCurrentPage(p);
  };
  return (
    <>
      <Head>
        <title>대여 신청하기</title>
        <meta name="description" content="대여 신청하기" />
      </Head>
      <main className={styles.main}>
        <div className={styles.detailInfo}>
          <div className={styles.left}>
            <Image src={detail.imageUrl} alt="" width={352} height={506} />
          </div>
          <div className={styles.right}>
            <div>
              <TextGothic
                text={detail.title}
                fontWeight={700}
                fontSize={30}
                lineHeight={38}
                style={{
                  display: "block",
                  marginBottom: "12px",
                }}
              />
              <Text
                text={`${detail.author} | ${CATEGORY_KO[detail.bookCategory]}`}
                fontWeight={500}
                fontSize={16}
                lineHeight={24}
                style={{
                  display: "block",
                  marginBottom: "32px",
                }}
              />
              <Text
                text={detail.content}
                fontWeight={400}
                fontSize={16}
                lineHeight={24}
                style={{
                  display: "block",
                }}
              />
              <div className={styles.divider} />
              <div className={styles.etc}>
                <Text
                  text="대여기간"
                  fontWeight={500}
                  fontSize={16}
                  lineHeight={24}
                  color="#999999"
                  style={{
                    marginRight: "12px",
                    display: "inline-block",
                    width: "100px",
                  }}
                />
                <Text
                  text={DEADLINE_KO[detail.deadLine]}
                  fontWeight={400}
                  fontSize={16}
                  lineHeight={24}
                />
              </div>
              <div className={styles.etc}>
                <Text
                  text="대여/반납 장소"
                  fontWeight={500}
                  fontSize={16}
                  lineHeight={24}
                  color="#999999"
                  style={{
                    marginRight: "12px",
                    display: "inline-block",
                    width: "100px",
                  }}
                />
                <Text
                  text={detail.returnLocation}
                  fontWeight={400}
                  fontSize={16}
                  lineHeight={24}
                />
              </div>
              <div className={styles.etc}>
                <Text
                  text="전달 내용"
                  fontWeight={500}
                  fontSize={16}
                  lineHeight={24}
                  color="#999999"
                  style={{
                    marginRight: "12px",
                    display: "inline-block",
                    width: "100px",
                  }}
                />
                <Text
                  text={detail.review}
                  fontWeight={400}
                  fontSize={16}
                  lineHeight={24}
                />
              </div>
            </div>

            <div className={styles.buttonBox}>
              <div className={styles.likeButton}>
                <TextGothic
                  text={`추천 ${detail.recommendCount}`}
                  fontWeight={700}
                  fontSize={16}
                  lineHeight={24}
                />
              </div>
              <Button
                text="대여 신청하기"
                textColor="#ffffff"
                backgroundColor="#1A1A1A"
                onClick={() => onRental(detail.id)}
              />
            </div>
          </div>
        </div>
        <div className={styles.detailReview}>
          <TextGothic
            text="대여후기"
            fontWeight={700}
            fontSize={16}
            lineHeight={24}
            style={{
              display: "block",
              marginBottom: "32px",
            }}
          />
          <div className={styles.reviewList}>
            {review.reviewInfoList?.length === 0 && (
              <div className={styles.emptyReview}>
                <TextGothic
                  text="현재 등록되어 있는 후기가 없어요!"
                  fontWeight={400}
                  fontSize={16}
                  lineHeight={24}
                  color="#999999"
                />
              </div>
            )}
            {review.reviewInfoList?.map((v: any, i: number) => (
              <div key={i} className={styles.review}>
                <div>
                  <TextGothic
                    text={v.review}
                    fontWeight={700}
                    fontSize={16}
                    lineHeight={24}
                    style={{
                      display: "block",
                      marginBottom: "8px",
                    }}
                  />
                  <TextGothic
                    text={`${v.nickName}님의 대여 후기`}
                    fontWeight={400}
                    fontSize={16}
                    lineHeight={24}
                  />
                </div>
                <Text
                  text={v.regReviewDateTime.substring(0, 10)}
                  fontWeight={500}
                  fontSize={16}
                  lineHeight={24}
                  color="#999999"
                />
              </div>
            ))}
          </div>
          <Pagination
            totalPage={review.totalPage}
            currentPage={currentPage}
            onClickPage={onClickPage}
          />
        </div>
      </main>
    </>
  );
}
