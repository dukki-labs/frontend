import { useRouter } from "next/router";
import Image from "next/image";
import styles from "@/styles/Common.module.scss";
import TextGothic from "@/components/common/TextGothic";
import logo from "@/img/logo.png";
import icon_close from "@/img/icon_close_white.svg";

const WITHOUT_HEADER = ["/signin", "/signup", "/signup/done"];

export default function Header() {
  const router = useRouter();

  if (WITHOUT_HEADER.includes(router.asPath)) {
    return <></>;
  }

  return (
    <>
      <div className={styles.notice}>
        <div style={{ width: "24px", height: "24px" }}></div>
        <TextGothic
          text="[공지] 리터러리에 방문하신 여러분을 진심으로 환영할게요!"
          fontWeight={400}
          fontSize={16}
          lineHeight={24}
          color="white"
        />
        <Image src={icon_close} alt="" />
      </div>
      <header className={styles.header}>
        <div className={styles.left}>
          <Image src={logo} alt="" />
          <TextGothic
            text="도서목록"
            fontWeight={700}
            fontSize={24}
            lineHeight={32}
            style={{
              marginRight: "40px",
            }}
          />
          <TextGothic
            text="도서찾기"
            fontWeight={700}
            fontSize={24}
            lineHeight={32}
          />
        </div>
        <div className={styles.right}>
          <TextGothic
            text="알림"
            fontWeight={700}
            fontSize={24}
            lineHeight={32}
            style={{
              marginRight: "40px",
            }}
          />
          <TextGothic
            text="내정보"
            fontWeight={700}
            fontSize={24}
            lineHeight={32}
          />
        </div>
      </header>
    </>
  );
}
