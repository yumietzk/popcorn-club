import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// import {
//   LazyLoadImage,
//   trackWindowScroll,
// } from 'react-lazy-load-image-component';
import Title from './Title';
import SelectorsData from '../components/data/SelectorsData';
import All from './All';
import ByGenre from './ByGenre';
import styles from './Movies.module.css';

const Movies = ({
  genres,
  setSelectedSidebar,
  selectedItem,
  setSelectedItem,
}) => {
  // categoryが変わるたびに、orderとcountの値をリセットしたい
  // const [selectedItem, setSelectedItem] = useState({
  //   category: SelectorsData.movies.category[0].title,
  //   order: SelectorsData.movies.order[0].title,
  //   count: SelectorsData.movies.count[0].title,
  // });

  const { category, order } = selectedItem;
  const [isAscend, setIsAscend] = useState(); // ↑

  useEffect(() => {
    setSelectedSidebar('Movies');
  }, []);

  // ⚠️Can I set the boolean to the initial state to useState? ↑↑ Because it's apparently rendered twice which is unnecessary.
  useEffect(() => {
    if (order === 'Title') setIsAscend(true);
    if (order === 'Release Date' || order === 'Rating') setIsAscend(false);
  }, [category, order]);

  return (
    <React.Fragment>
      <Title
        genres={genres}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        isAscend={isAscend}
        setIsAscend={setIsAscend}
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
