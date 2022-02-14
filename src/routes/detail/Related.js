import React from 'react';
import Contents from '../../components/UI/CardRow/Contents';
import styles from './Related.module.css';

const Related = ({ group, data, width }) => {
  return (
    <div className={styles.related}>
      <h4 className={styles.title}>
        {group === 'tvshows' ? 'Related Shows' : 'Related Movies'}
      </h4>
      <Contents group={group} data={data} width={width} />
    </div>
  );
};

export default Related;
