import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieTrailer from 'movie-trailer';
import * as RiIcons from 'react-icons/ri';
import { truncate } from '../../../helpers/Truncate';
import styles from './Card.module.css';

const Card = ({ group, data, cname }) => {
  const [loaded, setLoaded] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // if group === tv detail, create render function

  useEffect(() => {
    setLoaded(false);
  }, []);

  // ここで一つ一つトレイラーを作っていることで時間がかかっているみたい。ボタンを押してからトレイラー対応するなりなんか考える
  useEffect(() => {
    if (group === 'Movie') {
      movieTrailer(null, { tmdbId: data?.id })
        .then((res) => {
          const url = new URL(res);
          const param = new URLSearchParams(url.search);
          setTrailerUrl(param.get('v'));
        })
        .catch((err) => console.log(err));
    }
  }, [data?.id]);

  const videoSrc = `https://www.youtube.com/embed/${trailerUrl}`;

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const onLoad = () => {
    setLoaded(true);
  };

  return (
    <React.Fragment>
      <div className={styles.img}>
        <img
          className={`${styles.poster} ${
            cname === 'grid' && styles['grid-poster']
          } ${loaded && styles['poster-open']}`}
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          alt={data.original_title ? data.original_title : data.original_name}
          onLoad={onLoad}
        />
        <div
          className={`${styles.cover} ${
            group === 'Movie' && styles['cover-open']
          }`}
        >
          <button
            className={styles['cover-btn']}
            onClick={() => setIsModalOpen(true)}
          >
            <RiIcons.RiArrowRightSFill className={styles['cover-icon']} />
          </button>
        </div>
      </div>
      <Link
        to={
          group === 'Movie'
            ? `../../detail/${data.id}`
            : `../../tvdetail/${data.id}`
        }
        className={styles.title}
      >
        {group === 'tv detail'
          ? data.name
          : data.original_title
          ? truncate(data.original_title, 24)
          : truncate(data.original_name, 24)}
      </Link>
      <p className={styles.dateseason}>
        {group === 'tv detail'
          ? `${data.episode_count} episodes`
          : calcYear(
              data.release_date ? data.release_date : data.first_air_date
            )}
      </p>
      <div className={`${styles.modal} ${!isModalOpen && styles.hidden}`}>
        <iframe src={videoSrc} title={data.id} width="100%" height="100%" />
      </div>
      <div
        className={`${styles.overlay} ${!isModalOpen && styles.hidden}`}
        onClick={() => setIsModalOpen(false)}
      ></div>
    </React.Fragment>
  );
};

export default Card;
