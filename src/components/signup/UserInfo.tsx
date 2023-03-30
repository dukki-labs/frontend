import { useState } from "react";
import Text from "@/components/common/Text";
import TextGothic from "@/components/common/TextGothic";
import styles from "@/styles/Entrance.module.scss";
import { api } from "@/utils/api";

interface Input {
  type: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const Input = ({
  type,
  value,
  onChange,
  placeholder,
  disabled = false,
}: Input) => {
  return (
    <div className={styles.inputBox}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

interface UserInfo {
  onClickButton: (
    memberId: number,
    email: string,
    password: string,
    nickName: string,
  ) => void;
}

export default function UserInfo({ onClickButton }: UserInfo) {
  const [email, setEmail] = useState("");
  const [authNumber, setAuthNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [isAuthDone, setIsAuthDone] = useState(false);
  const [tempMemberId, setTempMemberId] = useState(0);

  const onClickSendAuthNum = async () => {
    const { data, status } = await api.post(`/api/v1/account/send-code`, {
      email,
    });
    if (status === 200) {
      setTempMemberId(data.memberId);
    }
  };

  const onChangeAuthNumber = async (v: string) => {
    if (v.length > 6) return;
    setAuthNumber(v);
    if (v.length === 6) {
      const { status } = await api.post(`/api/v1/account/check-auth-code`, {
        memberId: tempMemberId,
        authCode: v,
      });
      if (status === 200) {
        setIsAuthDone(true);
      }
    }
  };

  const onClickUserInfo = () => {
    onClickButton(tempMemberId, email, password, nickName);
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
            disabled={false}
          />
          <div
            className={`${styles.validationButton} ${
              email.includes("@") && email.includes(".") ? styles.on : ""
            }`}
            onClick={onClickSendAuthNum}
          >
            <TextGothic
              text="인증"
              fontWeight={700}
              fontSize={20}
              lineHeight={28}
              color="white"
            />
          </div>
        </div>
        <div className={styles.authNumber}>
          <Input
            type="text"
            value={authNumber}
            onChange={onChangeAuthNumber}
            placeholder="이메일 인증 번호"
            disabled={tempMemberId === 0 ? true : false}
          />
        </div>
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
          disabled={false}
        />
        <Input
          type="password"
          value={passwordCheck}
          onChange={setPasswordCheck}
          placeholder="패스워드 재입력"
          disabled={false}
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
          disabled={false}
        />
      </div>
      <div
        className={`${styles.button} ${
          email && isAuthDone && password === passwordCheck && nickName
            ? styles.on
            : ""
        }`}
        onClick={onClickUserInfo}
      >
        <Text
          text="다음"
          fontSize={24}
          lineHeight={32}
          color={
            email && isAuthDone && password === passwordCheck && nickName
              ? "#1a1a1a"
              : "white"
          }
        />
      </div>
    </div>
  );
}
