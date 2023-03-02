import styles from "@/styles/Home.module.scss";
import TextGothic from "@/components/common/TextGothic";
import BookBox from "@/components/common/BookBox";
import { bookData } from "@/type";

interface NewBooks {
  data: bookData[];
}

export default function NewBooks({ data }: NewBooks) {
  return (
    <section className={styles.newSection}>
      <div className={styles.titleBox}>
        <TextGothic
          text="2023년 12월 4주차"
          fontWeight={700}
          fontSize={20}
          lineHeight={28}
          color="#000000"
          style={{
            display: "block",
            marginBottom: "24px",
          }}
        />
        <div className={styles.mainTitle}>
          <TextGothic
            text="최근에 등록된 신규 도서가 있어요."
            fontWeight={700}
            fontSize={48}
            lineHeight={64}
            color="#1a1a1a"
          />
          <div className={styles.moreButton}>
            <TextGothic
              text="더 보러가기"
              fontWeight={700}
              fontSize={20}
              lineHeight={28}
              color="#ffffff"
            />
          </div>
        </div>
      </div>
      <BookBox data={data} />
    </section>
  );
}
