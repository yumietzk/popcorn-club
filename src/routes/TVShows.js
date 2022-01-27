import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Title from './Title';
import SelectorsData from '../components/data/SelectorsData';
import All from './All';
import ByGenre from './ByGenre';
import styles from './TVShows.module.css';

const TVShows = ({
  genres,
  setSelectedSidebar,
  selectedItemTV,
  setSelectedItemTV,
}) => {
  // const [selectedItem, setSelectedItem] = useState({
  //   category: SelectorsData.tvshows.category[0].title,
  //   order: SelectorsData.tvshows.order[0].title,
  //   count: SelectorsData.tvshows.count[0].title,
  // });
  const { category, order } = selectedItemTV;
  const [isAscend, setIsAscend] = useState(); // ↑

  useEffect(() => {
    setSelectedSidebar('TV Shows');
  }, []);

  useEffect(() => {
    if (order === 'Title') setIsAscend(true);
    if (order === 'Release Date' || order === 'Rating') setIsAscend(false);
  }, [category, order]);

  return (
    <React.Fragment>
      <Title
        genres={genres}
        selectedItem={selectedItemTV}
        setSelectedItem={setSelectedItemTV}
        isAscend={isAscend}
        setIsAscend={setIsAscend}
        type="tvshows"
      />
      <div className={styles.tvshows}>
        <Routes>
          <Route
            path="/"
            element={
              <All
                selectedItem={selectedItemTV}
                isAscend={isAscend}
                type="tvshows"
                group="tvshows"
              />
            }
          />
          <Route
            path="genre/:genre"
            element={
              <ByGenre
                selectedItem={selectedItemTV}
                isAscend={isAscend}
                type="tvshows"
                group="tvshows"
              />
            }
          />
        </Routes>
      </div>
    </React.Fragment>
  );
};

export default TVShows;
