import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import AlertModal from "@/components/common/AlertModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Header />
        <AlertModal />
        <Component {...pageProps} />
        <Footer />
      </RecoilRoot>
    </>
  );
}
