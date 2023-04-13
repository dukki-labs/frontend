import { useRouter } from "next/router";
import Image from "next/image";
import styles from "@/styles/Common.module.scss";
import TextGothic from "@/components/common/TextGothic";
import logo from "@/img/logo.png";
import icon_close from "@/img/icon_close_white.svg";
import icon_alarm from "@/img/icon_alarm.svg";
import icon_profile from "@/img/icon_profile.svg";
import icon_search from "@/img/icon_search.svg";

const WITHOUT_HEADER = ["/signin", "/signup", "/signup/done"];

export default function Header() {
  const router = useRouter();

  if (WITHOUT_HEADER.includes(router.asPath)) {
    return <></>;
  }

  return (
    <>
      <div className={styles.notice}>
        <TextGothic
          text="[공지] 리터러리에 방문하신 여러분을 진심으로 환영할게요!"
          fontWeight={400}
          fontSize={16}
          lineHeight={24}
          color="white"
        />
      </div>
      <header className={styles.header}>
        <div className={styles.left}>
          <Image src={logo} alt="" />
        </div>
        <div className={styles.right}>
          <Image src={icon_alarm} alt="" />
          <Image src={icon_profile} alt="" />
          <Image src={icon_search} alt="" />
        </div>
      </header>
    </>
  );
}
