import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingIcon from '../helpers/LoadingIcon';
import styles from './TVDetailEpisodes.module.css';

const TVDetailEpisodes = ({ name, seasons, isFetching, isError }) => {
  const { episodenum } = useParams();

  if (isFetching || !seasons) {
    return <LoadingIcon />;
  }

  if (isError?.status) {
    return <p>{isError.errorMessage}</p>;
  }

  const data = seasons?.episodes.find(
    (item) => item.episode_number === +episodenum
  );

  return (
    <div className={styles.episode}>
      <div className={styles.main}>
        <div className={styles.img}>
          <img
            src={
              !data.still_path
                ? 'https://cdn.dribbble.com/users/2549306/screenshots/14306992/media/1568f08221d5a887546e2d386179ff4b.png?compress=1&resize=1000x750&vertical=top'
                : `https://image.tmdb.org/t/p/original${data.still_path}`
            }
            alt={data.name}
            className={styles.poster}
            loading="lazy"
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
      <div className={styles.overview}>{data.overview}</div>
      <div className={styles['release-date']}>
        Released
        <span>{data.air_date.replaceAll('-', '/')}</span>
      </div>
    </div>
  );
};

export default TVDetailEpisodes;
