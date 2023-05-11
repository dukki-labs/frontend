import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/Rental.module.scss";
import RentalInfo from "@/components/common/RentalInfo";
import { api } from "@/utils/api";

export default function Detail() {
  const [detail, setDetail] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    if (!router.query) return;
    const fetchDetail = async () => {
      const { data } = await api.get(`/api/v1/books/${router.query.id}/detail`);
      setDetail(data.bookContent);
    };
    fetchDetail();
  }, [router]);

  return (
    <>
      <Head>
        <title>대여 신청완료</title>
        <meta name="description" content="대여 신청완료" />
      </Head>
      <main className={styles.main}>
        <RentalInfo
          type="rental"
          imageUrl={detail.imageUrl}
          title={detail.title}
          author={detail.author}
          bookCategory={detail.bookCategory}
          content={detail.content}
          deadLine={detail.deadLine}
          returnLocation={detail.returnLocation}
          review={detail.review}
        />
      </main>
    </>
  );
}
