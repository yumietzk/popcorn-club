import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarData from './data/SidebarData';
import styles from './Sidebar.module.css';

const Sidebar = ({ selectedSidebar, setSelectedSidebar, isCollapsed }) => {
  // const [selectedItem, setSelectedItem] = useState('Home');

  return (
    <nav className={styles.navigation}>
      <ul className={styles.lists}>
        {SidebarData.map((item, index) => {
          return (
            <li className={styles.list} key={index}>
              <Link
                to={item.path}
                className={`${styles['list-menu']} ${
                  selectedSidebar === item.title && styles.selected
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
