import styles from "@/styles/Entrance.module.scss";
import TextGothic from "@/components/common/TextGothic";

const CATEGORY_LIST = [
  ["HISTORY_CULTURE", "EDUCATION", "FAMILY_LIFE"],
  ["HOBBY", "ECONOMIC_MANAGEMENT", "SCIENCE_TECHNOLOGY"],
  ["COMPUTER_MOBILE", "LITERATURE", "ENTERTAINMENT"],
  ["SELF_DEVELOPMENT", "LANGUAGE", "OTHER"],
];

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

interface Interest {
  interest: string[];
  setInterest: (i: any) => void;
  onClickButton: () => void;
}

export default function Interest({
  interest,
  setInterest,
  onClickButton,
}: Interest) {
  const onClickInterest = (v: string) => {
    setInterest((prev: string[]) => {
      if (prev.includes(v)) {
        return prev.filter((p) => p !== v);
      }
      if (prev.length === 4) {
        return prev;
      }
      return prev.concat(v);
    });
  };

  return (
    <div className={styles.interest}>
      {CATEGORY_LIST.map((list, i) => (
        <div key={i} className={styles.box}>
          {list.map((v, idx) => (
            <div
              key={idx}
              className={`${styles.card} ${
                interest.includes(v) ? styles.on : ""
              }`}
              onClick={() => onClickInterest(v)}
            >
              <TextGothic
                text={`#${CATEGORY_KO[v]}`}
                fontWeight={interest.includes(v) ? 700 : 400}
                fontSize={20}
                lineHeight={28}
                color={interest.includes(v) ? "#1a1a1a" : "#999999"}
              />
            </div>
          ))}
        </div>
      ))}
      <div
        className={`${styles.button} ${interest.length > 0 ? styles.on : ""}`}
        onClick={interest.length > 0 ? onClickButton : undefined}
      >
        <TextGothic
          text="완료"
          fontWeight={700}
          fontSize={20}
          lineHeight={28}
          color={interest.length > 0 ? "#1a1a1a" : "white"}
        />
      </div>
    </div>
  );
}
