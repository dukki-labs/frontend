import styles from "@/styles/Common.module.scss";
import TextGothic from "@/components/common/TextGothic";

interface Button {
  text: string;
  onClick: () => void;
  textColor: string;
  backgroundColor: string;
}

export default function Button({
  text,
  onClick,
  textColor = "#1a1a1a",
  backgroundColor,
}: Button) {
  return (
    <div
      className={styles.button}
      onClick={onClick}
      style={{
        background: `${backgroundColor}`,
      }}
    >
      <TextGothic
        text={text}
        fontWeight={700}
        fontSize={20}
        lineHeight={28}
        color={textColor}
      />
    </div>
  );
}
