import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTVSeasons } from '../actions';
import DetailSeasonsMain from './DetailSeasonsMain';
import CardGrid from '../components/UI/CardGrid/CardGrid';
import styles from './TVDetailSeasons.module.css';

const TVDetailSeasons = ({
  id,
  name,
  fetchTVSeasons,
  seasons,
  isFetching,
  isError,
}) => {
  const { number } = useParams();

  useEffect(() => {
    fetchTVSeasons(id, number);
  }, [number]);

  if (isFetching || !seasons) {
    return <div>Now loading...</div>;
  }

  if (isError?.status) {
    return <p>{isError.errorMessage}</p>;
  }

  return (
    <div className={styles.seasons}>
      <DetailSeasonsMain
        name={name}
        data={seasons}
        // isFetching={isFetching}
        // isError={isError}
      />
      <h4 className={styles.episodes}>{seasons.episodes?.length} Episodes</h4>
      <div className={styles.contents}>
        <CardGrid group="tvseasons" data={seasons?.episodes} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    seasons: state.detail.tvseasons,
    isFetching: state.detail.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchTVSeasons,
})(TVDetailSeasons);