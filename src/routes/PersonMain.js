import React from 'react';
import styles from './PersonMain.module.css';

const PersonMain = ({ person, isFetching, isError }) => {
  if (isFetching || !person) {
    return <div>Now loading...</div>;
  }
  if (isError?.status) {
    return <p>{isError.errorMessage}</p>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.img}>
        <img
          src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
          alt={person.name}
          className={styles.poster}
        />
      </div>
      <div className={styles.bio}>
        {/* truncateしたい、read moreでトグルできるように */}
        <p className={styles['bio-text']}>{person.biography}</p>
        <button className={styles.btn}>Read More</button>
      </div>
    </div>
  );
};

export default PersonMain;
