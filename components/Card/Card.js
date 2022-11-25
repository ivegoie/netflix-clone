import Image from "next/image";
import { useState } from "react";

import { motion } from "framer-motion";

import styles from "./Card.module.css";

const Card = (props) => {
  const { imgUrl, size } = props;

  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    console.log("error Cannot Get Image");
    setImgSrc("/static/netflix_undefined.jpg");
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={`${classMap[size]} ${styles.imgMotionWrapper}`}
        whileHover={{ scaleY: 1.1 }}
      >
        <Image
          src={imgSrc}
          alt="Image"
          layout="fill"
          className={styles.cardImg}
          onError={handleOnError}
        />
      </motion.div>
    </div>
  );
};

export default Card;
