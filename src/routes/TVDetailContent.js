import React from 'react';
import DetailMain from './detail/DetailMain';
import Seasons from './detail/Seasons';
import Cast from './detail/Cast';
import Related from './detail/Related';
import styles from './TVDetailContent.module.css';

const TVDetailContent = ({
  setSelectedItem,
  setIsAscend,
  detail,
  casts,
  related,
  isFetching,
  isError,
}) => {
  return (
    <div className={styles.detail}>
      <DetailMain
        setSelectedItem={setSelectedItem}
        setIsAscend={setIsAscend}
        group="tvshows"
        data={detail}
        isFetching={isFetching}
        isError={isError}
      />
      <Seasons data={detail} isFetching={isFetching} isError={isError} />
      <Cast data={casts} isFetching={isFetching} isError={isError} />
      <Related
        group="tvshows"
        data={related}
        isFetching={isFetching}
        isError={isError}
      />
    </div>
  );
};

export default TVDetailContent;
