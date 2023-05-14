import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/Rental.module.scss";
import RentalInfo from "@/components/common/RentalInfo";
import { api } from "@/utils/api";
import UseAlertModal from "@/utils/useAlertModal";

export default function Detail() {
  const [value, setValue] = useState("");
  const [detail, setDetail] = useState<any>({});
  const router = useRouter();
  const { alertModal, setAlertModal } = UseAlertModal();

  useEffect(() => {
    if (!router.query) return;
    const fetchDetail = async () => {
      const { data } = await api.get(`/api/v1/books/return`);
      setDetail(data);
    };
    fetchDetail();
  }, [router]);

  const onSubmit = () => {
    if (value) {
      setAlertModal({
        ...alertModal,
        title: "이 도서가 유익했나요?",
        desc: "도서를 추천하면 다른 사람들이 참고할 수 있어요.",
        buttonText: "추천하기",
        cancelText: "건너뛰기",
        isOpen: true,
        isTwoButton: true,
        onConfirm: async () => {
          await api.post(`/api/v1/books/return`, {
            rentalReview: value,
            recommend: 1,
          });
          setAlertModal((prev) => ({ ...prev, isOpen: false }));
          setAlertModal({
            ...alertModal,
            title: "도서 반납에 성공했어요!",
            desc: "마이 페이지에서 반납 내역을 확인할 수 있어요.",
            cancelText: "",
            buttonText: "메인으로 돌아가기",
            isOpen: true,
            isTwoButton: false,
            onConfirm: async () => {
              setAlertModal((prev) => ({ ...prev, isOpen: false }));
              () => router.replace("/");
            },
          });
        },
        onCancel: async () => {
          await api.post(`/api/v1/books/return`, {
            rentalReview: value,
            recommend: 0,
          });
          setAlertModal((prev) => ({ ...prev, isOpen: false }));
          setAlertModal({
            ...alertModal,
            title: "도서 반납에 성공했어요!",
            desc: "마이 페이지에서 반납 내역을 확인할 수 있어요.",
            cancelText: "",
            buttonText: "메인으로 돌아가기",
            isOpen: true,
            isTwoButton: false,
            onConfirm: async () => {
              setAlertModal((prev) => ({ ...prev, isOpen: false }));
              () => router.replace("/");
            },
          });
        },
      });
    } else {
      setAlertModal({
        ...alertModal,
        title: "아직 대여 후기를 남기지 않았어요.",
        desc: "그래도 도서 반납을 진행할까요?",
        buttonText: "반납하기",
        cancelText: "머무르기",
        isOpen: true,
        isTwoButton: true,
        onConfirm: async () => {
          setAlertModal((prev) => ({ ...prev, isOpen: false }));
          setAlertModal({
            ...alertModal,
            title: "이 도서가 유익했나요?",
            desc: "도서를 추천하면 다른 사람들이 참고할 수 있어요.",
            buttonText: "추천하기",
            cancelText: "건너뛰기",
            isOpen: true,
            isTwoButton: true,
            onConfirm: async () => {
              await api.post(`/api/v1/books/return`, {
                rentalReview: value,
                recommend: 1,
              });
              setAlertModal((prev) => ({ ...prev, isOpen: false }));
              setAlertModal({
                ...alertModal,
                title: "도서 반납에 성공했어요!",
                desc: "마이 페이지에서 반납 내역을 확인할 수 있어요.",
                buttonText: "메인으로 돌아가기",
                cancelText: "",
                isOpen: true,
                isTwoButton: false,
                onConfirm: async () => {
                  setAlertModal((prev) => ({ ...prev, isOpen: false }));
                  () => router.replace("/");
                },
              });
            },
            onCancel: async () => {
              await api.post(`/api/v1/books/return`, {
                rentalReview: value,
                recommend: 0,
              });
              setAlertModal((prev) => ({ ...prev, isOpen: false }));
              setAlertModal({
                ...alertModal,
                title: "도서 반납에 성공했어요!",
                desc: "마이 페이지에서 반납 내역을 확인할 수 있어요.",
                buttonText: "메인으로 돌아가기",
                cancelText: "",
                isOpen: true,
                isTwoButton: false,
                onConfirm: async () => {
                  setAlertModal((prev) => ({ ...prev, isOpen: false }));
                  () => router.replace("/");
                },
              });
            },
          });
        },
      });
    }
  };

  return (
    <>
      <Head>
        <title>도서 반납하기</title>
        <meta name="description" content="도서 반납하기" />
      </Head>
      <main className={styles.main}>
        <RentalInfo
          type="return"
          imageUrl={detail.bookUrl}
          title={detail.title}
          author={detail.publisher}
          bookCategory={detail.category?.bookCategory}
          content={detail.content}
          deadLine={detail.deadLine}
          returnLocation={detail.returnLocation}
          review={detail.review}
          providerNickName={detail.providerNickName}
          value={value}
          setValue={setValue}
          onSubmit={onSubmit}
        />
      </main>
    </>
  );
}
