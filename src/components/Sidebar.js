import React from 'react';
import { Link } from 'react-router-dom';
import SidebarData from './data/SidebarData';
import styles from './Sidebar.module.css';

const Sidebar = ({
  selectedItem,
  selectedItemTV,
  selectedSidebar,
  setSelectedSidebar,
  isCollapsed,
  isDetail,
  isMobile,
  setIsMobile,
}) => {
  const linkPath = (item) => {
    if (item.title === 'Movies') {
      if (selectedItem.category === 'All') {
        return item.path;
      } else {
        return `movies/genre/${selectedItem.category.toLowerCase()}`;
      }
    } else if (item.title === 'TV Shows') {
      if (selectedItemTV.category === 'All') {
        return item.path;
      } else {
        return `tvshows/genre/${selectedItemTV.category.toLowerCase()}`;
      }
    } else {
      return item.path;
    }
  };

  const handleClick = (item) => {
    setSelectedSidebar(item.title);

    if (isMobile.state) {
      setIsMobile({ ...isMobile, sidebar: !isMobile.sidebar });
    }
  };

  return (
    <nav
      className={`${styles.navigation} ${
        isMobile.state && isMobile.sidebar && styles.mobile
      }`}
    >
      <ul className={styles.lists}>
        {SidebarData.map((item, index) => {
          return (
            <li className={styles.list} key={index}>
              <Link
                to={linkPath(item)}
                className={`${styles['list-menu']} ${
                  !isDetail && selectedSidebar === item.title && styles.selected
                }`}
                onClick={() => handleClick(item)}
                data-testid={`link-btn-${index}`}
              >
                <div className={styles['list-icon']}>{item.icon}</div>
                {isMobile.state ? (
                  <span className={styles['list-title']}>{item.title}</span>
                ) : (
                  !isCollapsed && (
                    <span className={styles['list-title']}>{item.title}</span>
                  )
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
