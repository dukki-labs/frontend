import { atom, useRecoilState } from "recoil";

export const alertModalState = atom({
  key: "alertModalState",
  default: {
    isOpen: false,
    isTwoButton: false,
    title: "Title",
    desc: "Desc",
    buttonText: "확인",
    cancelText: "취소",
    onConfirm: () => {},
    onCancel: () => {},
  },
});

export default function UseAlertModal() {
  const [alertModal, setAlertModal] = useRecoilState(alertModalState);

  return { alertModal, setAlertModal };
}
