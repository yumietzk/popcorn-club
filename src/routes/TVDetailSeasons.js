import React from 'react';
import DetailSeasonsMain from './DetailSeasonsMain';
import CardGrid from '../components/UI/CardGrid/CardGrid';
import LoadingIndicator from '../helpers/LoadingIndicator';
import styles from './TVDetailSeasons.module.css';

const TVDetailSeasons = ({ name, seasons, isFetching, isError }) => {
  if (isFetching || !seasons) {
    return <LoadingIndicator />;
  }

  if (isError?.status) {
    return <p>{isError.errorMessage}</p>;
  }

  if (seasons) {
    return (
      <div className={styles.seasons}>
        <DetailSeasonsMain name={name} data={seasons} />
        <h4 className={styles.episodes}>{seasons.episodes?.length} Episodes</h4>
        <CardGrid group="tvseasons" data={seasons?.episodes} />
      </div>
    );
  }
};

export default TVDetailSeasons;
