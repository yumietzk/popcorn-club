import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchPersonInfo,
  fetchPersonMovies,
  fetchPersonTVShows,
} from '../actions';
import Title from '../components/Title';
import PersonMain from '../components/person/PersonMain';
import Credits from '../components/person/Credits';
import LoadingIndicator from '../helpers/LoadingIndicator';
import styles from './Person.module.css';

const Person = ({
  setDetailBackground,
  setIsDetail,
  width,
  fetchPersonInfo,
  fetchPersonMovies,
  fetchPersonTVShows,
  info,
  movies,
  tvshows,
  isFetching,
  isError,
}) => {
  const { id } = useParams();

  useEffect(() => {
    setIsDetail(true);

    return () => {
      setIsDetail(false);
    };
  }, []);

  useEffect(() => {
    fetchPersonInfo(id);
    fetchPersonMovies(id);
    fetchPersonTVShows(id);
  }, [id]);

  useEffect(() => {
    setDetailBackground({
      isON: true,
      url: info?.profile_path,
    });

    return () => {
      setDetailBackground({
        isON: false,
        url: '',
      });
    };
  }, [info]);

  const renderContent = () => {
    if (isFetching || !info || !movies || !tvshows) {
      return <LoadingIndicator />;
    }

    if (isError?.status) {
      return <p className={styles.error}>{isError.errorMessage}</p>;
    }

    if (info && movies && tvshows) {
      return (
        <React.Fragment>
          <PersonMain person={info} width={width} />
          <h4 className={styles['person-credits']}>Known For</h4>
          <Credits
            group="movies"
            data={movies}
            style={{ marginBottom: '6rem' }}
          />
          <Credits group="tvshows" data={tvshows} />
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <Title
        type="person"
        person={info}
        isFetching={isFetching}
        isError={isError}
      />
      <div className={`${styles.person} ${isFetching ? styles.loading : null}`}>
        {renderContent()}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    info: state.person.info,
    movies: state.person.movies,
    tvshows: state.person.tvshows,
    isFetching: state.person.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchPersonInfo,
  fetchPersonMovies,
  fetchPersonTVShows,
})(Person);
