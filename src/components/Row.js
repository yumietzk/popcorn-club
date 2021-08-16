import React from 'react';
import Category from './Category';
import Contents from './Contents';
import styles from './Row.module.css';

const Row = (props) => {
  return (
    <div className={`${styles.container} ${styles[props.cname]}`}>
      <Category category={props.category} />
      <Contents group={props.group} type={props.type} cname={props.cname} />
    </div>
  );
};

export default Row;
