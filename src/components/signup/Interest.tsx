import styles from "@/styles/Entrance.module.scss";
import TextGothic from "@/components/common/TextGothic";

const CATEGORY_LIST = [
  ["역사/문화", "정치/사회", "경제/경영"],
  ["주식/금융", "영업/판매", "성공/처세"],
  ["건강/의학", "예술/문학", "IT/프로그램"],
  ["과학/기술", "취미/여행", "유아/아동"],
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
              }`}
              onClick={() => onClickInterest(v)}
            >
              <TextGothic
                text={`#${v}`}
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
