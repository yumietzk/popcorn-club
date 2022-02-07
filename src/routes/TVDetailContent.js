import React from 'react';
import DetailMain from './detail/DetailMain';
import Seasons from './detail/Seasons';
import Cast from './detail/Cast';
import Related from './detail/Related';
import LoadingIndicator from '../helpers/LoadingIndicator';
import styles from './TVDetailContent.module.css';

const TVDetailContent = ({
  setSelectedItem,
  setIsAscend,
  detail,
  casts,
  related,
  isFetching,
  isError,
}) => {
  const renderDetail = () => {
    if (isFetching || !detail || !casts || !related) {
      return <LoadingIndicator />;
    }

    if (isError?.status) {
      return <p>{isError.errorMessage}</p>;
    }

    if (detail && casts && related) {
      return (
        <React.Fragment>
          <DetailMain
            setSelectedItem={setSelectedItem}
            setIsAscend={setIsAscend}
            group="tvshows"
            data={detail}
          />
          <Seasons data={detail} />
          <Cast data={casts} />
          <Related group="tvshows" data={related} />
        </React.Fragment>
      );
    }
  };

  return (
    <div className={`${styles.detail} ${isFetching ? styles.loading : null}`}>
      {renderDetail()}
    </div>
  );
};

export default TVDetailContent;
