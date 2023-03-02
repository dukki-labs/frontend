import styles from "@/styles/Common.module.scss";

interface TextGothic {
  text: string;
  fontWeight?: number;
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  style?: any;
}

const getFontFamily = (weight: number) => {
  switch (weight) {
    case 400:
      return "NexonLight";
    case 500:
      return "NexonRegular";
    case 700:
      return "NexonBold";
    default:
      return "NexonRegular";
  }
};

export default function TextGothic({
  text,
  fontWeight = 500,
  fontSize = 16,
  lineHeight = 22,
  color = "black",
  style,
}: TextGothic) {
  const inlineStyle = {
    fontFamily: getFontFamily(fontWeight),
    fontSize: `${fontSize}px`,
    lineHeight: `${lineHeight}px`,
    color: color,
    ...style,
  };

  return (
    <span className={styles.text} style={inlineStyle}>
      {text}
    </span>
  );
}
