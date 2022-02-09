import React, { useState, useEffect, useRef } from 'react';
// import useObserver from '../hooks/useObserver';
import { setImage } from '../helpers/SetImage';
import { truncate } from '../helpers/Truncate';
import ToggleBtn from '../components/UI/ToggleBtn';
import styles from './EpisodeContent.module.css';

const EpisodeContent = ({ name, data }) => {
  const ref = useRef();
  // const [curElement, setSrc] = useObserver(ref);
  const [curElement, setElement] = useState();
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const targetData = !data.still_path
    ? 'https://cdn.dribbble.com/users/2549306/screenshots/14306992/media/1568f08221d5a887546e2d386179ff4b.png?compress=1&resize=1000x750&vertical=top'
    : `https://image.tmdb.org/t/p/original${data.still_path}`;

  useEffect(() => {
    setElement(ref?.current?.childNodes[0]);
  }, [ref]);

  useEffect(() => {
    setImage(curElement, targetData);
  }, [curElement, data]);

  const renderOverview = () => {
    if (data.overview.length > 500) {
      if (isToggleOpen) {
        return <div className={styles.overview}>{data.overview}</div>;
      } else {
        return (
          <div className={styles.overview}>{truncate(data.overview, 500)}</div>
        );
      }
    } else {
      return <div className={styles.overview}>{data.overview}</div>;
    }
  };

  return (
    <div className={styles.episode}>
      <div className={styles.main}>
        <div className={styles.img} ref={ref}>
          <img
            // src={
            //   !data.still_path
            //     ? 'https://cdn.dribbble.com/users/2549306/screenshots/14306992/media/1568f08221d5a887546e2d386179ff4b.png?compress=1&resize=1000x750&vertical=top'
            //     : `https://image.tmdb.org/t/p/original${data.still_path}`
            // }
            alt={data.name}
            className={styles.poster}
            // loading="lazy"
          />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{name}</h2>
          <div className={styles.season}>Season {data.season_number}</div>
          <div className={styles['episode-title']}>
            Episode {data.episode_number} <>&middot;</> {data.name}
          </div>
        </div>
      </div>
      {/* <div className={styles.overview}>{data.overview}</div> */}
      {renderOverview()}
      <div style={{ paddingLeft: '3.8rem', marginBottom: '3rem' }}>
        <ToggleBtn
          condition={data.overview.length > 500}
          isToggleOpen={isToggleOpen}
          setIsToggleOpen={setIsToggleOpen}
        />
      </div>
      <div className={styles['release-date']}>
        Released
        <span>{data.air_date.replaceAll('-', '/')}</span>
      </div>
    </div>
  );
};

export default EpisodeContent;
