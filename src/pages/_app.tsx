import {
  ChakraProvider,
  extendTheme,
  ThemeConfig,
} from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { type AppProps } from "next/app";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import AuthContextProvider from "@/context";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
// const { BlobServiceClient } = require("@azure/storage-blob");
// const { v1: uuidv1 } = require("uuid");
require("dotenv").config();



const inter = Inter({ subsets: ["latin"] });
const supabaseUrl = "https://smtahwszfwziqyzwbnrg.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() =>
    createPagesBrowserClient({ supabaseUrl, supabaseKey })
  );
  const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: true,
  };

  const theme = extendTheme({ config });

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Analytics />

        <Head>
          <title>MARG</title>
          <meta property="og:title" content="MARG" key="title" />
        </Head>
        <ChakraProvider theme={theme}>
          <AuthContextProvider>
            <div className={inter.className}>
            </div>
            <Component {...pageProps} />
          </AuthContextProvider>
        </ChakraProvider>
      </SessionContextProvider>
    </>
  );
}
