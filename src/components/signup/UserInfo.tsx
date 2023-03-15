import { useState } from "react";
import Text from "@/components/common/Text";
import TextGothic from "@/components/common/TextGothic";
import styles from "@/styles/Entrance.module.scss";

interface Input {
  type: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const Input = ({ type, value, onChange, placeholder }: Input) => {
  return (
    <div className={styles.inputBox}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

interface UserInfo {
  onClickButton: (email: string, password: string, nickName: string) => void;
}

export default function UserInfo({ onClickButton }: UserInfo) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");

  const onClickUserInfo = () => {
    onClickButton(email, password, nickName);
  };

  return (
    <div className={styles.userInfoWrapper}>
      <div className={styles.infoBox}>
        <TextGothic
          text="이메일"
          fontWeight={700}
          fontSize={20}
          lineHeight={28}
          style={{
            display: "block",
            marginBottom: "16px",
          }}
        />
        <div className={styles.validation}>
          <Input
            type="text"
            value={email}
            onChange={setEmail}
            placeholder="이메일 입력"
          />
          <div className={styles.validationButton}>
            <TextGothic
              text="인증"
              fontWeight={700}
              fontSize={20}
              lineHeight={28}
              color="white"
            />
          </div>
        </div>
        <Input
          type="text"
          value={email}
          onChange={setEmail}
          placeholder="이메일 입력"
        />
      </div>
      <div className={styles.infoBox}>
        <TextGothic
          text="패스워드"
          fontWeight={700}
          fontSize={20}
          lineHeight={28}
          style={{
            display: "block",
            marginBottom: "16px",
          }}
        />
        <Input
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="패스워드 입력 (8자 이상)"
        />
        <Input
          type="password"
          value={passwordCheck}
          onChange={setPasswordCheck}
          placeholder="패스워드 재입력"
        />
      </div>
      <div className={styles.infoBox}>
        <TextGothic
          text="닉네임"
          fontWeight={700}
          fontSize={20}
          lineHeight={28}
          style={{
            display: "block",
            marginBottom: "16px",
          }}
        />
        <Input
          type="text"
          value={nickName}
          onChange={setNickName}
          placeholder="닉네임 입력"
        />
      </div>
      <div
        className={`${styles.button} ${
          email && password === passwordCheck && nickName ? styles.on : ""
        }`}
        onClick={onClickUserInfo}
      >
        <Text
          text="다음"
          fontSize={24}
          lineHeight={32}
          color={
            email && password === passwordCheck && nickName
              ? "#1a1a1a"
              : "white"
          }
        />
      </div>
    </div>
  );
}
