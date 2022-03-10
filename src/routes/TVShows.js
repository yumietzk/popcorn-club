import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Title from '../components/Title';
import All from './All';
import ByGenre from './ByGenre';

const TVShows = ({
  genres,
  setSelectedSidebar,
  selectedItemTV,
  setSelectedItemTV,
  isAscend,
  setIsAscend,
}) => {
  useEffect(() => {
    setSelectedSidebar('TV Shows');
  }, []);

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
    </React.Fragment>
  );
};

export default TVShows;
