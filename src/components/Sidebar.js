import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => {
    setSubnav(!subnav);
  };

  return (
    <React.Fragment>
      {/* <Link
        to={item.path}
        onClick={item.subNav && showSubnav}
        className={styles.mainmenu}
      >
        {item.icon}
        <span className={styles.span}>{item.title}</span>
        <div className={styles.dropdown}>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Link>
      {subnav &&
        item.subNav.map((sub, index) => {
          return (
            <Link to={sub.path} key={index} className={styles.submenu}>
              {sub.icon}
              <span className={styles.label}>{sub.title}</span>
            </Link>
          );
        })} */}
    </React.Fragment>
  );
};

export default Sidebar;
