import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import SidebarData from './SidebarData';
import SubMenu from './SubMenu';
import styles from './Navbar.module.css';

const Navbar = (props) => {
  const [sidebar, setSidebar] = useState(false);

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
