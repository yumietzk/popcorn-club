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
  // const [subnav, setSubnav] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  // * Try to close sidebar also when clicking somewhere in a body element using document.addEventListener('click, {})
  // * What's the best action after selecting a submenu on a sidebar?: action in a movie

  // const showSubMenu = (item, index) => {
  //   return (
  //     <li key={index} className={styles[item.className]}>
  //       <Link
  //         to={item.path}
  //         className={styles.mainmenu}
  //         onClick={() => showBar(item)}
  //       >
  //         {item.icon}
  //         <span className={styles.maintitle}>{item.title}</span>
  //         <div className={styles.dropdown}>
  //           {item.subNav && subnav
  //             ? item.iconOpened
  //             : item.subNav
  //             ? item.iconClosed
  //             : null}
  //         </div>
  //       </Link>

  //       {subnav && (
  //         <ul className={styles.subitems}>
  //           {item.subNav?.map((sub, index) => {
  //             return (
  //               <li className={styles.sublist}>
  //                 <Link
  //                   to={sub.path}
  //                   key={index}
  //                   className={styles.submenu}
  //                   onClick={showSidebar}
  //                 >
  //                   <span className={styles.label}>{sub.title}</span>
  //                 </Link>
  //               </li>
  //             );
  //           })}
  //         </ul>
  //       )}
  //     </li>
  //   );
  // };

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
