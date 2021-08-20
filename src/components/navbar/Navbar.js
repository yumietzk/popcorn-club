import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import SidebarData from './SidebarData';
import SubMenu from './SubMenu';
import styles from './Navbar.module.css';

const Navbar = (props) => {
  const [sidebar, setSidebar] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) return;

      setSidebar(false);
    };

    document.body.addEventListener('click', onBodyClick, {
      capture: true, // This needs from React v17
    });

    return () => {
      document.body.removeEventListener('click', onBodyClick, {
        capture: true, // This needs from React v17
      });
    };
  }, []);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <IconContext.Provider value={{ color: '#f7f7f7' }}>
      <div className={styles.navbar}>
        <Link to="#" className={styles.menu}>
          <FaIcons.FaBars
            onClick={showSidebar}
            className={styles['menu-icon']}
          />
        </Link>
        {props.children}
      </div>
      <nav
        className={
          sidebar ? `${styles.sidebar} ${styles.active}` : styles.sidebar
        }
        ref={ref}
      >
        <div className={styles.toggle}>
          <Link to="#" className={styles.menu}>
            <AiIcons.AiOutlineClose
              onClick={showSidebar}
              className={styles['menu-icon']}
            />
          </Link>
        </div>
        <ul className={styles.items}>
          {SidebarData.map((item, index) => {
            return (
              <SubMenu item={item} key={index} onShowSidebar={showSidebar} />
            );
          })}
        </ul>
      </nav>
    </IconContext.Provider>
  );
};

export default Navbar;
