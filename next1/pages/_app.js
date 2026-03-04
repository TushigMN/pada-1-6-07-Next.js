import Header from "../components/Header";
import "../app/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
