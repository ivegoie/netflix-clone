import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styles from "../styles/Login.module.css";

import { magic } from "../lib/magic-client";

const login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [capsLockMessage, setCapsLockMessage] = useState("");
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
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

  const checkCapsLock = (event) => {
    if (event.getModifierState("CapsLock")) {
      setIsCapsLockOn(true);
      setCapsLockMessage("Warning: Caps Lock is ON");
    } else {
      setIsCapsLockOn(false);
    }
  };

  const isValidEmail = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  };

  const handleOnChangeEmail = (event) => {
    if (!isValidEmail(event.target.value)) {
      console.log(!isValidEmail(event.target.value));
      setUserMessage("Please, enter a valid email.");
      if (event.target.value === "") {
        setUserMessage("");
        setIsLoading(false);
      }
    } else {
      setUserMessage("");
    }

    const email = event.target.value;
    setUserEmail(email);
  };

  // * Magic Login

  const handleLogIn = async (event) => {
    event.preventDefault();

    if (userEmail) {
      if (userEmail === "djzik3@gmail.com") {
        try {
          setIsLoading(true);

          const didToken = await magic.auth.loginWithMagicLink({
            email: userEmail,
            showUI: true,
          });

          if (didToken) {
            router.push("/");
          }
        } catch (error) {
          // Handle errors if required!
          setUserMessage("Something went wrong while logging you in");
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setUserMessage("Opps! Something went Wrong!");
      }
    } else {
      handleOnChangeEmail();
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix - Sign In</title>
      </Head>
      <header className={styles.header}>
        <Link href="/">
          <div className={styles.headerWrapper}>
            <a className={styles.logoLink}>
              <div className={styles.logoWrapper}>
                <Image
                  src="/static/netflix.svg"
                  alt="Netflix logo"
                  width={128}
                  height={34}
                />
              </div>
            </a>
          </div>
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signInHeader}>Sign In</h1>

          {isCapsLockOn && (
            <span className={styles.capsLockMsg}>{capsLockMessage}</span>
          )}

          <input
            onKeyUp={checkCapsLock}
            className={userMessage ? styles.errorMsg : styles.emailInput}
            type="text"
            placeholder="Email Address"
            onChange={handleOnChangeEmail}
          />

          {setUserMessage && (
            <span className={styles.userMsg}>{userMessage}</span>
          )}

          <button className={styles.logInBtn} onClick={handleLogIn}>
            {isLoading ? "Logging you in" : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default login;
