import React, { useEffect, useRef, useState } from 'react';
// import * as RiIcons from 'react-icons/ri';
// import useObserver from '../hooks/useObserver';
import { setImage } from '../helpers/SetImage';
import { truncate } from '../helpers/Truncate';
import ToggleBtn from '../components/UI/ToggleBtn';
import styles from './PersonMain.module.css';

const PersonMain = ({ person }) => {
  const ref = useRef();
  // const [curElement, setSrc] = useObserver(ref);
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

  // console.log(person.biography.length);

  const renderBio = () => {
    if (person.biography.length > 850) {
      if (isToggleOpen) {
        return <p className={styles['bio-text']}>{person.biography}</p>;
      } else {
        return (
          <p className={styles['bio-text']}>
            {truncate(person.biography, 850)}
          </p>
        );
      }
    } else {
      return <p className={styles['bio-text']}>{person.biography}</p>;
    }
  };

  // const renderBtn = () => {
  //   if (person.biography.length > 850) {
  //     if (isToggleOpen) {
  //       return (
  //         <button className={styles.btn} onClick={() => setIsToggleOpen(false)}>
  //           Read Less <RiIcons.RiArrowUpSFill className={styles['btn-icon']} />
  //         </button>
  //       );
  //     } else {
  //       return (
  //         <button className={styles.btn} onClick={() => setIsToggleOpen(true)}>
  //           Read More{' '}
  //           <RiIcons.RiArrowDownSFill className={styles['btn-icon']} />
  //         </button>
  //       );
  //     }
  //   }
  // };

  return (
    <div className={styles.main}>
      <div className={styles.img} ref={ref}>
        <img alt={person.name} className={styles.poster} />
      </div>
      <div className={styles.bio}>
        {/* truncateしたい、read moreでトグルできるように */}
        {/* <p className={styles['bio-text']}>{truncate(person.biography, 850)}</p> */}
        {/* <p className={styles['bio-text']}>{person.biography}</p> */}
        {renderBio()}
        <ToggleBtn
          condition={person.biography.length > 850}
          isToggleOpen={isToggleOpen}
          setIsToggleOpen={setIsToggleOpen}
        />
        {/* {renderBtn()} */}
      </div>
    </div>
  );
};

export default PersonMain;
