import React from 'react';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from '../pages/Home';
import Movies from '../pages/Movies';
import TVshows from '../pages/Tvshows';
import Favorite from '../pages/Favorite';
import Detail from '../pages/Detail';
import DetailTV from '../pages/DetailTV';
import Search from '../pages/Search';
import Action from './genre/movies/Action';
import Adventure from './genre/movies/Adventure';
import Animation from './genre/movies/Animation';
import Comedy from './genre/movies/Comedy';
import Documentary from './genre/movies/Documentary';
import Drama from './genre/movies/Drama';
import Fantasy from './genre/movies/Fantasy';
import Horror from './genre/movies/Horror';
import Romance from './genre/movies/Romance';
import Scifi from './genre/movies/Scifi';
import ActionAdventureShow from './genre/tvs/ActionAdventure';
import AnimationShow from './genre/tvs/Animation';
import ComedyShow from './genre/tvs/Comedy';
import CrimeShow from './genre/tvs/Crime';
import DocumentaryShow from './genre/tvs/Documentary';
import DramaShow from './genre/tvs/Drama';
import KidsShow from './genre/tvs/Kids';
import MysteryShow from './genre/tvs/Mystery';
import RealityShow from './genre/tvs/Reality';
import Modal from './Modal';
import ModalTv from './ModalTv';
import history from '../history';
import './App.css';

const App = () => {
  return (
    <Router history={history}>
      <Header />
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
        {/* <Route path="/search/:query" component={Search} /> */}
        <Route path="/detail/:id/play" component={Modal} />
        <Route path="/detailtv/:id/play" component={ModalTv} />
        <Route path="/search" component={Search} />
      </Switch>
    </Router>
  );
};

export default App;

// Could be props
// genres, year, country, producer...
// Could be state
// auth: isSignedIn,
