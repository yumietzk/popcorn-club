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

  return (
    <nav className={styles.navigation}>
      <ul className={styles.lists}>
        {SidebarData.map((item, index) => {
          return (
            <li className={styles.list} key={index}>
              <Link
                to={linkPath(item)}
                // to={item.path}
                className={`${styles['list-menu']} ${
                  !isDetail && selectedSidebar === item.title && styles.selected
                }`}
                onClick={() => setSelectedSidebar(item.title)}
              >
                <div className={styles['list-icon']}>{item.icon}</div>
                {!isCollapsed && (
                  <span className={styles['list-title']}>{item.title}</span>
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
