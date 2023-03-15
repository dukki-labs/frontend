import Text from "@/components/common/Text";
import TextGothic from "@/components/common/TextGothic";
import styles from "@/styles/Entrance.module.scss";

interface Title {
  step: number;
}

export default function Title({ step }: Title) {
  return (
    <div className={styles.title}>
      {step === 1 && (
        <>
          <TextGothic
            text="서비스 이용을 위해서"
            fontWeight={700}
            fontSize={36}
            lineHeight={44}
            style={{
              display: "block",
              marginBottom: "8px",
            }}
          />
          <TextGothic
            text="리터러리 약관에 동의해 주세요."
            fontWeight={700}
            fontSize={36}
            lineHeight={44}
          />
        </>
      )}
      {step === 2 && (
        <TextGothic
          text="기본 정보를 입력해 주세요."
          fontWeight={700}
          fontSize={36}
          lineHeight={44}
        />
      )}
      {step === 3 && (
        <>
          <TextGothic
            text="관심 카테고리를 선택해 주세요."
            fontWeight={700}
            fontSize={36}
            lineHeight={44}
            style={{
              display: "block",
              marginBottom: "8px",
            }}
          />
          <TextGothic
            text="최대 4개까지 선택할 수 있어요."
            fontWeight={400}
            fontSize={20}
            lineHeight={28}
            color="#999999"
          />
        </>
      )}
    </div>
  );
}
