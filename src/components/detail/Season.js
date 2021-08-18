import React from 'react';
import { connect } from 'react-redux';
import styles from './Season.module.css';

const Season = (props) => {
  const renderSeasons = () => {
    if (!props.seasons) {
      return <div>Loading..</div>;
    }

    return props.seasons.map((season, i) => {
      return (
        <li className={styles.item} key={i}>
          <div className={styles.fig}>
            <img
              src={`https://image.tmdb.org/t/p/original${season.poster_path}`}
              alt={season.name}
              className={styles.img}
            />
          </div>
          <p className={styles.name}>{season.name}</p>
        </li>
      );
    });
  };

  return (
    <React.Fragment>
      <p className={styles.title}>Seasons</p>
      <ul className={styles.seasons}>{renderSeasons()}</ul>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    seasons: state.detail.tvdetail.seasons,
  };
};

export default connect(mapStateToProps)(Season);
