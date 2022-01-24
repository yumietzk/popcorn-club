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

const Movies = ({ setSelectedSidebar }) => {
  const [selectedItem, setSelectedItem] = useState({
    category: SelectorsData.movies.category[0].title,
    order: SelectorsData.movies.order[0].title,
    count: SelectorsData.movies.count[0].title,
  });
  // const [selectedItemTV, setSelectedItemTV] = useState({
  //   category: SelectorsData.tvshows.category[0].title,
  //   order: SelectorsData.tvshows.order[0].title,
  //   count: SelectorsData.tvshows.count[0].title,
  // });
  const [isAscend, setIsAscend] = useState(); // ↑

  useEffect(() => {
    setSelectedSidebar('Movies');
  }, []);

  // ⚠️Can I set the boolean to the initial state to useState? ↑↑ Because it's apparently rendered twice which is unnecessary.
  useEffect(() => {
    if (selectedItem.order === 'Title') setIsAscend(true);
    if (
      selectedItem.order === 'Release Date' ||
      selectedItem.order === 'Rating'
      // selectedItemTV.order === 'Release Date' ||
      // selectedItemTV.order === 'Rating'
    )
      setIsAscend(false);
  }, [
    selectedItem.category,
    selectedItem.order,
    // selectedItemTV.category,
    // selectedItemTV.order,
  ]);

  // Want to reset the value of order and count every time the category value is changed
  // useEffect(() => {
  //   setSelectedItem({
  //     ...selectedItem,
  //     [selectedItem.order]: SelectorsData.movies.order[0].title,
  //     [selectedItem.count]: SelectorsData.movies.count[0].title,
  //   });
  // }, [selectedItem.category]);

  return (
    <React.Fragment>
      <Title
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
              />
            }
          />
        </Routes>
      </div>
    </React.Fragment>
  );
};

export default Movies;
