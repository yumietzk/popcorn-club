import React from 'react';
import DetailMain from '../../components/detail/DetailMain';
import Seasons from '../../components/detail/Seasons';
import Cast from '../../components/detail/Cast';
import Related from '../../components/detail/Related';
import LoadingIndicator from '../../helpers/LoadingIndicator';
import styles from './TVDetailContent.module.css';

const TVDetailContent = ({
  setSelectedItem,
  setIsAscend,
  width,
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
      return <p className={styles.error}>{isError.errorMessage}</p>;
    }

    if (detail && casts && related) {
      return (
        <React.Fragment>
          <DetailMain
            setSelectedItem={setSelectedItem}
            setIsAscend={setIsAscend}
            group="tvshows"
            data={detail}
            width={width}
          />
          <Seasons data={detail} width={width} />
          <Cast data={casts} width={width} />
          <Related group="tvshows" data={related} width={width} />
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
