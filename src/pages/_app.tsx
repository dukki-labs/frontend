import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Header from "@/components/common/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}
