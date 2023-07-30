import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { JobProvider } from "@/context/JobContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <JobProvider>
        <Component {...pageProps} />
      </JobProvider>
    </AuthProvider>
  );
}
