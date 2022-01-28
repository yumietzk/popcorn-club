import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchPersonInfo,
  fetchPersonMovies,
  fetchPersonTVShows,
} from '../actions';
import Title from './Title';
import PersonMain from './PersonMain';
import Credits from './Credits';
import styles from './Person.module.css';

const Person = ({
  fetchPersonInfo,
  fetchPersonMovies,
  fetchPersonTVShows,
  info,
  movies,
  tvshows,
  isFetching,
  isError,
}) => {
  // DetailみたいにPersonページに来たときに背景を変えたい

  const { id } = useParams();

  useEffect(() => {
    fetchPersonInfo(id);
    fetchPersonMovies(id);
    fetchPersonTVShows(id);
  }, [id]);

  return (
    <React.Fragment>
      <Title
        type="person"
        person={info}
        isFetching={isFetching}
        isError={isError}
      />
      <div className={styles.person}>
        <PersonMain person={info} isFetching={isFetching} isError={isError} />
        <h4 className={styles['person-credits']}>Known For</h4>
        {/* ここはRowにしたけど、Gridの方がいい？あとで考える */}
        <Credits
          group="movies"
          data={movies}
          isFetching={isFetching}
          isError={isError}
          style={{ marginBottom: '6rem' }}
        />
        <Credits
          group="tvshows"
          data={tvshows}
          isFetching={isFetching}
          isError={isError}
        />
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
