import Image from "next/image";
import Text from "@/components/common/Text";
import TextGothic from "@/components/common/TextGothic";
import styles from "@/styles/Entrance.module.scss";
import icon_check_on from "@/img/icon_check_on.svg";
import icon_check_off from "@/img/icon_check_off.svg";

interface Terms {
  terms: boolean[];
  onClickTerm: (i: number) => void;
  onClickButton: () => void;
}

export default function Terms({ terms, onClickTerm, onClickButton }: Terms) {
  return (
    <div className={styles.signupWrapper}>
      <div className={styles.allAgree}>
        <Image
          src={
            terms[0] && terms[1] && terms[2] ? icon_check_on : icon_check_off
          }
          alt=""
          onClick={() => onClickTerm(3)}
        />
        <TextGothic
          text="이용 약관에 모두 동의할게요."
          fontWeight={700}
          fontSize={20}
          lineHeight={28}
        />
      </div>
      <div className={styles.termsBox}>
        <div className={styles.terms}>
          <Image
            src={terms[0] ? icon_check_on : icon_check_off}
            alt=""
            onClick={() => onClickTerm(0)}
          />
          <TextGothic
            text="[필수] 리터러리 이용 약관에 동의할게요."
            fontWeight={700}
            fontSize={20}
            lineHeight={28}
          />
        </div>
        <div className={styles.termsDesc}>
          <Text
            text={`계정 약관 동의 텍스트\n계정 약관 동의 텍스트\n계정 약관 동의 텍스트\n계정 약관 동의 텍스트\n계정 약관 동의 텍스트\n계정 약관 동의 텍스트\n계정 약관 동의 텍스트`}
            fontWeight={400}
            fontSize={16}
            lineHeight={24}
            color="#999999"
          />
        </div>
      </div>
      <div className={styles.termsBox}>
        <div className={styles.terms}>
          <Image
            src={terms[1] ? icon_check_on : icon_check_off}
            alt=""
            onClick={() => onClickTerm(1)}
          />
          <TextGothic
            text="[필수] 개인정보 수집 및 이용에 동의할게요."
            fontWeight={700}
            fontSize={20}
            lineHeight={28}
          />
        </div>
        <div className={styles.termsDesc}>
          <Text
            text="서비스 약관 동의 텍스트"
            fontWeight={400}
            fontSize={16}
            lineHeight={24}
            color="#999999"
          />
        </div>
      </div>
      <div className={styles.termsBox}>
        <div className={styles.terms}>
          <Image
            src={terms[2] ? icon_check_on : icon_check_off}
            alt=""
            onClick={() => onClickTerm(2)}
          />
          <TextGothic
            text="[선택] 이메일 수신 여부에 동의할게요."
            fontWeight={700}
            fontSize={20}
            lineHeight={28}
          />
        </div>
      </div>
      <div
        className={`${styles.button} ${terms[0] && terms[1] ? styles.on : ""}`}
        onClick={terms[0] && terms[1] ? onClickButton : undefined}
      >
        <Text
          text="다음"
          fontSize={24}
          lineHeight={32}
          color={terms[0] && terms[1] ? "#1a1a1a" : "white"}
        />
      </div>
    </div>
  );
}
