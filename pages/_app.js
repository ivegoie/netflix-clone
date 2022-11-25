import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

import { magic } from "../lib/magic-client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function getIsLoggedIn() {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        // setIsLoading(false);
        router.push("/");
      } else {
        // setIsLoading(false);
        router.push("/login");
      }
      return () => {
        second;
      };
    }
    getIsLoggedIn();
    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return isLoading ? <LoadingScreen /> : <Component {...pageProps} />;
}

export default MyApp;
