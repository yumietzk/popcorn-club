import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as IoIcons from 'react-icons/io';
import styles from './DetailMain.module.css';

const DetailMain = ({ data, isFetching, isError }) => {
  // useEffect(() => {
  //   setDetailBackground({
  //     isON: true,
  //     url: data?.poster_path,
  //   });
  // }, [data]);

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const calcHour = (runtime) => {
    const hr = Math.floor(runtime / 60);
    const min = runtime % 60;
    const hours = (hr) => {
      if (hr === 0) {
        return '';
      } else {
        return `${hr} hr`;
      }
    };
    return `${hours(hr)} ${min} min`;
  };

  const renderMain = () => {
    if (isFetching || !data) {
      return <div>Now loading...</div>;
    }

    if (isError?.status) {
      return <p>{isError.errorMessage}</p>;
    }

    return (
      <div className={styles.main}>
        <div className={styles.img}>
          <img
            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            alt={data.original_title}
            className={styles.poster}
            // onLoad={onLoad}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            <h2 className={styles.titleName}>{data.original_title}</h2>
            {/* {isSignedIn && (
              <button
                className={styles.favorite}
                onClick={() =>
                  onClickFavorite(
                    data.id,
                    data.poster_path,
                    data.original_title,
                    data.release_date
                  )
                }
              >
                <IoIcons.IoIosHeart
                  className={
                    favorite
                      ? styles['favorite-icon-true']
                      : styles['favorite-icon']
                  }
                />
              </button>
            )} */}
          </div>
          <div className={styles.date}>{calcYear(data.release_date)}</div>
          <div className={styles.timerate}>
            <div className={styles.runtime}>{`${calcHour(data.runtime)}`}</div>
            <div className={styles.rate}>
              <IoIcons.IoIosStar className={styles['rate-icon']} />
              {data.vote_average}
            </div>
          </div>
          <div className={styles.others}>
            <button className={styles.play}>
              <IoIcons.IoIosPlay className={styles['play-icon']} />
              Play
            </button>
            <button className={styles.link}>
              <Link
                to={{ pathname: data.homepage }}
                target="_blank"
                className={styles['link-page']}
              >
                <IoIcons.IoIosLink className={styles['link-icon']} />
              </Link>
            </button>
          </div>
          <div className={styles.overview}>{data.overview}</div>
          <div className={styles.genre}>
            <div className={styles['genre-title']}>Genre</div>
            <div className={styles['genre-name']}>
              {data.genres.map((genre) => genre.name).join(', ')}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div className={styles.main}>{renderMain()}</div>;
};

export default DetailMain;
