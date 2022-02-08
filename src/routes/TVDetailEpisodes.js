import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingIndicator from '../helpers/LoadingIndicator';
import EpisodeContent from './EpisodeContent';

const TVDetailEpisodes = ({ name, seasons, isFetching, isError }) => {
  const { episodenum } = useParams();

  if (isFetching || !seasons) {
    return <LoadingIndicator />;
  }

  if (isError?.status) {
    return <p>{isError.errorMessage}</p>;
  }

  if (seasons) {
    if (!seasons.episodes || seasons.episodes.length === 0) {
      return <p>No data.</p>;
    } else {
      const data = seasons.episodes.find(
        (item) => item.episode_number === +episodenum
      );

      return <EpisodeContent name={name} data={data} />;
    }
  }
};

export default TVDetailEpisodes;
