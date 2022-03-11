import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import movieTrailer from 'movie-trailer';
import * as IoIcons from 'react-icons/io';
import {
  fetchFavoriteMovies,
  fetchFavoriteTVShows,
  saveMovie,
  saveTVShow,
  deleteMovie,
  deleteTVShow,
} from '../../actions';
import { setImage } from '../../helpers/SetImage';
import { truncate } from '../../helpers/Truncate';
import ToggleBtn from '../../components/UI/Button/ToggleBtn';
import SelectorsData from '../../components/data/SelectorsData';
import styles from './DetailMain.module.css';

const DetailMain = ({
  setSelectedItem,
  setIsAscend,
  group,
  data,
  width,
  fetchFavoriteMovies,
  fetchFavoriteTVShows,
  saveMovie,
  saveTVShow,
  deleteMovie,
  deleteTVShow,
  isSignedIn,
  favoriteMovies,
  favoriteTVShows,
}) => {
  const [trailerUrl, setTrailerUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const ref = useRef();
  const [curElement, setElement] = useState();

  const targetData = !data.poster_path
    ? 'https://cdn.dribbble.com/users/2549306/screenshots/14306992/media/f7c46c1ebbd7195bed3b6aa27228b1fd.png?compress=1&resize=1200x900&vertical=top'
    : `https://image.tmdb.org/t/p/original${data.poster_path}`;

  useEffect(() => {
    setElement(ref?.current?.childNodes[0]);
  }, [ref]);

  useEffect(() => {
    setImage(curElement, targetData);
  }, [curElement, data]);

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

  useEffect(() => {
    handleFavorite();
  }, [favoriteMovies, favoriteTVShows]);

  const { id } = useParams();

  const handleFavorite = () => {
    if (group === 'movies') {
      if (!favoriteMovies) {
        setFavorite(false);
      } else {
        const isFavorite = (id) =>
          favoriteMovies.some((item) => item.id === +id);
        setFavorite(isFavorite(id));
      }
    } else if (group === 'tvshows') {
      if (!favoriteTVShows) {
        setFavorite(false);
      } else {
        const isFavorite = (id) =>
          favoriteTVShows.some((item) => item.id === +id);
        setFavorite(isFavorite(id));
      }
    }
  };

  const videoSrc = `https://www.youtube.com/embed/${trailerUrl}`;

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const calcHour = (runtime) => {
    if (!runtime) return null;

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

  const onClickFavorite = (id, path, title, date) => {
    if (!favorite) {
      if (group === 'movies') {
        saveMovie(id, path, title, date);
      } else if (group === 'tvshows') {
        saveTVShow(id, path, title, date);
      }
    } else {
      if (group === 'movies') {
        deleteMovie(id);
      } else if (group === 'tvshows') {
        deleteTVShow(id);
      }
    }
  };

  const renderOverview = () => {
    if (!data.overview) return null;

    if (
      data.overview.length >
      `${width > 450 && width <= 600 ? 100 : width <= 450 ? 200 : 300}`
    ) {
      if (isToggleOpen) {
        return <div className={styles.overview}>{data.overview}</div>;
      } else {
        return (
          <div className={styles.overview}>
            {truncate(
              data.overview,
              `${width > 450 && width <= 600 ? 100 : width <= 450 ? 200 : 300}`
            )}
          </div>
        );
      }
    } else {
      return (
        <div className={styles.overview} style={{ marginBottom: '3rem' }}>
          {data.overview}
        </div>
      );
    }
  };

  const genreLink = (genres) => {
    if (!genres || genres.length === 0) return null;

    return genres.map((genre, i) => {
      return (
        <p key={i}>
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

  const renderMain = () => {
    return (
      <React.Fragment>
        <div className={styles.img} ref={ref}>
          <img
            alt={data.original_title ? data.original_title : data.original_name}
            className={styles.poster}
          />
        </div>

        {width <= 450 ? (
          <div className={styles['mobile-content']}>
            <div className={styles.title}>
              <h2 className={styles['title-name']}>
                {data.original_title ? data.original_title : data.original_name}
              </h2>
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
                {data.vote_average ? data.vote_average : 0}
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
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.title}>
              <h2 className={styles['title-name']}>
                {data.original_title ? data.original_title : data.original_name}
              </h2>
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
                {data.vote_average ? data.vote_average : 0}
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
              {isSignedIn && (
                <button
                  className={styles.favorite}
                  onClick={() =>
                    onClickFavorite(
                      data.id,
                      data.poster_path,
                      group === 'movies'
                        ? data.original_title
                        : data.original_name,
                      group === 'movies'
                        ? data.release_date
                        : data.first_air_date
                    )
                  }
                  data-testid="favorite-btn"
                >
                  <IoIcons.IoIosHeart
                    className={`${styles['favorite-icon']} ${
                      favorite && styles['favorite-true']
                    }`}
                  />
                </button>
              )}
            </div>

            {renderOverview()}
            <ToggleBtn
              condition={
                data.overview.length >
                `${
                  width > 450 && width <= 600 ? 100 : width <= 450 ? 200 : 300
                }`
              }
              isToggleOpen={isToggleOpen}
              setIsToggleOpen={setIsToggleOpen}
            />

            <div
              className={styles.genre}
              style={{ marginTop: data.overview.length > 400 && '3rem' }}
            >
              <div className={styles['genre-title']}>Genre</div>
              <div className={styles['genre-names']}>
                {genreLink(data.genres)}
              </div>
            </div>
          </div>
        )}

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

  return (
    <React.Fragment>
      <div className={styles.main}>{renderMain()}</div>
      {width <= 450 && (
        <React.Fragment>
          {renderOverview()}
          <ToggleBtn
            condition={
              data.overview.length >
              `${width > 450 && width <= 600 ? 100 : width <= 450 ? 200 : 300}`
            }
            isToggleOpen={isToggleOpen}
            setIsToggleOpen={setIsToggleOpen}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    favoriteMovies: state.movies.favorite,
    favoriteTVShows: state.shows.favorite,
  };
};

export default connect(mapStateToProps, {
  fetchFavoriteMovies,
  fetchFavoriteTVShows,
  saveMovie,
  saveTVShow,
  deleteMovie,
  deleteTVShow,
})(DetailMain);
