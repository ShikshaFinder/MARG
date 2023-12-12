import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import { type AppProps } from "next/app";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import AuthContextProvider from "@/context";

const inter = Inter({ subsets: ["latin"] });
const supabaseUrl = "https://wexrtlzodmpxquqvjxlo.supabase.co";
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

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ChakraProvider>
        <AuthContextProvider>
          <div className={inter.className}>
            <Navbar />
            <Component {...pageProps} />
          </div>
        </AuthContextProvider>
      </ChakraProvider>
    </SessionContextProvider>
  );
}
