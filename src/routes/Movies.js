import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Title from '../components/Title';
import All from './All';
import ByGenre from './ByGenre';

const Movies = ({
  genres,
  setSelectedSidebar,
  selectedItem,
  setSelectedItem,
  isAscend,
  setIsAscend,
}) => {
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
        type="movies"
      />
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
    </React.Fragment>
  );
};

export default Movies;
