import React from 'react';

const Cast = () => {
  const renderCast = () => {
    if (isFetching || !data) {
      return <div>Now loading...</div>;
    }

    if (isError?.status) {
      return <p>{isError.errorMessage}</p>;
    }

    if (data && data.length === 0) {
      return <p>No cast registered.</p>;
    }

    return data?.map((person) => {
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
    <div className={styles.cast}>
      <h4 className={styles.title}>Cast</h4>
      <div>
        <ul className={styles.wrap}>{renderCast()}</ul>
      </div>
    </div>
  );
};

export default Cast;
