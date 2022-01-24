import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as RiIcons from 'react-icons/ri';
import { truncate } from '../../../helpers/Truncate';
import styles from './Card.module.css';

const Card = ({ group, data }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, []);

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const onLoad = () => {
    setLoaded(true);
  };

  // const truncate = (str, n) => {
  //   return str?.length > n ? `${str.substr(0, n - 1)}...` : str;
  // };

  return (
    <React.Fragment>
      {/* <Link
        to={group === 'Movie' ? `/detail/${data.id}` : `/detailtv/${data.id}`}
        className={styles['card-menu']}
      > */}
      <div className={styles.img}>
        <img
          className={`${styles.poster} ${loaded && styles['poster-open']}`}
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          alt={data.original_title ? data.original_title : data.original_name}
          onLoad={onLoad}
        />
        <div className={styles.cover}>
          <button className={styles['cover-btn']}>
            <RiIcons.RiArrowRightSFill className={styles['cover-icon']} />
          </button>
        </div>
      </div>
      <Link
        to={group === 'Movie' ? `/detail/${data.id}` : `/detailtv/${data.id}`}
        className={styles.title}
      >
        {data.original_title
          ? truncate(data.original_title, 24)
          : truncate(data.original_name, 24)}
      </Link>
      <p className={styles.date}>
        {calcYear(data.release_date ? data.release_date : data.first_air_date)}
      </p>
      {/* </Link> */}
    </React.Fragment>
  );

  // const renderItems = () => {
  //   if (isFetching || !data) {
  //     return <div>Now loading...</div>;
  //   }

  //   if (isError?.status) {
  //     return <p>{isError.errorMessage}</p>;
  //   }

  //   if (data && data.length === 0) {
  //     return <p>No data.</p>;
  //   }

  //   return data?.map((show) => {
  //     return (
  //       <Link
  //         to={group === 'Movie' ? `/detail/${show.id}` : `/detailtv/${show.id}`}
  //         key={show.id}
  //         className={styles.card}
  //       >
  //         <div className={styles.img}>
  //           <img
  //             className={`${styles.poster} ${loaded && styles['poster-open']}`}
  //             src={
  //               cname
  //                 ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
  //                 : `https://image.tmdb.org/t/p/original${show.poster_path}`
  //             }
  //             alt={
  //               show.original_title ? show.original_title : show.original_name
  //             }
  //             onLoad={onLoad}
  //           />
  //         </div>
  //         {cname ? (
  //           ''
  //         ) : (
  //           <p className={styles.title}>
  //             {show.original_title ? show.original_title : show.original_name}
  //           </p>
  //         )}
  //         {cname ? (
  //           ''
  //         ) : (
  //           <p className={styles.date}>
  //             {calcYear(
  //               show.release_date ? show.release_date : show.first_air_date
  //             )}
  //           </p>
  //         )}
  //       </Link>
  //     );
  //   });
  // };

  // return <React.Fragment>{renderItems()}</React.Fragment>;
};

export default Card;
