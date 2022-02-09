import React, { useState, useEffect, useRef } from 'react';
// import useObserver from '../hooks/useObserver';
import { setImage } from '../helpers/SetImage';
import { truncate } from '../helpers/Truncate';
import ToggleBtn from '../components/UI/ToggleBtn';
import styles from './DetailSeasonsMain.module.css';

const DetailSeasonsMain = ({ name, data }) => {
  const ref = useRef();
  // const [curElement, setSrc] = useObserver(ref);
  const [curElement, setElement] = useState();
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const targetData = !data.poster_path
    ? 'https://cdn.dribbble.com/users/2549306/screenshots/14306992/media/0be875c520dcf6b4b7176738ec346334.png?compress=1&resize=1000x750&vertical=top'
    : `https://image.tmdb.org/t/p/original${data.poster_path}`;

  useEffect(() => {
    setElement(ref?.current?.childNodes[0]);
  }, [ref]);

  useEffect(() => {
    setImage(curElement, targetData);
  }, [curElement, data]);

  const renderOverview = () => {
    if (data.overview.length > 400) {
      if (isToggleOpen) {
        return <div className={styles.overview}>{data.overview}</div>;
      } else {
        return (
          <div className={styles.overview}>{truncate(data.overview, 400)}</div>
        );
      }
    } else {
      return <div className={styles.overview}>{data.overview}</div>;
    }
  };

  return (
    <div className={styles['seasons-main']}>
      <div className={styles.img} ref={ref}>
        <img
          // src={
          //   !data.poster_path
          //     ? 'https://cdn.dribbble.com/users/2549306/screenshots/14306992/media/0be875c520dcf6b4b7176738ec346334.png?compress=1&resize=1000x750&vertical=top'
          //     : `https://image.tmdb.org/t/p/original${data.poster_path}`
          // }
          // alt="poster"
          alt={name}
          className={styles.poster}
          // loading="lazy"
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.season}>{data.name}</p>
        {/* <div className={styles.overview}>{truncate(data.overview, 1200)}</div> */}
        {renderOverview()}
        <ToggleBtn
          condition={data.overview.length > 400}
          isToggleOpen={isToggleOpen}
          setIsToggleOpen={setIsToggleOpen}
        />
      </div>
    </div>
  );
};

export default DetailSeasonsMain;
