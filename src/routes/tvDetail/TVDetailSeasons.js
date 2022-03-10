import React from 'react';
import DetailSeasonsMain from '../../components/tvdetail/DetailSeasonsMain';
import CardGrid from '../../components/UI/CardUI/CardGrid';
import LoadingIndicator from '../../helpers/LoadingIndicator';
import styles from './TVDetailSeasons.module.css';

const TVDetailSeasons = ({ name, width, seasons, isFetching, isError }) => {
  if (isFetching || !seasons) {
    return <LoadingIndicator />;
  }

  if (isError?.status) {
    return <p className={styles.error}>{isError.errorMessage}</p>;
  }

  const renderEpisodes = () => {
    if (!seasons.episodes || seasons.episodes.length === 0) {
      return <p className={styles['no-episodes']}>Sorry, no episodes.</p>;
    }

    return <CardGrid group="tvseasons" data={seasons.episodes} />;
  };

  if (seasons) {
    return (
      <div className={styles.seasons}>
        <DetailSeasonsMain name={name} width={width} data={seasons} />
        {seasons.episodes && seasons.episodes.length !== 0 && (
          <h4 className={styles.episodes}>
            {seasons.episodes?.length} Episodes
          </h4>
        )}
        {renderEpisodes()}
      </div>
    );
  }
};

export default TVDetailSeasons;
