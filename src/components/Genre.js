import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { ActivityIndicator } from 'antd-mobile';
import {
  LazyLoadImage,
  trackWindowScroll,
} from 'react-lazy-load-image-component';
import * as IoIcons from 'react-icons/io';
import styles from './Genre.module.css';

const Genre = ({ title, type, data, isFetching, isError, scrollPosition }) => {
  const [curPage, setCurPage] = useState(1);
  const [allPage, setAllPage] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!data) return;

    const getAllPage = () => {
      const rest = data.length % 20;

      if (rest === 0) {
        setAllPage(data.length / 20);
      } else {
        setAllPage(Math.floor(data.length / 20) + 1);
      }
    };

    getAllPage();
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const getResultsPerPage = () => {
      const start = (curPage - 1) * 20;
      const end = curPage * 20;

      setResults(data.slice(start, end));
    };

    getResultsPerPage();
  }, [curPage, data]);

  const onPagePrevious = () => {
    if (curPage === 1) return;

    setCurPage(curPage - 1);
  };

  const onPageNext = () => {
    if (curPage === allPage) return;

    setCurPage(curPage + 1);
  };

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const renderShows = () => {
    // if (!results) {
    //   return (
    //     <div className={styles.loading}>
    //       <ActivityIndicator size="large" />
    //     </div>
    //   );
    // }

    if (isFetching || !results) {
      return <div>Now loading...</div>;
    }

    if (isError?.status) {
      return <p>{isError.error}</p>;
    }

    return results.map((show) => {
      return (
        <Link
          to={
            title === 'Movies' ? `/detail/${show.id}` : `/detailtv/${show.id}`
          }
          key={show.id}
          className={styles.content}
        >
          <div className={styles.img}>
            <LazyLoadImage
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
              alt={
                show.original_title ? show.original_title : show.original_name
              }
              scrollPosition={scrollPosition}
            />
          </div>
          <div className={styles.description}>
            <p className={styles.movietitle}>
              {show.original_title ? show.original_title : show.original_name}
            </p>
            <p className={styles.date}>
              {show.release_date
                ? calcYear(show.release_date)
                : calcYear(show.first_air_date)}
            </p>
          </div>
        </Link>
      );
    });
  };

  const renderPaginationPrev = () => {
    return (
      <button className={styles['pagination-prev']} onClick={onPagePrevious}>
        <IoIcons.IoIosArrowRoundBack className={styles['prev-icon']} />
        <p>Page {curPage - 1}</p>
      </button>
    );
  };

  const renderPaginationNext = () => {
    return (
      <button className={styles['pagination-next']} onClick={onPageNext}>
        <p>Page {curPage + 1}</p>
        <IoIcons.IoIosArrowRoundForward className={styles['next-icon']} />
      </button>
    );
  };

  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <span>{title} &gt; </span>
        <h3 className={styles.genre}>{type}</h3>
      </div>
      <div className={styles.container}>{renderShows()}</div>
      {curPage > 1 ? renderPaginationPrev() : null}
      {curPage < allPage ? renderPaginationNext() : null}
    </div>
  );
};

export default trackWindowScroll(Genre);
