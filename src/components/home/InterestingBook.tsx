import styles from "@/styles/Home.module.scss";
import TextGothic from "@/components/common/TextGothic";
import BookBox from "@/components/common/BookBox";
import { bookData } from "@/type";

interface InterestingBook {
  data: bookData[];
}

export default function InterestingBook({ data }: InterestingBook) {
  return (
    <section className={styles.interestingSection}>
      <div className={styles.recomendBox}>
        <TextGothic
          text="suxxxmin님, 관심 도서를 추천할게요."
          fontWeight={700}
          fontSize={20}
          lineHeight={28}
          color="#000000"
          style={{
            display: "block",
            marginBottom: "24px",
          }}
        />
        <div className={styles.category}>
          <TextGothic
            text="자기계발"
            fontWeight={700}
            fontSize={40}
            lineHeight={64}
            color="#1a1a1a"
            style={{
              display: "block",
              marginBottom: "12px",
            }}
          />
          <TextGothic
            text="건강/의학"
            fontWeight={700}
            fontSize={40}
            lineHeight={64}
            color="#B3B3B3"
            style={{
              display: "block",
              marginBottom: "12px",
            }}
          />
          <TextGothic
            text="인문/사회"
            fontWeight={700}
            fontSize={40}
            lineHeight={64}
            color="#B3B3B3"
            style={{
              display: "block",
              marginBottom: "12px",
            }}
          />
        </div>
      </div>
      <BookBox data={data} isNew={false} />
    </section>
  );
}
