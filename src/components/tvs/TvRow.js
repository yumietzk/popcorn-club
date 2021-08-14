import React, { useState, useEffect } from 'react';
import tmdb from '../../apis/tmdb';
import TvCategory from './TvCategory';
import TvContents from './TvContents';
import styles from './TvRow.module.css';

const TvRow = (props) => {
  // const [shows, setShows] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // try to fetch only english movies
  //     const response = await tmdb.get(props.url);

  //     console.log(response.data.results);
  //     setShows(response.data.results);
  //   };

  //   fetchData();
  // }, []);

  // Make a condition: if it's a wide row, put a classname for wide container, wide contents.

  return (
    <div className={`${styles.container} ${styles[props.cname]}`}>
      <TvCategory category={props.category} />
      <TvContents type={props.type} cname={props.cname} />
    </div>
  );
};

export default TvRow;
