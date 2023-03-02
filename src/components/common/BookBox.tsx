import styles from "@/styles/Common.module.scss";
import Book from "@/components/common/Book";
import { bookData } from "@/type";

interface BookBox {
  data: bookData[];
}

export default function BookBox({ data }: BookBox) {
  return (
    <div className={styles.bookBox}>
      {data.map((v, i) => (
        <Book
          key={i}
          bookName={v.bookName}
          writer={v.writer}
          category={v.category}
          like={v.like}
          img={v.img}
        />
      ))}
      {data.length < 5 &&
        [...Array(5 - data.length)].map((v, i) => (
          <div key={i} className={styles.book}></div>
        ))}
    </div>
  );
}
