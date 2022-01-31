import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import movieTrailer from 'movie-trailer';
import * as IoIcons from 'react-icons/io';
import { truncate } from '../../../helpers/Truncate';
// import MovieTrailer from '../../MovieTrailer';
import styles from './Card.module.css';

const Card = ({ group, data, cname }) => {
  const [loaded, setLoaded] = useState(false);
  // const [trailerUrl, setTrailerUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // if group === tv detail, create render function

  useEffect(() => {
    setLoaded(false);
  }, []);

  // ここで一つ一つトレイラーを作っていることで時間がかかっているみたい。ボタンを押してからトレイラー対応するなりなんか考える
  // ⚠️やっぱりまだ最初のダウンロードに時間がかかっているから、トレイラーではなくてdetailに飛ぶボタンなりなんかにしてみる

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const onLoad = () => {
    setLoaded(true);
  };

  return (
    <React.Fragment>
      <div
        className={`${styles.img} ${cname === 'grid' && styles['grid-img']}`}
      >
        <img
          className={`${styles.poster} ${
            cname === 'grid' && styles['grid-poster']
          } ${loaded && styles['poster-open']}`}
          src={`https://image.tmdb.org/t/p/original${
            group === 'tvseasons' ? data.still_path : data.poster_path
          }`}
          alt={
            group === 'tvseasons'
              ? data.name
              : data.original_title
              ? data.original_title
              : data.original_name
          }
          onLoad={onLoad}
        />
        <div className={styles.cover}>
          {/* <button
            className={styles['cover-btn']}
            // onClick={() => setIsModalOpen(true)}
          >
            <Link>
              <IoIcons.IoIosMore className={styles['cover-icon']} />
            </Link>
          </button> */}
          <Link
            to={
              group === 'tvdetail'
                ? `season/${data.season_number}`
                : group === 'tvseasons'
                ? `episode/${data.episode_number}`
                : `../../${
                    group === 'movies' || group === 'search'
                      ? 'detail'
                      : 'tvdetail'
                  }/${data.id}`
            }
            className={styles['cover-btn']}
          >
            <IoIcons.IoIosMore className={styles['cover-icon']} />
          </Link>
        </div>
      </div>
      <Link
        to={
          group === 'tvdetail'
            ? `season/${data.season_number}`
            : group === 'tvseasons'
            ? `episode/${data.episode_number}`
            : `../../${
                group === 'movies' || group === 'search' ? 'detail' : 'tvdetail'
              }/${data.id}`
        }
        className={`${styles.title} ${
          cname === 'grid' && styles['grid-title']
        }`}
      >
        {group === 'tvdetail' || group === 'tvseasons'
          ? data.name
          : data.original_title
          ? truncate(data.original_title, 24)
          : truncate(data.original_name, 24)}
      </Link>
      <p
        className={`${styles.dateseason} ${
          cname === 'grid' && styles['grid-dateseason']
        } ${group === 'tvseasons' && styles.episode}`}
      >
        {group === 'tvdetail'
          ? `${data.episode_count} episodes`
          : group === 'tvseasons'
          ? `Episode ${data.episode_number}`
          : calcYear(
              data.release_date ? data.release_date : data.first_air_date
            )}
      </p>
    </React.Fragment>
  );
};

export default Card;
