import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { setImage } from '../../helpers/SetImage';
import { truncate } from '../../helpers/Truncate';
import styles from './CastCard.module.css';

const CastCard = ({ data, width }) => {
  const ref = useRef();
  const [curElement, setElement] = useState();

  const targetData = !data.profile_path
    ? 'https://cdn.dribbble.com/users/1090020/screenshots/15509551/media/fe29a709b7a89315c1673d143c23c2c1.png?compress=1&resize=1200x900&vertical=top'
    : `https://image.tmdb.org/t/p/original${data.profile_path}`;

  useEffect(() => {
    setElement(ref?.current?.childNodes[0]);
  }, [ref]);

  useEffect(() => {
    setImage(curElement, targetData);
  }, [curElement, data]);

  return (
    <React.Fragment>
      <div className={styles.img} ref={ref}>
        <img alt={data.original_name} className={styles.poster} />
        <Link to={`../../person/${data.id}`} className={styles.cover}></Link>
      </div>
      <div className={styles.name}>
        <Link to={`../../person/${data.id}`} className={styles['name-text']}>
          {truncate(data.original_name, `${width <= 450 ? 13 : 27}`)}
        </Link>
      </div>
    </React.Fragment>
  );
};

export default CastCard;
