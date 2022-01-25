import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as RiIcons from 'react-icons/ri';
import { truncate } from '../../../helpers/Truncate';
import Card from '../CardRow/Card';
import styles from './CardGrid.module.css';

const CardGrid = ({ group, order, isAscend, data, isFetching, isError }) => {
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    setLoaded(true);
  };

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const renderShows = () => {
    if (isFetching || !data) {
      return <div>Now loading...</div>;
    }

    if (isError?.status) {
      return <p>{isError.errorMessage}</p>;
    }

    if (data && data.length === 0) {
      return <p>No data.</p>;
    }

    const sortedData = data?.sort((a, b) => {
      let targetDataA;
      let targetDataB;

      if (order === 'Title') {
        targetDataA = a.original_title ? a.original_title : a.original_name;
        targetDataB = b.original_title ? b.original_title : b.original_name;
      }

      if (order === 'Release Date') {
        targetDataA = a.release_date ? a.release_date : a.first_air_date;
        targetDataB = b.release_date ? b.release_date : b.first_air_date;
      }

      if (order === 'Rating') {
        targetDataA = a.vote_average;
        targetDataB = b.vote_average;
      }

      if (isAscend) {
        return targetDataA < targetDataB ? -1 : 1;
      } else {
        return targetDataA < targetDataB ? 1 : -1;
      }
    });

    return sortedData.map((item, i) => {
      return (
        <div className={styles.grid} key={i}>
          <Card group={group} data={item} cname="grid" />
        </div>
      );
    });
  };

  return renderShows();
};

export default CardGrid;
