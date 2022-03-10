import React from 'react';
import Card from './Card';
import styles from './Contents.module.css';

const Contents = ({ width, group, data }) => {
  const renderCards = () => {
    if (group === 'tvdetail') {
      if (!data.seasons || data.seasons.length === 0) {
        return <p className={styles['no-data']}>Sorry, no data.</p>;
      } else {
        return data.seasons?.map((item, i) => {
          return (
            <li className={styles.card} key={i}>
              <Card width={width} group={group} data={item} />
            </li>
          );
        });
      }
    } else {
      if (data.length === 0) {
        return <p className={styles['no-data']}>Sorry, no data.</p>;
      } else {
        if (group === 'tvdetail') {
          return data.seasons?.map((item, i) => {
            return (
              <li className={styles.card} key={i}>
                <Card width={width} group={group} data={item} />
              </li>
            );
          });
        } else {
          return data.map((item, i) => {
            return (
              <li className={styles.card} key={i}>
                <Card width={width} group={group} data={item} />
              </li>
            );
          });
        }
      }
    }
  };

  return (
    <div className={styles.contents}>
      <ul className={styles.cards}>{renderCards()}</ul>
    </div>
  );
};

export default Contents;
