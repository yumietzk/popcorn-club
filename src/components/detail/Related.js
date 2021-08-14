import React from 'react';
import { connect } from 'react-redux';
import styles from './Related.module.css';

const Related = (props) => {
  const related = props.type === 'tv' ? props.tvrelated : props.movierelated;

  const renderRelated = () => {
    if (!related) {
      return <div>Loading..</div>;
    }

    return related.map((item) => {
      return (
        <li className={styles.item}>
          <div className={styles.fig}>
            <img
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt={
                props.type === 'tv' ? item.original_name : item.original_title
              }
              className={styles.img}
            />
          </div>
          <p className={styles.name}>
            {props.type === 'tv' ? item.original_name : item.original_title}
          </p>
        </li>
      );
    });
  };

  return (
    <React.Fragment>
      <p className={styles.title}>Related</p>
      <ul className={styles.related}>{renderRelated()}</ul>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    movierelated: state.detail.related,
    tvrelated: state.detail.tvrelated,
  };
};

export default connect(mapStateToProps)(Related);
