import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import movieTrailer from 'movie-trailer';
import history from '../history';
import styles from './Modal.module.css';

const Overlay = (props) => {
  return (
    <div
      className={styles.backdrop}
      onClick={() => history.push(`/detail/${props.id}`)}
    ></div>
  );
};

const Play = (props) => {
  const [trailerUrl, setTrailerUrl] = useState('');

  // console.log(props);
  // const { id } = props.match.params;

  useEffect(() => {
    movieTrailer(null, { tmdbId: props.id })
      .then((res) => {
        const url = new URL(res);
        const param = new URLSearchParams(url.search);
        console.log(param.get('v'));
        setTrailerUrl(param.get('v'));
      })
      .catch((err) => console.log(err));
  }, []);

  // const onPlay = () => {
  //   movieTrailer(null, { tmdbId: props.id })
  //     .then((res) => {
  //       const url = new URL(res);
  //       const param = new URLSearchParams(url.search);
  //       console.log(param.get('v'));
  //       setTrailerUrl(param.get('v'));
  //     })
  //     .catch((err) => console.log(err));
  // };

  const videoSrc = `https://www.youtube.com/embed/${trailerUrl}`;

  return (
    <div className={styles.modal}>
      <iframe src={videoSrc} width="100%" height="100%" />
    </div>
  );
};

const Modal = (props) => {
  // console.log(props);
  const { id } = props.match.params;

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Overlay id={id} />,
        document.getElementById('overlay')
      )}
      {ReactDOM.createPortal(
        <Play id={id} />,
        document.getElementById('modal')
      )}
    </React.Fragment>
  );
};

export default Modal;
