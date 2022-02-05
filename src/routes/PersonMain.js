import React from 'react';
import LoadingIndicator from '../helpers/LoadingIndicator';
import styles from './PersonMain.module.css';

const PersonMain = ({ person, isFetching, isError }) => {
  if (isFetching || !person) {
    return <LoadingIndicator />;
  }
  if (isError?.status) {
    return <p>{isError.errorMessage}</p>;
  }

  if (person) {
    return (
      <div className={styles.main}>
        <div className={styles.img}>
          <img
            src={
              !person.profile_path
                ? 'https://cdn.dribbble.com/users/1090020/screenshots/15509551/media/fe29a709b7a89315c1673d143c23c2c1.png?compress=1&resize=1200x900&vertical=top'
                : `https://image.tmdb.org/t/p/original${person.profile_path}`
            }
            alt={person.name}
            className={styles.poster}
            loading="lazy"
          />
        </div>
        <div className={styles.bio}>
          {/* truncateしたい、read moreでトグルできるように */}
          <p className={styles['bio-text']}>{person.biography}</p>
          <button className={styles.btn}>Read More</button>
        </div>
      </div>
    );
  }
};

export default PersonMain;
