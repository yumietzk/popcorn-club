import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as IoIcons from 'react-icons/io';
import { setImage } from '../../../helpers/SetImage';
import { truncate } from '../../../helpers/Truncate';
import styles from './Card.module.css';

const Card = ({ width, group, data, cname }) => {
  const ref = useRef();
  const [curElement, setElement] = useState();

  const targetData =
    !data.still_path && !data.poster_path && group === 'tvdetail'
      ? 'https://cdn.dribbble.com/users/2549306/screenshots/14306992/media/0be875c520dcf6b4b7176738ec346334.png?compress=1&resize=1000x750&vertical=top'
      : !data.still_path && !data.poster_path && group === 'tvseasons'
      ? 'https://cdn.dribbble.com/users/2549306/screenshots/14306992/media/1568f08221d5a887546e2d386179ff4b.png?compress=1&resize=1000x750&vertical=top'
      : !data.still_path && !data.poster_path
      ? 'https://cdn.dribbble.com/users/2549306/screenshots/14306992/media/f7c46c1ebbd7195bed3b6aa27228b1fd.png?compress=1&resize=1200x900&vertical=top'
      : `https://image.tmdb.org/t/p/original${
          group === 'tvseasons' ? data.still_path : data.poster_path
        }`;

  useEffect(() => {
    setElement(ref?.current?.childNodes[0]);
  }, [ref]);

  useEffect(() => {
    setImage(curElement, targetData);
  }, [curElement, data]);

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  return (
    <React.Fragment>
      <div
        className={`${styles.img} ${cname === 'grid' && styles['grid-img']} ${
          group === 'tvseasons' && styles['seasons-img']
        }`}
        ref={ref}
      >
        <img
          className={`${styles.poster} ${
            cname === 'grid' && styles['grid-poster']
          }  `}
          alt={
            group === 'tvseasons'
              ? data.name
              : data.original_title
              ? data.original_title
              : data.original_name
          }
        />
        <div className={styles.cover}>
          <Link
            to={
              group === 'tvdetail'
                ? `season/${data.season_number}`
                : group === 'tvseasons'
                ? `episode/${data.episode_number}`
                : `../../${
                    group === 'movies' ||
                    group === 'search' ||
                    group === 'favorite'
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
                group === 'movies' || group === 'search' || group === 'favorite'
                  ? 'detail'
                  : 'tvdetail'
              }/${data.id}`
        }
        className={`${styles.title} ${
          cname === 'grid' && styles['grid-title']
        }`}
        data-testid="title-content"
      >
        {group === 'tvdetail' || group === 'tvseasons'
          ? data.name
          : data.original_title
          ? truncate(data.original_title, `${width <= 450 ? 16 : 24}`)
          : truncate(data.original_name, `${width <= 450 ? 16 : 24}`)}
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
