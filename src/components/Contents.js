import React, { useState } from 'react';
import Card from './Card';
import styles from './Contents.module.css';

const Contents = ({ group, cname, data, isFetching, isError }) => {
  return (
    <div className={styles.contents}>
      <div className={styles.wrapper}>
        <Card
          group={group}
          cname={cname}
          data={data}
          isFetching={isFetching}
          isError={isError}
        />
      </div>
    </div>
  );
};

export default Contents;
