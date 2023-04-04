import { atom, useRecoilState } from "recoil";

export const meberIdState = atom({
  key: "meberIdState",
  default: 0,
});

export default function UseMemberId() {
  const [memberId, setMemberId] = useRecoilState(meberIdState);

  return { memberId, setMemberId };
}
