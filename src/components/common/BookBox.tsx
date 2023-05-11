import styles from "@/styles/Common.module.scss";
import Book from "@/components/common/Book";
import { bookData } from "@/type";

interface BookBox {
  data: bookData[];
  isNew: boolean;
}

export default function BookBox({ data, isNew }: BookBox) {
  return (
    <div className={styles.bookBox}>
      {data.map((v, i) => (
        <Book
          key={i}
          id={v.id}
          isNew={isNew}
          title={v.title}
          category={v.category}
          content={v.content}
          imageUrl={v.imageUrl}
          recommendCount={v.recommendCount}
        />
      ))}
      {data.length < 6 &&
        [...Array(6 - data.length)].map((v, i) => (
          <div
            key={i}
            className={styles.book}
            style={{ cursor: "default" }}
          ></div>
        ))}
    </div>
  );
}
