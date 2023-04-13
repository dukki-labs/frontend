import { useRouter } from "next/router";
import styles from "@/styles/Common.module.scss";
import Text from "@/components/common/Text";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div>
          <Text
            text="@Copyright Litarary"
            fontWeight={400}
            fontSize={16}
            lineHeight={24}
          />
        </div>
        <div>
          <Text
            text="리터러리 이용 약관"
            fontWeight={400}
            fontSize={16}
            lineHeight={24}
            style={{
              textDecoration: "underline",
            }}
          />
          <Text
            text="|"
            fontWeight={400}
            fontSize={16}
            lineHeight={24}
            color="#EDEDED"
            style={{
              margin: "0 12px",
            }}
          />
          <Text
            text="개인정보 처리 방침"
            fontWeight={400}
            fontSize={16}
            lineHeight={24}
            style={{
              textDecoration: "underline",
            }}
          />
          <Text
            text="|"
            fontWeight={400}
            fontSize={16}
            lineHeight={24}
            color="#EDEDED"
            style={{
              margin: "0 12px",
            }}
          />
          <Text
            text="Site by DOUKKI (Jun-Hee Lee, Tae-Kyung Han, Dae-hee Kim, Su-min Jang)"
            fontWeight={400}
            fontSize={16}
            lineHeight={24}
          />
        </div>
      </div>
    </footer>
  );
}
