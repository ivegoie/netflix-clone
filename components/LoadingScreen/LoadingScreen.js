import Image from "next/image";
import styles from "./LoadingScreen.module.css";

const LoadingScreen = () => {
  return (
    <div className={styles.container}>
      <Image src={"/static/netflix.svg"} width={300} height={70} />
      <p className={styles.loader}>Loading...</p>
    </div>
  );
};

export default LoadingScreen;
