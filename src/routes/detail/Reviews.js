import React from 'react';
import * as IoIcons from 'react-icons/io';
import { truncate } from '../../helpers/Truncate';
import styles from './Reviews.module.css';

const Reviews = ({ data, isFetching, isError }) => {
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

    return data?.map((review) => {
      return (
        <li className={styles.card} key={review.id}>
          <div className={styles.user}>
            <IoIcons.IoIosPerson className={styles['user-icon']} />
            <p className={styles['user-name']}>{review.author}</p>
          </div>
          <p
            className={styles.review}
            dangerouslySetInnerHTML={{
              __html: truncate(review.content, 250),
            }}
          ></p>
        </li>
      );
    });
  };

  return (
    <div className={styles.reviews}>
      <h4 className={styles.title}>Reviews</h4>
      <div className={styles.content}>
        <ul className={styles.cards}>{renderReviews()}</ul>
      </div>
    </div>
  );
};

export default Reviews;
