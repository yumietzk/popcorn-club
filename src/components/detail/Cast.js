import React from 'react';
// import { connect } from 'react-redux';
import styles from './Cast.module.css';

const Cast = ({ data, isFetching, isError }) => {
  // const cast = props.type === 'tv' ? props.tvcast : props.moviecast;

  const renderCast = () => {
    // if (!cast) {
    //   return <div>Loading...</div>;
    // }

    if (isFetching || !data) {
      return <div>Now loading...</div>;
    }

    if (isError?.status) {
      return <p>{isError.error}</p>;
    }

    if (data.length === 0) {
      return <p>No cast registered.</p>;
    }

    return data.map((person) => {
      return (
        <li key={person.id} className={styles.list}>
          <div className={styles.fig}>
            <img
              src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
              alt={person.original_name}
              className={styles.img}
            />
          </div>
          <p className={styles.name}>{person.original_name}</p>
        </li>
      );
    });
  };

  return (
    <React.Fragment>
      <p className={styles.title}>Cast</p>
      <ul className={styles.wrap}>{renderCast()}</ul>
    </React.Fragment>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     moviecast: state.detail.casts,
//     tvcast: state.detail.tvcasts,
//   };
// };

export default Cast;
