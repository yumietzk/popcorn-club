import React, { useState } from 'react';
import Card from './Card';
import styles from './Contents.module.css';

const Contents = ({ group, cname, data, isFetching, isError }) => {
  const renderCards = () => {
    if (isFetching || !data) {
      return <div>Now loading...</div>;
    }

    if (isError?.status) {
      return <p>{isError.errorMessage}</p>;
    }

    if (data && data.length === 0) {
      return <p>No data.</p>;
    }

    return data?.map((show, i) => {
      return (
        <li className={styles.card} key={i}>
          <Card group={group} cname={cname} data={show} />
        </li>
      );
    });
  };

  return (
    <div className={styles.contents}>
      <ul className={styles.cards}>{renderCards()}</ul>
      {/* <Card
        group={group}
        cname={cname}
        data={data}
        isFetching={isFetching}
        isError={isError}
      /> */}
    </div>
  );
};

export default Contents;
