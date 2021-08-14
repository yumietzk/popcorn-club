import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as RiIcons from 'react-icons/ri';
import { fetchMovieUpcoming, fetchMovieTopRated } from '../actions';
import MovieHeader from '../components/movies/MovieHeader';
import MovieRow from '../components/movies/MovieRow';
import styles from './Movies.module.css';

const Movies = (props) => {
  const [value, setValue] = useState('Action');

  useEffect(() => {
    // props.fetchMoviePopular();
    props.fetchMovieUpcoming();
    props.fetchMovieTopRated();
  }, []);

  const onValueChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.movies}>
      <div className={styles.title}>
        <h3 className={styles.menu}>Movies</h3>
        {/* <div className={styles.genre}>
          <div className={styles.label}>
            <span>Select a genre</span>
            <RiIcons.RiArrowDownSFill className={styles.icon} />
          </div>
          <div className={styles.select}>
            <Link to="/movies/action">
              <span className={styles.label}>Action</span>
            </Link>
            <Link to="/movies/action">
              <span className={styles.label}>Action</span>
            </Link>
          </div>
        </div> */}
        {/* <div className={styles.genre}>
          <h4>Movie Genre</h4>
          <div className={styles.selected}>Select genre</div>
          <div className={styles.selectbox}>
            <div className={styles['option-container']}>
              <div className={styles.option}>
                <input
                  type="radio"
                  id="automobiles"
                  className={styles.radio}
                  name="category"
                ></input>
                <lable for="automobiles"></lable>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <MovieHeader />
      <MovieRow
        url="/movie/upcoming?api_key=8a45061d820fb7b5b5f574766f028ff6"
        category="Upcoming"
        type="upcoming"
        cname="wide"
      />
      {/* <MovieRow
        url="/movie/popular?api_key=8a45061d820fb7b5b5f574766f028ff6"
        category="Popular"
      /> */}
      <MovieRow category="Top Rated" type="toprated" />
    </div>
  );

  // as props: category(popular, toprated...),
};

// const Row = ({ title, fetchUrl, isLargeRow }) => {
//   const [movies, setMovies] = useState([]);
//   const [trailerUrl, setTrailerUrl] = useState('');

//   // Run once when the row loads, and don't run again.
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await tmdb.get(fetchUrl);
//       // console.log(response.data.results);
//       setMovies(response.data.results);
//     };

//     fetchData();
//   }, [fetchUrl]);

//   const opts = {
//     height: '390',
//     width: '100%',
//     playerVars: {
//       autoplay: 1,
//     },
//   };

//   // console.log(movies);

//   const onClick = (movie) => {
//     if (trailerUrl) {
//       setTrailerUrl('');
//     } else {
//       movieTrailer(movie?.name || '')
//         .then((url) => {
//           const urlParams = new URLSearchParams(new URL(url).search);
//           console.log(urlParams);
//           setTrailerUrl(urlParams.get('v'));
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   // poser_path looks like "/2ST6l4WP7ZfqAetuttBqx8F3AAH.jpg", and that's not a complete url. We need to append that to the base_url.
//   const renderedMovies = movies.map((movie) => {
//     return (
//       <img
//         onClick={() => onClick(movie)}
//         className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
//         src={`${base_url}${
//           isLargeRow ? movie.poster_path : movie.backdrop_path
//         }`}
//         alt={movie.name}
//         key={movie.id}
//       />
//     );
//   });

//   return (
//     <div className="row">
//       <h2>{title}</h2>
//       <div className="row__posters">{renderedMovies}</div>
//       {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
//     </div>
//   );
// };

export default connect(null, {
  fetchMovieUpcoming: fetchMovieUpcoming,
  fetchMovieTopRated: fetchMovieTopRated,
})(Movies);
