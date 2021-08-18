import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Related.module.css';

const Related = (props) => {
  const related = props.type === 'tv' ? props.tvrelated : props.movierelated;
  const toPage = props.type === 'tv' ? 'detailtv' : 'detail';

  const renderRelated = () => {
    console.log();

    if (!related) {
      return <div>Loading..</div>;
    }

    return related.map((item) => {
      return (
        <Link
          key={item.id}
          to={`/${toPage}/${item.id}`}
          className={styles.item}
        >
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
        </Link>
      );
    });
  };

  return (
    <React.Fragment>
      <p className={styles.title}>Related</p>
      <div className={styles.related}>{renderRelated()}</div>
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
