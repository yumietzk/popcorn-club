import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieTrailer from 'movie-trailer';
import * as IoIcons from 'react-icons/io';
import { truncate } from '../../helpers/Truncate';
import SelectorsData from '../../components/data/SelectorsData';
import styles from './DetailMain.module.css';

// selectedItemのmovieとtvshowの違いで分けれる？？
const DetailMain = ({
  setSelectedItem,
  setIsAscend,
  group,
  data,
  isFetching,
  isError,
}) => {
  // const [selectedItem, setSelectedItem] = useState({
  //   category: SelectorsData.movies.category[0].title,
  //   order: SelectorsData.movies.order[0].title,
  //   count: SelectorsData.movies.count[0].title,
  // });
  const [trailerUrl, setTrailerUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (group === 'movies') {
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

  const changeSelectedItem = (genre) => {
    setSelectedItem({
      category: genre.name,
      order: SelectorsData[group].order[0].title,
      count: SelectorsData[group].count[0].title,
    });

    setIsAscend({
      title: true,
      releaseDate: false,
      rating: false,
    });
  };

  // let navigate = useNavigate();
  // const handleClick = (url) => {
  //   navigate(url);
  // };

  const renderMain = () => {
    if (isFetching || !data) {
      return <div>Now loading...</div>;
    }

    if (isError?.status) {
      return <p>{isError.errorMessage}</p>;
    }

    const genreLink = (genres) => {
      return genres.map((genre, i) => {
        return (
          <p>
            {/* ちゃんと飛ぶけど、ページとタイトルのボタンが更新されない */}
            <Link
              to={`../../${
                group === 'movies' ? 'movies' : 'tvshows'
              }/genre/${genre.name.toLowerCase()}`}
              key={i}
              className={styles['genre-name']}
              onClick={() => changeSelectedItem(genre)}
            >
              {genre.name}
            </Link>
            {i !== genres.length - 1 && <>{','}&nbsp;</>}
          </p>
        );
      });
    };

    return (
      <React.Fragment>
        <div className={styles.img}>
          <img
            src={
              !data.poster_path
                ? 'https://cdn.dribbble.com/users/2549306/screenshots/14306992/media/f7c46c1ebbd7195bed3b6aa27228b1fd.png?compress=1&resize=1200x900&vertical=top'
                : `https://image.tmdb.org/t/p/original${data.poster_path}`
            }
            alt={data.original_title ? data.original_title : data.original_name}
            className={styles.poster}
            // onLoad={onLoad}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            <h2 className={styles.titleName}>
              {data.original_title ? data.original_title : data.original_name}
            </h2>
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
          <div className={styles.date}>
            {calcYear(
              `${data.release_date ? data.release_date : data.first_air_date}`
            )}
          </div>
          <div className={styles.timerate}>
            <div className={styles.runtime}>{`${calcHour(
              `${data.runtime ? data.runtime : data.episode_run_time[0]}`
            )}`}</div>
            <div className={styles.rate}>
              <IoIcons.IoIosStar className={styles['rate-icon']} />
              {data.vote_average}
            </div>
          </div>
          <div className={styles.others}>
            {group === 'movies' && (
              <button
                className={styles.play}
                onClick={() => setIsModalOpen(true)}
              >
                <IoIcons.IoIosPlay className={styles['play-icon']} />
                Play
              </button>
            )}
            <a
              href={`${data.homepage}`}
              target="_blank"
              className={styles.link}
            >
              <IoIcons.IoIosLink className={styles['link-icon']} />
              Website
            </a>
          </div>
          <div className={styles.overview}>{truncate(data.overview, 700)}</div>
          <div className={styles.genre}>
            <div className={styles['genre-title']}>Genre</div>
            <div className={styles['genre-names']}>
              {genreLink(data.genres)}
            </div>
          </div>
        </div>
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

  return <div className={styles.main}>{renderMain()}</div>;
};

export default DetailMain;
