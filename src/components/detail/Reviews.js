import React from 'react';
import { connect } from 'react-redux';
import * as IoIcons from 'react-icons/io';
import styles from './Reviews.module.css';

const Reviews = (props) => {
  const truncate = (str, n) => {
    return str?.length > n ? `${str.substr(0, n - 1)}...` : str;
  };

  const renderReviews = () => {
    if (!props.reviews) {
      return <div>Loading..</div>;
    }

    return props.reviews.map((review) => {
      return (
        <li className={styles.item} key={review.id}>
          <div className={styles.user}>
            <IoIcons.IoIosPerson className={styles['user-icon']} />
            <p className={styles['user-name']}>{review.author}</p>
          </div>
          <p className={styles.content}>{truncate(review.content, 200)}</p>
        </li>
      );
    });
  };

  return (
    <React.Fragment>
      <p className={styles.title}>Reviews</p>
      <ul className={styles.reviews}>{renderReviews()}</ul>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    reviews: state.detail.reviews,
  };
};

export default connect(mapStateToProps)(Reviews);
