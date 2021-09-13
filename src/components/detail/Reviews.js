import React from 'react';
import * as IoIcons from 'react-icons/io';
import styles from './Reviews.module.css';

const Reviews = ({ data, isFetching, isError }) => {
  const truncate = (str, n) => {
    return str?.length > n ? `${str.substr(0, n - 1)}...` : str;
  };

  const renderReviews = () => {
    if (isFetching || !data) {
      return <div>Now loading...</div>;
    }

    if (isError?.status) {
      return <p>{isError.errorMessage}</p>;
    }

    if (data && data.length === 0) {
      return <p>No reviews.</p>;
    }

    if (data && data.length !== 0) {
      return data.map((review) => {
        return (
          <li className={styles.item} key={review.id}>
            <div className={styles.user}>
              <IoIcons.IoIosPerson className={styles['user-icon']} />
              <p className={styles['user-name']}>{review.author}</p>
            </div>
            <p
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: truncate(review.content, 350),
              }}
            ></p>
          </li>
        );
      });
    }
  };

  return (
    <React.Fragment>
      <p className={styles.title}>Reviews</p>
      <ul className={styles.reviews}>{renderReviews()}</ul>
    </React.Fragment>
  );
};

export default Reviews;
