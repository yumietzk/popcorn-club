import React, { useEffect, useRef } from 'react';
import Card from './Card';
import styles from './CardGrid.module.css';

const CardGrid = ({ group, order, count, isAscend, data }) => {
  const ref = useRef();

  useEffect(() => {
    if (ref?.current) {
      ref.current.scrollTop = 0;
      ref.current.scrollLeft = 0;
    }
  }, [order, count, isAscend]);

  let targetData;
  if (
    group === 'tvseasons' ||
    group === 'search' ||
    group === 'searchTV' ||
    group === 'favorite' ||
    group === 'favoriteTV'
  ) {
    targetData = data;
  } else {
    targetData = data.sort((a, b) => {
      let targetDataA;
      let targetDataB;

      if (order === 'Title') {
        targetDataA = a.original_title ? a.original_title : a.original_name;
        targetDataB = b.original_title ? b.original_title : b.original_name;

        if (isAscend?.title) {
          return targetDataA < targetDataB ? -1 : 1;
        } else {
          return targetDataA < targetDataB ? 1 : -1;
        }
      }

      if (order === 'Release Date') {
        targetDataA = a.release_date ? a.release_date : a.first_air_date;
        targetDataB = b.release_date ? b.release_date : b.first_air_date;

        if (isAscend?.releaseDate) {
          return targetDataA < targetDataB ? -1 : 1;
        } else {
          return targetDataA < targetDataB ? 1 : -1;
        }
      }

      if (order === 'Rating') {
        targetDataA = a.vote_average;
        targetDataB = b.vote_average;

        if (isAscend?.rating) {
          return targetDataA < targetDataB ? -1 : 1;
        } else {
          return targetDataA < targetDataB ? 1 : -1;
        }
      }
    });
  }

  const renderShows = () => {
    return (
      <div
        className={`${group === 'tvseasons' ? styles.seasons : styles.grids}`}
        ref={ref}
      >
        {targetData?.map((item, i) => {
          return (
            <div key={i} className={styles.grid}>
              <Card group={group} data={item} cname="grid" />
            </div>
          );
        })}
      </div>
    );
  };

  return renderShows();
};

export default CardGrid;
