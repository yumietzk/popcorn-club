import React, { useState } from 'react';
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

  const onItemClick = (e, item) => {
    if (group === 'order') {
      if (selectedItem[`${group}`] === item.title) {
        if (item.title === 'Title') {
          setIsAscend({ ...isAscend, title: !isAscend.title });
        } else if (item.title === 'Release Date') {
          setIsAscend({ ...isAscend, releaseDate: !isAscend.releaseDate });
        } else if (item.title === 'Rating') {
          setIsAscend({ ...isAscend, rating: !isAscend.rating });
        }
      }
    }

    if (!item.subCategory) {
      setSelectedItem({ ...selectedItem, [`${group}`]: item.title });
      setIsOpen({ ...isOpen, [`${group}`]: !isOpen[`${group}`] });
    } else {
      setIsSubOpen(!isSubOpen);
    }

    e.stopPropagation();
  };

  const onSubItemClick = (genre) => {
    setSelectedItem({ ...selectedItem, [`${group}`]: genre.name });
    setIsOpen({ ...isOpen, [`${group}`]: !isOpen[`${group}`] });
  };

  const showIcon = (title) => {
    const condition =
      title === 'Title'
        ? isAscend.title
        : title === 'Release Date'
        ? isAscend.releaseDate
        : title === 'Rating'
        ? isAscend.rating
        : null;

    const orderArrow = condition ? (
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
          onClick={(e) => onItemClick(e, item)}
        >
          {item.title}
          <span className={styles['check-icon']}>
            {group === 'order'
              ? showIcon(item.title)
              : selectedItem[`${group}`] === item.title && showIcon(item.title)}
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
  );
};

export default Selector;
