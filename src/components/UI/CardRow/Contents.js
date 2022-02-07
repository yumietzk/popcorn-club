import React from 'react';
import Card from './Card';
// import LoadingIndicator from '../../../helpers/LoadingIndicator';
import styles from './Contents.module.css';

const Contents = ({ group, data }) => {
  const renderCards = () => {
    // if (isFetching || !data) {
    //   return <LoadingIndicator />;
    // }

    // if (isError?.status) {
    //   return <p>{isError.errorMessage}</p>;
    // }

    // if (data) {
    //   if (data.length === 0) {
    //     return <p>No data.</p>;
    //   } else {
    //     if (group === 'tvdetail') {
    //       return data?.seasons?.map((item, i) => {
    //         return (
    //           <li className={styles.card} key={i}>
    //             <Card group={group} data={item} />
    //           </li>
    //         );
    //       });
    //     } else {
    //       return data?.map((item, i) => {
    //         return (
    //           <li className={styles.card} key={i}>
    //             <Card group={group} data={item} />
    //           </li>
    //         );
    //       });
    //     }
    //   }
    // }

    if (group === 'tvdetail') {
      if (!data.seasons || data.seasons.length === 0) {
        return <p>No data.</p>;
      } else {
        return data.seasons?.map((item, i) => {
          return (
            <li className={styles.card} key={i}>
              <Card group={group} data={item} />
            </li>
          );
        });
      }
    } else {
      if (data.length === 0) {
        return <p>No data.</p>;
      } else {
        if (group === 'tvdetail') {
          return data.seasons?.map((item, i) => {
            return (
              <li className={styles.card} key={i}>
                <Card group={group} data={item} />
              </li>
            );
          });
        } else {
          return data.map((item, i) => {
            return (
              <li className={styles.card} key={i}>
                <Card group={group} data={item} />
              </li>
            );
          });
        }
      }
    }
  };

  return (
    <div className={styles.contents}>
      <ul className={styles.cards}>
        {/* <ul className={`${styles.cards} ${isFetching ? styles.loading : null}`}> */}
        {renderCards()}
      </ul>
    </div>
  );
};

export default Contents;
