import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import {
  LazyLoadImage,
  trackWindowScroll,
} from 'react-lazy-load-image-component';
import * as IoIcons from 'react-icons/io';
import styles from './Genre.module.css';

const Genre = (props) => {
  const [curPage, setCurPage] = useState(1);
  const [allPage, setAllPage] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!props.shows) return;

    const getAllPage = () => {
      const rest = props.shows.length % 20;

      if (rest === 0) {
        setAllPage(props.shows.length / 20);
      } else {
        setAllPage(Math.floor(props.shows.length / 20) + 1);
      }
    };

    getAllPage();
  }, [props.shows]);

  useEffect(() => {
    if (!props.shows) return;

    const getResultsPerPage = () => {
      const start = (curPage - 1) * 20;
      const end = curPage * 20;

      setResults(props.shows.slice(start, end));
    };

    getResultsPerPage();
  }, [curPage, props.shows]);

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
    if (!results) {
      return (
        <ReactLoading type="spin" color="f7f7f7" height="20%" width="20%" />
      );
    }

    return results.map((show) => {
      return (
        <Link
          to={
            props.title === 'Movies'
              ? `/detail/${show.id}`
              : `/detailtv/${show.id}`
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
              scrollPosition={props.scrollPosition}
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
        <span>{props.title} &gt; </span>
        <h3 className={styles.genre}>{props.type}</h3>
      </div>
      <div className={styles.container}>{renderShows()}</div>
      {curPage > 1 ? renderPaginationPrev() : null}
      {curPage < allPage ? renderPaginationNext() : null}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { shows: state.genre[ownProps.genre] };
};

export default connect(mapStateToProps)(trackWindowScroll(Genre));
