import React, { useState, useEffect } from 'react';
import movieTrailer from 'movie-trailer';
import styles from './MovieTrailer.module.css';

const MovieTrailer = ({ id, isModalOpen, setIsModalOpen }) => {
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    movieTrailer(null, { tmdbId: id })
      .then((res) => {
        const url = new URL(res);
        const param = new URLSearchParams(url.search);
        setTrailerUrl(param.get('v'));
      })
      .catch((err) => console.log(err));
  }, [id]);

  const videoSrc = `https://www.youtube.com/embed/${trailerUrl}`;

  return (
    <React.Fragment>
      <div className={`${styles.modal} ${!isModalOpen && styles.hidden}`}>
        <iframe src={videoSrc} title={id} width="100%" height="100%" />
      </div>
      <div
        className={`${styles.overlay} ${!isModalOpen && styles.hidden}`}
        onClick={() => setIsModalOpen(false)}
      ></div>
    </React.Fragment>
  );
};

export default MovieTrailer;
