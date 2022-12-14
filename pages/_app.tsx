import { SessionProvider } from "next-auth/react";
import "./styles.css";
import Script from "next/script";
import Head from "next/head";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <>
      <Head>
        <Script src="https://steadyhq.com/widget_loader/e7341ba7-b314-40d0-8c3c-5dccd8a7a260" />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
