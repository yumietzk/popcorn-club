import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// import {
//   LazyLoadImage,
//   trackWindowScroll,
// } from 'react-lazy-load-image-component';
import Title from './Title';
import All from './All';
import ByGenre from './ByGenre';
import styles from './Movies.module.css';

const Movies = ({
  genres,
  setSelectedSidebar,
  selectedItem,
  setSelectedItem,
  isAscend,
  setIsAscend,
  isClearAll,
  setIsClearAll,
}) => {
  // ⚠️categoryが変わるたびに、orderとcountの値をリセットしたい

  useEffect(() => {
    setSelectedSidebar('Movies');
  }, []);

  return (
    <React.Fragment>
      <Title
        genres={genres}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        isAscend={isAscend}
        setIsAscend={setIsAscend}
        setIsClearAll={setIsClearAll}
        type="movies"
      />
      <div className={styles.movies}>
        <Routes>
          <Route
            path="/"
            element={
              <All
                selectedItem={selectedItem}
                isAscend={isAscend}
                isClearAll={isClearAll}
                type="movies"
                group="movies"
              />
            }
          />
          <Route
            path="genre/:genre"
            element={
              <ByGenre
                selectedItem={selectedItem}
                isAscend={isAscend}
                type="movies"
                group="movies"
              />
            }
          />
        </Routes>
      </div>
    </React.Fragment>
  );
};

export default Movies;
