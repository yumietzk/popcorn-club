import React, { useState } from 'react';
import * as RiIcons from 'react-icons/ri';
import styles from './ToggleBtn.module.css';

const ToggleBtn = ({ condition, isToggleOpen, setIsToggleOpen }) => {
  // const [isToggleOpen, setIsToggleOpen] = useState(false);

  const renderBtn = () => {
    if (condition) {
      if (isToggleOpen) {
        return (
          <button className={styles.btn} onClick={() => setIsToggleOpen(false)}>
            Read Less <RiIcons.RiArrowUpSFill className={styles['btn-icon']} />
          </button>
        );
      } else {
        return (
          <button className={styles.btn} onClick={() => setIsToggleOpen(true)}>
            Read More{' '}
            <RiIcons.RiArrowDownSFill className={styles['btn-icon']} />
          </button>
        );
      }
    } else {
      return null;
    }
  };

  return renderBtn();
};

export default ToggleBtn;
