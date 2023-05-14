import { useState } from "react";
import Image from "next/image";
import Text from "@/components/common/Text";
import TextGothic from "@/components/common/TextGothic";
import styles from "@/styles/Entrance.module.scss";
import { api } from "@/utils/api";
import UseAlertModal from "@/utils/useAlertModal";
import icon_check_on from "@/img/icon_check_on.svg";
import icon_check_off from "@/img/icon_check_off.svg";

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
    <div className={styles.input}>
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
  terms: boolean[];
  onClickTerm: (i: number) => void;
}

export default function UserInfo({
  terms,
  onClickTerm,
  onClickButton,
}: UserInfo) {
  const [email, setEmail] = useState("");
  const [authNumber, setAuthNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [isAuthDone, setIsAuthDone] = useState(false);
  const [tempMemberId, setTempMemberId] = useState(0);
  const { alertModal, setAlertModal } = UseAlertModal();

  const onClickSendAuthNum = async () => {
    try {
      const { data, status } = await api.post(`/api/v1/account/send-code`, {
        email,
      });
      if (status === 200) {
        setTempMemberId(data.memberId);
        setAlertModal({
          ...alertModal,
          title: "인증 번호가 발송되었어요!",
          desc: "이메일로 발송된 인증 번호를 확인해 주세요.",
          buttonText: "확인",
          isOpen: true,
          onConfirm: () => {
            setAlertModal((prev) => ({ ...prev, isOpen: false }));
          },
        });
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.errorMessage;
      setAlertModal({
        ...alertModal,
        title: "안내",
        desc: errorMessage,
        buttonText: "확인",
        isOpen: true,
        onConfirm: () => {
          setAlertModal((prev) => ({ ...prev, isOpen: false }));
        },
      });
    }
  };

  const onChangeAuthNumber = async (v: string) => {
    try {
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
    } catch (error: any) {
      const errorMessage = error?.response?.data?.errorMessage;
      setAlertModal({
        ...alertModal,
        title: "안내",
        desc: errorMessage,
        buttonText: "확인",
        isOpen: true,
        onConfirm: () => {
          setAlertModal((prev) => ({ ...prev, isOpen: false }));
        },
      });
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
          fontSize={16}
          lineHeight={24}
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
            disabled={isAuthDone}
          />
          <div
            className={`${styles.validationButton} ${
              email.includes("@") && email.includes(".") ? styles.on : ""
            }`}
            onClick={
              email.includes("@") && email.includes(".")
                ? onClickSendAuthNum
                : () => {}
            }
          >
            <TextGothic
              text="인증"
              fontWeight={700}
              fontSize={16}
              lineHeight={24}
              color="white"
            />
          </div>
        </div>
        {tempMemberId !== 0 && (
          <div className={styles.authNumber}>
            <Input
              type="text"
              value={authNumber}
              onChange={onChangeAuthNumber}
              placeholder="이메일 인증 번호 입력"
              disabled={isAuthDone}
            />
          </div>
        )}
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
      <div className={styles.divider} />
      <div className={styles.signupWrapper}>
        <div className={styles.allAgree}>
          <Image
            src={
              terms[0] && terms[1] && terms[2] ? icon_check_on : icon_check_off
            }
            alt=""
            onClick={() => onClickTerm(3)}
          />
          <Text
            text="이용 약관에 모두 동의할게요."
            fontWeight={400}
            fontSize={16}
            lineHeight={28}
          />
        </div>
        <div className={styles.terms}>
          <Image
            src={terms[0] ? icon_check_on : icon_check_off}
            alt=""
            onClick={() => onClickTerm(0)}
          />
          <Text
            text="[필수] 이용 약관에 모두 동의할게요."
            fontWeight={400}
            fontSize={16}
            lineHeight={28}
          />
        </div>
        <div className={styles.terms}>
          <Image
            src={terms[1] ? icon_check_on : icon_check_off}
            alt=""
            onClick={() => onClickTerm(1)}
          />
          <Text
            text="[필수] 개인정보 처리 방침에 동의할게요."
            fontWeight={400}
            fontSize={16}
            lineHeight={28}
          />
        </div>
        <div className={styles.terms}>
          <Image
            src={terms[2] ? icon_check_on : icon_check_off}
            alt=""
            onClick={() => onClickTerm(2)}
          />
          <Text
            text="[선택] 이메일 수신에 동의할게요."
            fontWeight={400}
            fontSize={16}
            lineHeight={28}
          />
        </div>
      </div>
      {email &&
      email.includes("@") &&
      email.includes(".") &&
      isAuthDone &&
      password === passwordCheck &&
      password.length > 7 &&
      nickName.length > 3 &&
      terms[0] &&
      terms[1] ? (
        <div
          className={`${styles.button} ${styles.on}`}
          onClick={onClickUserInfo}
        >
          <Text text="다음" fontSize={24} lineHeight={32} color="white" />
        </div>
      ) : (
        <div className={styles.button}>
          <Text text="다음" fontSize={24} lineHeight={32} color="white" />
        </div>
      )}
    </div>
  );
}
