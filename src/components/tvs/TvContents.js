import React from 'react';
import TvCard from './TvCard';
import styles from './TvContents.module.css';

const TvContents = (props) => {
  return (
    <div className={styles.contents}>
      {/* Can create moviecard component */}
      <ul className={styles.wrapper}>
        <TvCard type={props.type} cname={props.cname} />
      </ul>
    </div>
  );
};

export default TvContents;
