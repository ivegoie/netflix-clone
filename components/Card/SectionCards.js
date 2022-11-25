import Card from "./Card";

import styles from "./SectionCards.module.css";

const SectionCards = (props) => {
  const { title, videos = [], size } = props;
  return (
    <section className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, index) => {
          return (
            <Card imgUrl={video.imgUrl} key={index} id={index} size={size} />
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
