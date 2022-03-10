import React, { useState, useEffect, useRef } from 'react';
import { setImage } from '../../helpers/SetImage';
import { truncate } from '../../helpers/Truncate';
import ToggleBtn from '../UI/Button/ToggleBtn';
import styles from './DetailSeasonsMain.module.css';

const DetailSeasonsMain = ({ name, width, data }) => {
  const ref = useRef();
  const [curElement, setElement] = useState();
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const targetData = !data.poster_path
    ? 'https://cdn.dribbble.com/users/2549306/screenshots/14306992/media/0be875c520dcf6b4b7176738ec346334.png?compress=1&resize=1000x750&vertical=top'
    : `https://image.tmdb.org/t/p/original${data.poster_path}`;

  useEffect(() => {
    setElement(ref?.current?.childNodes[0]);
  }, [ref]);

  useEffect(() => {
    setImage(curElement, targetData);
  }, [curElement, data]);

  const renderOverview = () => {
    if (!data.overview) return null;

    if (
      data.overview.length > `${width >= 2000 ? 800 : width <= 600 ? 270 : 400}`
    ) {
      if (isToggleOpen) {
        return <div className={styles.overview}>{data.overview}</div>;
      } else {
        return (
          <div className={styles.overview}>
            {truncate(
              data.overview,
              `${width >= 2000 ? 800 : width <= 600 ? 270 : 400}`
            )}
          </div>
        );
      }
    } else {
      return <div className={styles.overview}>{data.overview}</div>;
    }
  };

  return (
    <React.Fragment>
      <div className={styles['seasons-main']}>
        <div className={styles.img} ref={ref}>
          <img alt={name} className={styles.poster} />
        </div>
        {width <= 450 ? (
          <div className={styles['mobile-content']}>
            <h2 className={styles.title}>{name}</h2>
            <p className={styles.season}>{data.name}</p>
          </div>
        ) : (
          <div className={styles.content}>
            <h2 className={styles.title}>{name}</h2>
            <p className={styles.season}>{data.name}</p>
            {renderOverview()}
            <ToggleBtn
              condition={data.overview.length > 400}
              isToggleOpen={isToggleOpen}
              setIsToggleOpen={setIsToggleOpen}
            />
          </div>
        )}
      </div>
      {width <= 450 && (
        <React.Fragment>
          {renderOverview()}
          <ToggleBtn
            condition={
              data.overview.length >
              `${width >= 2000 ? 800 : width <= 600 ? 270 : 400}`
            }
            isToggleOpen={isToggleOpen}
            setIsToggleOpen={setIsToggleOpen}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default DetailSeasonsMain;
