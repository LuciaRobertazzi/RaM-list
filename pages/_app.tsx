import "@/styles/globals.css";
import type { AppProps } from "next/app";
import EpisodesProvider from "@/contexts/EpisodesProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EpisodesProvider>
      <Component {...pageProps} />
    </EpisodesProvider>
  );
}
