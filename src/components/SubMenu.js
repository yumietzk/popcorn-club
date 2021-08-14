import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SubMenu.module.css';

const SubMenu = ({ item, index, onShowSidebar }) => {
  const [subnav, setSubnav] = useState(false);

  // const showSidebar = () => {
  //   setOpenSide(!openSide);
  // };

  const showSubnav = () => {
    setSubnav(!subnav);
  };

  const showBar = (item) => {
    if (item.subNav) {
      showSubnav();
    } else {
      onShowSidebar();
    }
  };

  // const showSubmenu = (item) => {
  //   if (!item.subNav) return null;

  //   return item.subNav.map((sub, index) => {
  //     return (
  //       <li className={styles.sublist}>
  //         <Link
  //           to={sub.path}
  //           key={index}
  //           className={styles.submenu}
  //           onClick={onShowSidebar}
  //         >
  //           <span className={styles.label}>{sub.title}</span>
  //         </Link>
  //       </li>
  //     );
  //   })
  // }

  return (
    <li key={index} className={styles[item.className]}>
      <Link
        to={item.path}
        className={styles.mainmenu}
        onClick={() => showBar(item)}
      >
        <div className={styles.mainicon}>{item.icon}</div>
        <span className={styles.maintitle}>{item.title}</span>
        <div className={styles.dropdown}>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Link>

      {subnav && (
        <ul className={styles.subitems}>
          {item.subNav?.map((sub, index) => {
            return (
              <li className={styles.sublist}>
                <Link
                  to={sub.path}
                  key={index}
                  className={styles.submenu}
                  onClick={onShowSidebar}
                >
                  <span className={styles.label}>{sub.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export default SubMenu;
