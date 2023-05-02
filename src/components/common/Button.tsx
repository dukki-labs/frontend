import styles from "@/styles/Common.module.scss";
import TextGothic from "@/components/common/TextGothic";

interface Button {
  text: string;
  onClick: () => void;
  textColor: string;
  backgroundColor: string;
  borderColor?: string;
}

export default function Button({
  text,
  onClick,
  textColor = "#1a1a1a",
  backgroundColor,
  borderColor,
}: Button) {
  return (
    <div
      className={styles.button}
      onClick={onClick}
      style={{
        background: `${backgroundColor}`,
        borderWidth: "1.5px",
        borderStyle: "solid",
        borderColor: borderColor ? borderColor : backgroundColor,
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
