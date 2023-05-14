import { useRouter } from "next/router";
import Image from "next/image";
import styles from "@/styles/Rental.module.scss";
import TextGothic from "@/components/common/TextGothic";
import Text from "@/components/common/Text";
import Button from "@/components/common/Button";
import { CATEGORY_KO, DEADLINE_KO } from "@/utils";

interface RentalInfo {
  type: string;
  imageUrl: string;
  title: string;
  author: string;
  bookCategory: string;
  content: string;
  deadLine: string;
  returnLocation: string;
  review: string;
  providerNickName?: string;
  value?: string;
  setValue?: (v: string) => void;
  onSubmit?: () => void;
}

export default function RentalInfo({
  type,
  imageUrl,
  title,
  author,
  bookCategory,
  content,
  deadLine,
  returnLocation,
  review,
  providerNickName,
  value,
  setValue,
  onSubmit,
}: RentalInfo) {
  const router = useRouter();

  return (
    <div className={styles.rentalInfo}>
      <div className={styles.title}>
        <TextGothic
          text={type === "rental" ? "대여 신청에 성공했어요!" : "도서 반납하기"}
          fontWeight={700}
          fontSize={40}
          lineHeight={48}
          style={{
            display: "block",
            marginBottom: "16px",
          }}
        />
        <Text
          text={
            type === "rental"
              ? "대여 중 사람들과 따뜻한 한 마디를 나누어 보세요."
              : `${providerNickName}님에게 대여했던 도서를 반납해 주세요.`
          }
          fontWeight={400}
          fontSize={16}
          lineHeight={24}
        />
      </div>
      <div className={styles.book}>
        <TextGothic
          text="도서 정보"
          fontWeight={700}
          fontSize={16}
          lineHeight={24}
          style={{
            display: "block",
            marginBottom: "16px",
          }}
        />
        <div className={styles.bookBox}>
          <Image src={imageUrl} alt="" width={115} height={164} />
          <div className={styles.right}>
            <TextGothic
              text={title}
              fontWeight={700}
              fontSize={20}
              lineHeight={28}
              style={{
                display: "block",
                marginBottom: "8px",
              }}
            />
            <Text
              text={`${author} | ${CATEGORY_KO[bookCategory]}`}
              fontWeight={500}
              fontSize={16}
              lineHeight={24}
              style={{
                display: "block",
                marginBottom: "24px",
              }}
            />
            <Text
              text={content}
              fontWeight={400}
              fontSize={16}
              lineHeight={24}
            />
          </div>
        </div>
      </div>
      <div className={styles.rental}>
        <TextGothic
          text="대여 정보"
          fontWeight={700}
          fontSize={16}
          lineHeight={24}
          style={{
            display: "block",
            marginBottom: "16px",
          }}
        />
        <div className={styles.rentalBox}>
          <div className={styles.etc}>
            <Text
              text="대여기간"
              fontWeight={500}
              fontSize={16}
              lineHeight={24}
              color="#999999"
              style={{
                marginRight: "24px",
                display: "inline-block",
                width: "100px",
              }}
            />
            <Text
              text={DEADLINE_KO[deadLine]}
              fontWeight={400}
              fontSize={16}
              lineHeight={24}
            />
          </div>
          <div className={styles.etc}>
            <Text
              text="대여/반납 장소"
              fontWeight={500}
              fontSize={16}
              lineHeight={24}
              color="#999999"
              style={{
                marginRight: "24px",
                display: "inline-block",
                width: "100px",
              }}
            />
            <Text
              text={returnLocation}
              fontWeight={400}
              fontSize={16}
              lineHeight={24}
            />
          </div>
          <div className={styles.etc}>
            <Text
              text="전달 내용"
              fontWeight={500}
              fontSize={16}
              lineHeight={24}
              color="#999999"
              style={{
                marginRight: "24px",
                display: "inline-block",
                width: "100px",
              }}
            />
            <Text
              text={review}
              fontWeight={400}
              fontSize={16}
              lineHeight={24}
            />
          </div>
        </div>
      </div>
      {type === "return" && (
        <div className={styles.review}>
          <TextGothic
            text="대여 후기"
            fontWeight={700}
            fontSize={16}
            lineHeight={24}
            style={{
              display: "block",
              marginBottom: "16px",
            }}
          />
          <div className={styles.inputBox}>
            <input
              value={value}
              onChange={setValue ? (e) => setValue(e.target.value) : () => {}}
              placeholder="다음 사람들을 위해 후기를 남겨주세요."
            />
          </div>
        </div>
      )}
      {type === "rental" && (
        <div className={styles.buttonBox}>
          <Button
            text="메인으로 돌아가기"
            textColor="#ffffff"
            backgroundColor="#1A1A1A"
            onClick={() => router.push("/")}
          />
        </div>
      )}
      {type === "return" && (
        <div className={styles.buttonBox}>
          <Button
            text="취소하기"
            textColor="#1A1A1A"
            backgroundColor="#ffffff"
            borderColor="#EDEDED"
            onClick={() => router.back()}
          />
          <Button
            text="반납하기"
            textColor="#ffffff"
            backgroundColor="#1A1A1A"
            onClick={onSubmit ? onSubmit : () => {}}
          />
        </div>
      )}
    </div>
  );
}
