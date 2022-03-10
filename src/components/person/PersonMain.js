import React, { useEffect, useRef, useState } from 'react';
import { setImage } from '../../helpers/SetImage';
import { truncate } from '../../helpers/Truncate';
import ToggleBtn from '../UI/Button/ToggleBtn';
import styles from './PersonMain.module.css';

const PersonMain = ({ person, width }) => {
  const ref = useRef();
  const [curElement, setElement] = useState();
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const targetData = !person.profile_path
    ? 'https://cdn.dribbble.com/users/1090020/screenshots/15509551/media/fe29a709b7a89315c1673d143c23c2c1.png?compress=1&resize=1200x900&vertical=top'
    : `https://image.tmdb.org/t/p/original${person.profile_path}`;

  useEffect(() => {
    setElement(ref?.current?.childNodes[0]);
  }, [ref]);

  useEffect(() => {
    setImage(curElement, targetData);
  }, [curElement, person]);

  const renderBio = () => {
    if (!person.biography) {
      return <p className={styles['no-bio']}>Sorry, no biography.</p>;
    }

    if (person.biography.length > `${width <= 1200 ? 600 : 850}`) {
      if (isToggleOpen) {
        return <p className={styles['bio-text']}>{person.biography}</p>;
      } else {
        return (
          <p className={styles['bio-text']}>
            {truncate(person.biography, `${width <= 1200 ? 600 : 850}`)}
          </p>
        );
      }
    } else {
      return <p className={styles['bio-text']}>{person.biography}</p>;
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.img} ref={ref}>
        <img alt={person.name} className={styles.poster} />
      </div>
      <div className={styles.bio}>
        {renderBio()}
        <ToggleBtn
          type="person"
          condition={person.biography.length > `${width <= 1200 ? 600 : 850}`}
          isToggleOpen={isToggleOpen}
          setIsToggleOpen={setIsToggleOpen}
        />
      </div>
    </div>
  );
};

export default PersonMain;
