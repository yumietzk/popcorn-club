import React, { useState, useEffect, useRef } from 'react';
import { setImage } from '../../helpers/SetImage';
import { truncate } from '../../helpers/Truncate';
import ToggleBtn from '../UI/Button/ToggleBtn';
import styles from './EpisodeContent.module.css';

const EpisodeContent = ({ name, data }) => {
  const ref = useRef();
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
    if (!data.overview) return null;

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
          <img alt={data.name} className={styles.poster} />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{name}</h2>
          <div className={styles.season}>Season {data.season_number}</div>
          <div className={styles['episode-title']}>
            Episode {data.episode_number} <>&middot;</> {data.name}
          </div>
        </div>
      </div>
      {renderOverview()}
      <div className={styles['toggle-btn']}>
        <ToggleBtn
          condition={data.overview.length > 500}
          isToggleOpen={isToggleOpen}
          setIsToggleOpen={setIsToggleOpen}
        />
      </div>
      <div className={styles['release-date']}>
        {data.air_date && 'Released'}
        {data.air_date && <span>{data.air_date.replaceAll('-', '/')}</span>}
      </div>
    </div>
  );
};

export default EpisodeContent;
