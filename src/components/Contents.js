import React, { useState } from 'react';
import Card from './Card';
import styles from './Contents.module.css';

const Contents = ({ group, cname, data, isFetching, isError }) => {
  return (
    <div className={styles.contents}>
      <Card
        group={group}
        cname={cname}
        data={data}
        isFetching={isFetching}
        isError={isError}
      />
    </div>
  );
};

export default Contents;
