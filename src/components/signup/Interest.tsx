import styles from "@/styles/Entrance.module.scss";
import TextGothic from "@/components/common/TextGothic";
import { CATEGORY_KO } from "@/utils";

const CATEGORY_LIST = [
  ["HISTORY_CULTURE", "EDUCATION"],
  ["FAMILY_LIFE", "HOBBY"],
  ["ECONOMIC_MANAGEMENT", "SCIENCE_TECHNOLOGY"],
  ["COMPUTER_MOBILE", "LITERATURE"],
  ["ENTERTAINMENT", "SELF_DEVELOPMENT"],
  ["LANGUAGE", "OTHER"],
];

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
              } ${
                interest.length === 4 && !interest.includes(v) && styles.off
              }`}
              onClick={() => onClickInterest(v)}
            >
              <TextGothic
                text={CATEGORY_KO[v]}
                fontWeight={interest.includes(v) ? 700 : 400}
                fontSize={16}
                lineHeight={24}
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
          color="white"
        />
      </div>
    </div>
  );
}
