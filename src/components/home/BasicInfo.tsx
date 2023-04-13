import styles from "@/styles/Home.module.scss";
import TextGothic from "@/components/common/TextGothic";

export default function BasicInfo() {
  return (
    <section className={styles.basicInfo}>
      <div className={styles.info1}>
        <TextGothic
          text="리터러리에 도서를 등록해 보세요!"
          fontWeight={700}
          fontSize={40}
          lineHeight={48}
          style={{
            display: "block",
            marginBottom: "16px",
          }}
        />
        <TextGothic
          text={`하루 중 가장 오래 머무는 회사에서, 내가 가진 도서를 읽고 싶은\n사람들이 있을 수 있어요. 도서를 등록하고 회사 사람들에게 공유해 보세요!`}
          fontWeight={400}
          fontSize={16}
          lineHeight={24}
        />
      </div>
      <div className={styles.info2}>
        <TextGothic
          text="도서를 대여하고, 반납할 수 있어요."
          fontWeight={700}
          fontSize={40}
          lineHeight={48}
        />
        <div className={styles.basicInfoBox}>
          <div className={styles.basicInfo}>
            <TextGothic
              text="대여 신청하기"
              fontWeight={700}
              fontSize={20}
              lineHeight={28}
              style={{
                display: "block",
                marginBottom: "16px",
              }}
            />
            <TextGothic
              text="도서가 등록되면 같은 회사 사람들만 대여할 수 있고, 한 권만 대여할 수 있어 도서 이용에 대한 문제가 적도록 했어요. 대여자는 도서 대여 및 반납 장소를 잘 확인해보고, 등록자와 한 마디 따뜻한 대화를 나누어 보세요."
              fontWeight={400}
              fontSize={16}
              lineHeight={24}
            />
          </div>
          <div className={styles.basicInfo}>
            <TextGothic
              text="반납 신청하기"
              fontWeight={700}
              fontSize={20}
              lineHeight={28}
              style={{
                display: "block",
                marginBottom: "16px",
              }}
            />
            <TextGothic
              text="등록자와 대여자의 분쟁을 방지하기 위해 대여자는 대여 기간동안 깨끗하게 도서를 이용할 수 있도록 해야 해요. 잠깐 시간을 내어 대여 후기를 남기거나 도서 추천을 하게되면 다른 대여자도 참고할 수 있어요."
              fontWeight={400}
              fontSize={16}
              lineHeight={24}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
