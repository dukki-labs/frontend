import Image from "next/image";
import styles from "@/styles/Common.module.scss";
import TextGothic from "@/components/common/TextGothic";
import Text from "@/components/common/Text";
import { bookData } from "@/type";
import icon_view from "@/img/icon_view.svg";
import icon_like from "@/img/icon_like.svg";

const CATEGORY_KO: { [key: string]: string } = {
  HISTORY_CULTURE: "역사/예술/문화",
  EDUCATION: "역사/예술/문화",
  FAMILY_LIFE: "가정/요리/뷰티",
  HOBBY: "건강/취미/레저/여행",
  ECONOMIC_MANAGEMENT: "경제경영",
  SCIENCE_TECHNOLOGY: "사회과학/과학",
  COMPUTER_MOBILE: "컴퓨터/모바일",
  LITERATURE: "문학",
  ENTERTAINMENT: "엔터테인먼트",
  SELF_DEVELOPMENT: "자기계발",
  LANGUAGE: "언어",
  OTHER: "기타",
};

export default function Book({
  isNew = false,
  title,
  category,
  content,
  imageUrl,
  recommendCount,
}: bookData) {
  return (
    <div className={styles.book}>
      <Image
        className={styles.bookImg}
        src={imageUrl}
        alt=""
        width={206}
        height={295}
      />
      {isNew && (
        <div className={styles.new}>
          <Text text="NEW" fontWeight={500} fontSize={14} lineHeight={20} />
        </div>
      )}
      <div className={styles.title}>
        <TextGothic
          text={title}
          fontWeight={700}
          fontSize={20}
          lineHeight={28}
        />
      </div>
      <Text
        text={CATEGORY_KO[category]}
        fontWeight={500}
        fontSize={16}
        lineHeight={24}
        style={{
          display: "block",
          marginBottom: "24px",
        }}
      />
      <div className={styles.content}>
        <Text text={content} fontWeight={400} fontSize={16} lineHeight={24} />
      </div>
      <div className={styles.iconBox}>
        <div className={styles.icon}>
          <Image src={icon_like} alt="" />
          <Text
            text={recommendCount.toString()}
            fontWeight={500}
            fontSize={14}
            lineHeight={20}
            color="#999999"
          />
        </div>
      </div>
    </div>
  );
}
