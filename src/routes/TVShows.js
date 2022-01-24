import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Title from './Title';
import SelectorsData from '../components/data/SelectorsData';
import All from './All';
import ByGenre from './ByGenre';
import styles from './TVShows.module.css';

const TVShows = ({ setSelectedSidebar }) => {
  const [selectedItem, setSelectedItem] = useState({
    category: SelectorsData.tvshows.category[0].title,
    order: SelectorsData.tvshows.order[0].title,
    count: SelectorsData.tvshows.count[0].title,
  });
  const [isAscend, setIsAscend] = useState(); // ↑

  useEffect(() => {
    setSelectedSidebar('TV Shows');
  }, []);

  useEffect(() => {
    if (selectedItem.order === 'Title') setIsAscend(true);
    if (
      selectedItem.order === 'Release Date' ||
      selectedItem.order === 'Rating'
    )
      setIsAscend(false);
  }, [selectedItem.category, selectedItem.order]);

  return (
    <React.Fragment>
      <Title
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
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
                selectedItem={selectedItem}
                isAscend={isAscend}
                type="tvshows"
              />
            }
          />
          <Route
            path="genre/:genre"
            element={
              <ByGenre
                selectedItem={selectedItem}
                isAscend={isAscend}
                type="tvshows"
              />
            }
          />
        </Routes>
      </div>
    </React.Fragment>
  );
};

export default TVShows;
