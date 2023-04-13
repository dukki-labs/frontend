import styles from "@/styles/Home.module.scss";
import TextGothic from "@/components/common/TextGothic";
import BookBox from "@/components/common/BookBox";
import { bookData } from "@/type";

interface NewBooks {
  data: bookData[];
}

export default function NewBooks({ data }: NewBooks) {
  if (data.length === 0) {
    return <></>;
  }

  return (
    <section className={styles.newSection}>
      <div className={styles.titleBox}>
        <TextGothic
          text="신규도서"
          fontWeight={400}
          fontSize={16}
          lineHeight={24}
          style={{
            display: "block",
            marginBottom: "16px",
          }}
        />
        <div className={styles.mainTitle}>
          <TextGothic
            text="한 달 사이 등록된 도서에요."
            fontWeight={700}
            fontSize={40}
            lineHeight={48}
          />
          <div className={styles.moreButton}>
            <TextGothic
              text="더 보기"
              fontWeight={700}
              fontSize={16}
              lineHeight={24}
            />
          </div>
        </div>
      </div>
      <BookBox data={data} isNew={true} />
    </section>
  );
}
