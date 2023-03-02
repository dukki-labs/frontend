import Image from "next/image";
import styles from "@/styles/Common.module.scss";
import Text from "@/components/common/Text";
import { bookData } from "@/type";
import icon_view from "@/img/icon_view.svg";
import icon_like from "@/img/icon_like.svg";

export default function Book({
  bookName,
  writer,
  category,
  like,
  img,
}: bookData) {
  return (
    <div className={styles.book}>
      <Image className={styles.bookImg} src={img} alt="" />
      <Text
        text={category}
        fontWeight={500}
        fontSize={16}
        lineHeight={24}
        color="#1A1A1A"
        style={{
          display: "block",
          marginBottom: "8px",
        }}
      />
      <Text
        text={bookName}
        fontWeight={700}
        fontSize={24}
        lineHeight={32}
        color="#1A1A1A"
        style={{
          display: "block",
          marginBottom: "24hpx",
        }}
      />
      <Text
        text={writer}
        fontWeight={400}
        fontSize={16}
        lineHeight={24}
        color="#1A1A1A"
      />
      <div className={styles.iconBox}>
        <div className={styles.icon}>
          <Image src={icon_like} alt="" />
          <Text
            text={like.toString()}
            fontWeight={400}
            fontSize={16}
            lineHeight={24}
            color="#1A1A1A"
          />
        </div>
        <div className={styles.icon}>
          <Image src={icon_view} alt="" />
          <Text
            text={"0"}
            fontWeight={400}
            fontSize={16}
            lineHeight={24}
            color="#1A1A1A"
          />
        </div>
      </div>
    </div>
  );
}
