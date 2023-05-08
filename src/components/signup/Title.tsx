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
        <TextGothic
          text="회원가입"
          fontWeight={700}
          fontSize={36}
          lineHeight={44}
        />
      )}
      {step === 2 && (
        <>
          <TextGothic
            text="관심사를 선택해 주세요."
            fontWeight={700}
            fontSize={36}
            lineHeight={44}
            style={{
              display: "block",
              marginBottom: "16px",
            }}
          />
          <TextGothic
            text="최대 4개까지 선택할 수 있어요."
            fontWeight={400}
            fontSize={16}
            lineHeight={24}
          />
        </>
      )}
    </div>
  );
}
