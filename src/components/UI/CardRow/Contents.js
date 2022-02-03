import React, { useState } from 'react';
import Card from './Card';
import LoadingIcon from '../../../helpers/LoadingIcon';
import styles from './Contents.module.css';

const Contents = ({ group, data, isFetching, isError }) => {
  const renderCards = () => {
    if (isFetching || !data) {
      return <LoadingIcon />;
    }

    if (isError?.status) {
      return <p>{isError.errorMessage}</p>;
    }

    if (data && data.length === 0) {
      return <p>No data.</p>;
    }

    if (group === 'tvdetail') {
      return data?.seasons?.map((item, i) => {
        return (
          <li className={styles.card} key={i}>
            <Card group={group} data={item} />
          </li>
        );
      });
    } else {
      return data?.map((item, i) => {
        return (
          <li className={styles.card} key={i}>
            <Card group={group} data={item} />
          </li>
        );
      });
    }
  };

  return (
    <div className={styles.contents}>
      <ul
        className={`${styles.cards} ${
          isFetching || !data ? styles.loading : null
        }`}
      >
        {renderCards()}
      </ul>
    </div>
  );
};

export default Contents;
