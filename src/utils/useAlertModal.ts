import { atom, useRecoilState } from "recoil";

export const alertModalState = atom({
  key: "alertModalState",
  default: {
    isOpen: false,
    title: "Title",
    desc: "Desc",
    buttonText: "확인",
    onConfirm: () => {},
  },
});

export default function UseAlertModal() {
  const [alertModal, setAlertModal] = useRecoilState(alertModalState);

  return { alertModal, setAlertModal };
}
