import React from 'react';
import * as IoIcons from 'react-icons/io';
import { truncate } from '../../helpers/Truncate';
import styles from './Reviews.module.css';

const Reviews = ({ data, width }) => {
  const renderReviews = () => {
    if (data.length === 0) {
      return <p className={styles['no-reviews']}>Sorry, no reviews.</p>;
    } else {
      return (
        <ul className={styles.cards}>
          {data.map((review) => {
            return (
              <li className={styles.card} key={review.id}>
                <div className={styles.user}>
                  <IoIcons.IoIosPerson className={styles['user-icon']} />
                  <p className={styles['user-name']}>{review.author}</p>
                </div>
                <p
                  className={styles.review}
                  dangerouslySetInnerHTML={{
                    __html: truncate(
                      review.content,
                      `${width <= 450 ? 120 : 250}`
                    ),
                  }}
                ></p>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  return (
    <div className={styles.reviews}>
      <h4 className={styles.title}>Reviews</h4>
      <div className={styles.content}>{renderReviews()}</div>
    </div>
  );
};

export default Reviews;
