import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { searchMovies, searchTVShows } from '../actions';
import AltTitle from '../components/AltTitle';
import LibraryContent from '../components/LibraryContent';

const Search = ({
  setIsDetail,
  searchMovies,
  searchTVShows,
  movies,
  tvshows,
  isFetching,
  isFetchingTV,
  isError,
}) => {
  const [selectedLibrary, setSelectedLibrary] = useState('movies');
  const [data, setData] = useState({});
  const { term } = useParams();

  useEffect(() => {
    setIsDetail(true);

    return () => {
      setIsDetail(false);
    };
  }, []);

  useEffect(() => {
    setData({ ...data, movies: movies, tvshows: tvshows });
  }, [movies, tvshows]);

  useEffect(() => {
    searchMovies(term);
    searchTVShows(term);
    setSelectedLibrary('movies');
  }, [term]);

  return (
    <React.Fragment>
      <AltTitle
        title="Search"
        term={term}
        search={true}
        selectedLibrary={selectedLibrary}
        setSelectedLibrary={setSelectedLibrary}
      />
      <LibraryContent
        selectedLibrary={selectedLibrary}
        type="search"
        data={data}
        isFetching={isFetching}
        isFetchingTV={isFetchingTV}
        isError={isError}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies.search,
    tvshows: state.shows.search,
    isFetching: state.movies.isFetching,
    isFetchingTV: state.shows.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  searchMovies,
  searchTVShows,
})(Search);
