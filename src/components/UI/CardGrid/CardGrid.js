import React, { useEffect, useState } from 'react';
import Card from '../CardRow/Card';
// import LoadingIndicator from '../../../helpers/LoadingIndicator';
import styles from './CardGrid.module.css';

const CardGrid = ({ group, order, isAscend, data }) => {
  // const [targetData, setTargetData] = useState([]);
  // console.log(targetData[0]);

  // titleでセレクトが変わってもtargetDataが更新されていない

  // useEffect(() => {
  let targetData;
  if (group === 'tvseasons' || group === 'search' || group === 'searchTV') {
    targetData = data;
    // setTargetData(data);
  } else {
    // const sortedData = data.sort((a, b) => {
    targetData = data.sort((a, b) => {
      let targetDataA;
      let targetDataB;

      if (order === 'Title') {
        targetDataA = a.original_title ? a.original_title : a.original_name;
        targetDataB = b.original_title ? b.original_title : b.original_name;

        if (isAscend?.title) {
          return targetDataA < targetDataB ? -1 : 1;
        } else {
          return targetDataA < targetDataB ? 1 : -1;
        }
      }

      if (order === 'Release Date') {
        targetDataA = a.release_date ? a.release_date : a.first_air_date;
        targetDataB = b.release_date ? b.release_date : b.first_air_date;

        if (isAscend?.releaseDate) {
          return targetDataA < targetDataB ? -1 : 1;
        } else {
          return targetDataA < targetDataB ? 1 : -1;
        }
      }

      if (order === 'Rating') {
        targetDataA = a.vote_average;
        targetDataB = b.vote_average;

        if (isAscend?.rating) {
          return targetDataA < targetDataB ? -1 : 1;
        } else {
          return targetDataA < targetDataB ? 1 : -1;
        }
      }
    });

    // setTargetData(sortedData);
  }
  // }, [group, order, isAscend]);

  const renderShows = () => {
    // if (isFetching || !data) {
    //   return <LoadingIndicator />;
    // }

    // if (isError?.status) {
    //   return <p>{isError.errorMessage}</p>;
    // }

    return (
      // <p>{targetData}</p>
      <div
        className={`${group === 'tvseasons' ? styles.seasons : styles.grids}`}
      >
        {targetData?.map((item, i) => {
          return (
            <div key={i} className={styles.grid}>
              <Card group={group} data={item} cname="grid" />
            </div>
          );
        })}
      </div>
    );
  };

  return renderShows();
};

export default CardGrid;
