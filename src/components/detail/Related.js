import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Related.module.css';

const Related = ({ type, data, isFetching, isError }) => {
  const toPage = type === 'movie' ? 'detail' : 'detailtv';

  const renderRelated = () => {
    if (isFetching || !data) {
      return <div>Now loading...</div>;
    }

    if (isError?.status) {
      return <p>{isError.errorMessage}</p>;
    }

    if (data && data.length === 0) {
      return <p>No similar movies.</p>;
    }

    if (data && data.length !== 0) {
      return data.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/${toPage}/${item.id}`}
            className={styles.item}
          >
            <div className={styles.fig}>
              <img
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt={
                  item.original_title ? item.original_title : item.original_name
                }
                className={styles.img}
              />
            </div>
            <p className={styles.name}>
              {item.original_title ? item.original_title : item.original_name}
            </p>
          </Link>
        );
      });
    }
  };

  return (
    <React.Fragment>
      <p className={styles.title}>Related</p>
      <div className={styles.related}>{renderRelated()}</div>
    </React.Fragment>
  );
};

export default Related;
