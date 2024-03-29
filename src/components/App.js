import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { init } from '../actions';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from '../routes/Home';
import Movies from '../routes/Movies';
import TVShows from '../routes/TVShows';
import Detail from '../routes/Detail';
import TVDetail from '../routes/tvDetail/TVDetail';
import Person from '../routes/Person';
import Search from '../routes/Search';
import Favorite from '../routes/Favorite';
import SidebarData from './data/SidebarData';
import SelectorsData from './data/SelectorsData';
import ScrollToTop from '../helpers/ScrollToTop';
import styles from './App.module.css';

const App = ({ init, movieGenres, tvGenres }) => {
  const [selectedSidebar, setSelectedSidebar] = useState(SidebarData[0].title);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    category: SelectorsData.movies.category[0].title,
    order: SelectorsData.movies.order[0].title,
    count: SelectorsData.movies.count[0].title,
  });
  const [selectedItemTV, setSelectedItemTV] = useState({
    category: SelectorsData.tvshows.category[0].title,
    order: SelectorsData.tvshows.order[0].title,
    count: SelectorsData.tvshows.count[0].title,
  });
  const [isAscend, setIsAscend] = useState({
    title: true,
    releaseDate: false,
    rating: false,
  });
  const [isAscendTV, setIsAscendTV] = useState({
    title: true,
    releaseDate: false,
    rating: false,
  });
  const [detailBackground, setDetailBackground] = useState({
    isON: false,
    url: '',
  });
  const [isDetail, setIsDetail] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState({
    state: false,
    sidebar: false,
  });

  useEffect(() => {
    init();

    window.addEventListener('resize', updateDimension);
    return () => window.addEventListener('resize', updateDimension);
  }, []);

  const updateDimension = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    if (width <= 800) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }

    if (width > 450) {
      setIsMobile({ ...isMobile, state: false });
    } else {
      setIsMobile({ ...isMobile, state: true });
    }
  }, [width]);

  return (
    <div
      className={`${styles.container} ${detailBackground.isON && styles.modal}`}
      style={{
        // backgroundColor: 'red',
        backgroundImage:
          detailBackground.isON &&
          `linear-gradient(to top left, rgba(41, 38, 33, 0.97), rgba(41, 38, 33, 0.97)), url('https://image.tmdb.org/t/p/original${detailBackground.url}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }}
    >
      <BrowserRouter>
        <ScrollToTop />
        <Header
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobile={isMobile}
          setIsMobile={setIsMobile}
        />
        <Sidebar
          selectedItem={selectedItem}
          selectedItemTV={selectedItemTV}
          selectedSidebar={selectedSidebar}
          setSelectedSidebar={setSelectedSidebar}
          isCollapsed={isCollapsed}
          isDetail={isDetail}
          isMobile={isMobile}
          setIsMobile={setIsMobile}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home setSelectedSidebar={setSelectedSidebar} width={width} />
            }
          />
          <Route
            path="movies/*"
            element={
              <Movies
                genres={movieGenres}
                setSelectedSidebar={setSelectedSidebar}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                isAscend={isAscend}
                setIsAscend={setIsAscend}
              />
            }
          />
          <Route
            path="tvshows/*"
            element={
              <TVShows
                genres={tvGenres}
                setSelectedSidebar={setSelectedSidebar}
                selectedItemTV={selectedItemTV}
                setSelectedItemTV={setSelectedItemTV}
                isAscend={isAscendTV}
                setIsAscend={setIsAscendTV}
              />
            }
          />
          <Route
            path="detail/:id"
            element={
              <Detail
                setSelectedItem={setSelectedItem}
                setIsAscend={setIsAscend}
                setDetailBackground={setDetailBackground}
                setIsDetail={setIsDetail}
                width={width}
              />
            }
          />
          <Route
            path="tvdetail/:id/*"
            element={
              <TVDetail
                setSelectedItem={setSelectedItemTV}
                setIsAscend={setIsAscendTV}
                setDetailBackground={setDetailBackground}
                setIsDetail={setIsDetail}
                width={width}
              />
            }
          />
          <Route
            path="person/:id"
            element={
              <Person
                setDetailBackground={setDetailBackground}
                setIsDetail={setIsDetail}
                width={width}
              />
            }
          />
          <Route
            path="search/:term"
            element={<Search setIsDetail={setIsDetail} />}
          />
          <Route
            path="favorite"
            element={<Favorite setSelectedSidebar={setSelectedSidebar} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movieGenres: state.conf.movieGenres,
    tvGenres: state.conf.tvGenres,
  };
};

export default connect(mapStateToProps, {
  init,
})(App);
