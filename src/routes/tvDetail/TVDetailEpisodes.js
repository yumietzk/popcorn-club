import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingIndicator from '../../helpers/LoadingIndicator';
import EpisodeContent from '../../components/tvdetail/EpisodeContent';
import styles from './TVDetailEpisodes.module.css';

const TVDetailEpisodes = ({ name, seasons, isFetching, isError }) => {
  const { episodenum } = useParams();

  if (isFetching || !seasons) {
    return <LoadingIndicator />;
  }

  if (isError?.status) {
    return <p className={styles.error}>{isError.errorMessage}</p>;
  }

  if (seasons) {
    if (!seasons.episodes || seasons.episodes.length === 0) {
      return null;
    } else {
      const data = seasons.episodes.find(
        (item) => item.episode_number === +episodenum
      );

      return <EpisodeContent name={name} data={data} />;
    }
  }
};

export default TVDetailEpisodes;
