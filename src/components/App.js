import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Header from './navbar/Header';
import Home from '../pages/Home';
import Movies from '../pages/Movies';
import Action from '../pages/genre/movies/Action';
import Adventure from '../pages/genre/movies/Adventure';
import Animation from '../pages/genre/movies/Animation';
import Comedy from '../pages/genre/movies/Comedy';
import Documentary from '../pages/genre/movies/Documentary';
import Drama from '../pages/genre/movies/Drama';
import Fantasy from '../pages/genre/movies/Fantasy';
import Horror from '../pages/genre/movies/Horror';
import Romance from '../pages/genre/movies/Romance';
import Scifi from '../pages/genre/movies/Scifi';
import TVshows from '../pages/Tvshows';
import ActionAdventureShow from '../pages/genre/tvs/ActionAdventure';
import AnimationShow from '../pages/genre/tvs/Animation';
import ComedyShow from '../pages/genre/tvs/Comedy';
import CrimeShow from '../pages/genre/tvs/Crime';
import DocumentaryShow from '../pages/genre/tvs/Documentary';
import DramaShow from '../pages/genre/tvs/Drama';
import KidsShow from '../pages/genre/tvs/Kids';
import MysteryShow from '../pages/genre/tvs/Mystery';
import RealityShow from '../pages/genre/tvs/Reality';
import Favorite from '../pages/Favorite';
import Detail from '../pages/Detail';
import DetailTV from '../pages/DetailTV';
import Search from '../pages/Search';
import Modal from './modal/Modal';
import ScrollToTop from '../helpers/ScrollToTop';
import history from '../history';
import './App.css';

const App = () => {
  return (
    <Router history={history}>
      <Header />
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/movies" exact component={Movies} />
        <Route path="/movies/action" component={Action} />
        <Route path="/movies/adventure" component={Adventure} />
        <Route path="/movies/animation" component={Animation} />
        <Route path="/movies/comedy" component={Comedy} />
        <Route path="/movies/documentary" component={Documentary} />
        <Route path="/movies/drama" component={Drama} />
        <Route path="/movies/fantasy" component={Fantasy} />
        <Route path="/movies/horror" component={Horror} />
        <Route path="/movies/romance" component={Romance} />
        <Route path="/movies/scifi" component={Scifi} />
        <Route path="/tvshows" exact component={TVshows} />
        <Route
          path="/tvshows/actionadventure"
          component={ActionAdventureShow}
        />
        <Route path="/tvshows/animation" component={AnimationShow} />
        <Route path="/tvshows/comedy" component={ComedyShow} />
        <Route path="/tvshows/crime" component={CrimeShow} />
        <Route path="/tvshows/documentary" component={DocumentaryShow} />
        <Route path="/tvshows/drama" component={DramaShow} />
        <Route path="/tvshows/kids" component={KidsShow} />
        <Route path="/tvshows/mystery" component={MysteryShow} />
        <Route path="/tvshows/reality" component={RealityShow} />
        <Route path="/favorite" component={Favorite} />
        <Route path="/detail/:id" exact component={Detail} />
        <Route path="/detailtv/:id" exact component={DetailTV} />
        <Route path="/search" component={Search} />
        <Route path="/detail/:id/play" component={Modal} />
        {/* <Route path="/detailtv/:id/play" component={ModalTv} /> */}
        {/* <Route path="/search/:query" component={Search} /> */}
      </Switch>
    </Router>
  );
};

export default App;
