import React from 'react';
import Card from './Card';
import styles from './Contents.module.css';

const Contents = (props) => {
  return (
    <div className={styles.contents}>
      <div className={styles.wrapper}>
        <Card group={props.group} type={props.type} cname={props.cname} />
      </div>
    </div>
  );
};

export default Contents;
