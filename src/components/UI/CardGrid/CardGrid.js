import React from 'react';
import Card from '../CardRow/Card';

const CardGrid = ({ group, order, isAscend, data, isFetching, isError }) => {
  const renderShows = () => {
    if (isFetching || !data) {
      return <div>Now loading...</div>;
    }

    if (isError?.status) {
      return <p>{isError.errorMessage}</p>;
    }

    if (data && data.length === 0) {
      return <p>No data.</p>;
    }

    let targetData;
    if (group === 'tvseasons' || group === 'search' || group === 'searchTV') {
      targetData = data;
    } else {
      const sortedData = data?.sort((a, b) => {
        let targetDataA;
        let targetDataB;

        if (order === 'Title') {
          targetDataA = a.original_title ? a.original_title : a.original_name;
          targetDataB = b.original_title ? b.original_title : b.original_name;
        }

        if (order === 'Release Date') {
          targetDataA = a.release_date ? a.release_date : a.first_air_date;
          targetDataB = b.release_date ? b.release_date : b.first_air_date;
        }

        if (order === 'Rating') {
          targetDataA = a.vote_average;
          targetDataB = b.vote_average;
        }

        if (isAscend) {
          return targetDataA < targetDataB ? -1 : 1;
        } else {
          return targetDataA < targetDataB ? 1 : -1;
        }
      });

      targetData = sortedData;
    }

    return targetData.map((item, i) => {
      return (
        <div key={i}>
          <Card group={group} data={item} cname="grid" />
        </div>
      );
    });
  };

  return renderShows();
};

export default CardGrid;
