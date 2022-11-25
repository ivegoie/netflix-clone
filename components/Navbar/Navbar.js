import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { magic } from "../../lib/magic-client";

import styles from "./Navbar.module.css";

import { useState, useEffect } from "react";

const Navbar = () => {
  const [userName, setUsername] = useState("");
  const [showDropdown, setShowDropDown] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function getUsername() {
      try {
        const { email } = await magic.user.getMetadata();
        if (email) {
          setUsername(email);
        }
      } catch (error) {
        console.log("Error retrieving email:", error);
      }
    }
    getUsername();
  }, []);

  const handleOnClickHome = (event) => {
    event.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (event) => {
    event.preventDefault();
    router.push("/browse/mylist");
  };

  const handleShowDropdown = (event) => {
    event.preventDefault();
    setShowDropDown(showDropdown ? false : true);
  };

  const handleSignOut = async (event) => {
    event.preventDefault();

    try {
      await magic.user.logout();
      console.log(await magic.user.isLoggedIn());
      router.push("/login");
    } catch (error) {
      console.log("Error logging out", error);
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Image
              src={"/static/netflix.svg"}
              alt="Netflix Logo"
              width={128}
              height={34}
            />
          </div>
        </a>

        <ul className={styles.navItems}>
          <li onClick={handleOnClickHome} className={styles.navItem}>
            Home
          </li>
          <li onClick={handleOnClickMyList} className={styles.navItem2}>
            My List
          </li>
        </ul>

        <nav className={styles.navContainer}>
          <div>
            <button onClick={handleShowDropdown} className={styles.usernameBtn}>
              <p className={styles.username}>{userName}</p>
              <Image
                src={"/static/expand_more.svg"}
                style={{ color: "white" }}
                alt="Expand Dropdown"
                width={22}
                height={22}
              />
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a onClick={handleSignOut} className={styles.linkName}>
                    Sign out of Netflix
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
