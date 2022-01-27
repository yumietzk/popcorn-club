import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import styles from './Selector.module.css';

const Selector = ({
  genres,
  currentGroup,
  isOpen,
  setIsOpen,
  selectedItem,
  setSelectedItem,
  isAscend,
  setIsAscend,
  group,
  item,
}) => {
  const [isSubOpen, setIsSubOpen] = useState(false);

  const onItemClick = (item) => {
    if (group === 'order') setIsAscend(!isAscend);

    if (!item.subCategory) {
      setSelectedItem({ ...selectedItem, [`${group}`]: item.title });
      setIsOpen({ ...isOpen, [`${group}`]: !isOpen[`${group}`] });
    } else {
      setIsSubOpen(!isSubOpen);
    }
  };

  const onSubItemClick = (genre) => {
    setSelectedItem({ ...selectedItem, [`${group}`]: genre.name });
    setIsOpen({ ...isOpen, [`${group}`]: !isOpen[`${group}`] });
  };

  const showIcon = () => {
    const orderArrow = isAscend ? (
      <RiIcons.RiArrowUpFill />
    ) : (
      <RiIcons.RiArrowDownFill />
    );
    return group === 'order' ? orderArrow : <FaIcons.FaCheck />;
  };

  if (!currentGroup === group) return;

  return (
    <React.Fragment>
      <li>
        <Link
          to={`${item.path}`}
          className={`${styles['item-link']} ${
            selectedItem[`${group}`] === item.title && styles.selected
          }`}
          onClick={() => onItemClick(item)}
        >
          {item.title}
          <span className={styles['check-icon']}>
            {selectedItem[`${group}`] === item.title && showIcon()}
          </span>
        </Link>

        {isSubOpen && (
          <ul className={styles.subitems}>
            {genres.map((genre, i) => {
              return (
                <li key={i}>
                  <Link
                    to={`genre/${genre.name.toLowerCase()}`}
                    className={`${styles['subitem-link']} ${
                      selectedItem[`${group}`] === genre.name && styles.selected
                    }`}
                    onClick={() => onSubItemClick(genre)}
                  >
                    {genre.name}
                    <span className={styles['subCheck-icon']}>
                      {selectedItem[`${group}`] === genre.name && (
                        <FaIcons.FaCheck />
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    </React.Fragment>
    // <RiIcons.RiArrowUpFill/> ascend
    // <RiIcons.RiArrowDownFill/> descend
  );
};

export default Selector;
