import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useObserver from '../../hooks/useObserver';
import styles from './CastCard.module.css';

const CastCard = ({ data }) => {
  const ref = useRef();
  const [curElement, setSrc] = useObserver(ref);

  const targetData = !data.profile_path
    ? 'https://cdn.dribbble.com/users/1090020/screenshots/15509551/media/fe29a709b7a89315c1673d143c23c2c1.png?compress=1&resize=1200x900&vertical=top'
    : `https://image.tmdb.org/t/p/original${data.profile_path}`;

  useEffect(() => {
    setSrc(targetData);
  }, [curElement]);

  return (
    <li key={data.id} className={styles.card}>
      <div className={styles.img} ref={ref}>
        <img
          // src={
          //   !person.profile_path
          //     ? 'https://cdn.dribbble.com/users/1090020/screenshots/15509551/media/fe29a709b7a89315c1673d143c23c2c1.png?compress=1&resize=1200x900&vertical=top'
          //     : `https://image.tmdb.org/t/p/original${person.profile_path}`
          // }
          alt={data.original_name}
          className={styles.poster}
          // loading="lazy"
        />
        <Link to={`../../person/${data.id}`} className={styles.cover}></Link>
      </div>
      <div className={styles.name}>
        <Link to={`../../person/${data.id}`} className={styles['name-text']}>
          {data.original_name}
        </Link>
      </div>
    </li>
  );
};

export default CastCard;
