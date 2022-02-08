import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllMovies, fetchAllTVShows } from '../actions';
import CardGrid from '../components/UI/CardGrid/CardGrid';
import LoadingIndicator from '../helpers/LoadingIndicator';

const All = ({
  selectedItem,
  isAscend,
  type,
  group,
  fetchAllMovies,
  fetchAllTVShows,
  movies,
  tvshows,
  isFetching,
  isFetchingTV,
  isError,
}) => {
  const { order, count } = selectedItem;

  useEffect(() => {
    if (type === 'movies') {
      fetchAllMovies(count);
    } else if (type === 'tvshows') {
      fetchAllTVShows(count);
    }
  }, [count]);

  const renderContent = () => {
    if (type === 'movies') {
      if (isFetching || !movies) {
        return <LoadingIndicator />;
      }
    } else if (type === 'tvshows') {
      if (isFetchingTV || !tvshows) {
        return <LoadingIndicator />;
      }
    }

    if (isError?.status) {
      return <p>{isError.errorMessage}</p>;
    }

    if (type === 'movies') {
      if (movies) {
        if (movies.length === 0) {
          return <p>No data.</p>;
        } else {
          return (
            <CardGrid
              group={group}
              order={order}
              isAscend={isAscend}
              data={movies}
            />
          );
        }
      }
    } else if (type === 'tvshows') {
      if (tvshows) {
        if (tvshows.length === 0) {
          return <p>No data.</p>;
        } else {
          return (
            <CardGrid
              group={group}
              order={order}
              isAscend={isAscend}
              data={tvshows}
            />
          );
        }
      }
    }

    // if (`${type === 'movies' ? movies : tvshows}`) {
    //   return (
    //     <CardGrid
    //       group={group}
    //       order={order}
    //       isAscend={isAscend}
    //       data={type === 'movies' ? movies : tvshows}
    //     />
    //   );
    // if (data.length === 0) {
    //   return <p>No data.</p>;
    // } else {
    //   return (
    //     <div
    //       className={`${
    //         group === 'tvseasons' ? styles.seasons : styles.grids
    //       }`}
    //     >
    //       {targetData?.map((item, i) => {
    //         return (
    //           <div key={i} className={styles.grid}>
    //             <Card group={group} data={item} cname="grid" />
    //           </div>
    //         );
    //       })}
    //     </div>
    //   );
    // }
    // }
  };

  return renderContent();

  // return (
  //   <CardGrid
  //     group={group}
  //     order={order}
  //     isAscend={isAscend}
  //     data={type === 'movies' ? movies : tvshows}
  //     isFetching={type === 'movies' ? isFetching : isFetchingTV}
  //     isError={isError}
  //   />
  // );
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies.all, // 60
    tvshows: state.shows.all,
    isFetching: state.movies.isFetching,
    isFetchingTV: state.shows.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchAllMovies,
  fetchAllTVShows,
})(All);
