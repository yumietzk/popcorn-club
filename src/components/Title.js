import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as RiIcons from 'react-icons/ri';
import * as BiIcons from 'react-icons/bi';
// import LoadingIndicator from '../helpers/LoadingIndicator';
import SelectorsData from './data/SelectorsData';
import Selector from './UI/Selector/Selector';
import styles from './Title.module.css';

const Title = ({
  genres,
  selectedItem,
  setSelectedItem,
  isAscend,
  setIsAscend,
  type,
  setIsChangeSelection,
  isDetail,
  person,
  isFetching,
  isError,
}) => {
  const [currentGroup, setCurrentGroup] = useState('');
  const [isOpen, setIsOpen] = useState({
    category: false,
    order: false,
    count: false,
  });

  let navigate = useNavigate();

  const handleCategoryOpen = () => {
    setCurrentGroup('category');
    setIsOpen({ category: !isOpen.category, order: false, count: false });
  };

  const handleOrderOpen = () => {
    setCurrentGroup('order');
    setIsOpen({ category: false, order: !isOpen.order, count: false });
  };

  const handleCountOpen = () => {
    setCurrentGroup('count');
    setIsOpen({ category: false, order: false, count: !isOpen.count });
  };

  const renderType = () => {
    if (type === 'movies') {
      return 'Movies';
    } else if (type === 'tvshows') {
      return 'TV Shows';
    } else if (type === 'person') {
      if (isFetching || !person) {
        return null;
      }
      if (isError?.status) {
        return null;
      }
      if (person) {
        return person.name;
      }
    }
  };

  const renderBackBtn = () => {
    if (isDetail || type === 'person') {
      return (
        <button className={styles['back-btn']} onClick={() => navigate(-1)}>
          <BiIcons.BiArrowBack />
        </button>
      );
    }
  };

  const clearAll = () => {
    setSelectedItem({
      category: SelectorsData[type].category[0].title,
      order: SelectorsData[type].order[0].title,
      count: SelectorsData[type].count[0].title,
    });

    setIsAscend({
      title: true,
      releaseDate: false,
      rating: false,
    });

    navigate(`/${type === 'movies' ? 'movies' : 'tvshows'}`);
  };

  const renderClearBtn = () => {
    if (isDetail || type === 'person') return;

    if (
      selectedItem?.category !== SelectorsData[type].category[0].title ||
      selectedItem?.order !== SelectorsData[type].order[0].title ||
      selectedItem?.count !== SelectorsData[type].count[0].title ||
      !isAscend.title ||
      isAscend.releaseDate ||
      isAscend.rating
    ) {
      return (
        type !== 'person' &&
        !isDetail && (
          <button className={styles.clear} onClick={clearAll}>
            <RiIcons.RiCloseFill className={styles['clear-icon']} />
          </button>
        )
      );
    }
  };

  return (
    <div className={styles.title}>
      <div className={styles['title-name']}>
        {renderType()}
        {renderBackBtn()}
      </div>

      {type === 'person' && !isFetching && !isError?.status && person && (
        <div className={styles['person-sub']}>
          {!person.birthday && !person.place_of_birth ? null : (
            <span>Born: </span>
          )}
          {person.birthday ? person.birthday.replaceAll('-', '/') : null}
          {person.place_of_birth && <span> in </span>}
          {person.place_of_birth}
        </div>
      )}

      {type !== 'person' && !isDetail && (
        <div className={styles['selector-btns']}>
          <button
            className={styles['selector-btn']}
            onClick={handleCategoryOpen}
          >
            {selectedItem.category}
            <span className={styles['down-icon']}>
              {isOpen.category ? (
                <RiIcons.RiArrowUpSFill />
              ) : (
                <RiIcons.RiArrowDownSFill />
              )}
            </span>

            {isOpen.category && (
              <ul
                className={`${styles['lists-item']} ${styles['lists-category']}`}
              >
                {SelectorsData[type].category.map((item, i) => {
                  return (
                    <Selector
                      genres={genres}
                      currentGroup={currentGroup}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      setIsChangeSelection={setIsChangeSelection}
                      group="category"
                      item={item}
                      key={i}
                    />
                  );
                })}
              </ul>
            )}
          </button>

          <button className={styles['selector-btn']} onClick={handleOrderOpen}>
            By {selectedItem.order}
            <span className={styles['down-icon']}>
              {isOpen.order ? (
                <RiIcons.RiArrowUpSFill />
              ) : (
                <RiIcons.RiArrowDownSFill />
              )}
            </span>
            {isOpen.order && (
              <ul
                className={`${styles['lists-item']} ${styles['lists-order']}`}
              >
                {SelectorsData[type].order.map((item, i) => {
                  return (
                    <Selector
                      currentGroup={currentGroup}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      isAscend={isAscend}
                      setIsAscend={setIsAscend}
                      group="order"
                      item={item}
                      key={i}
                    />
                  );
                })}
              </ul>
            )}
          </button>

          <button className={styles['selector-btn']} onClick={handleCountOpen}>
            {selectedItem.count}
            <span className={styles['down-icon']}>
              {isOpen.count ? (
                <RiIcons.RiArrowUpSFill />
              ) : (
                <RiIcons.RiArrowDownSFill />
              )}
            </span>

            {isOpen.count && (
              <ul
                className={`${styles['lists-item']} ${styles['lists-count']}`}
              >
                {SelectorsData[type].count.map((item, i) => {
                  return (
                    <Selector
                      currentGroup={currentGroup}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      group="count"
                      item={item}
                      key={i}
                    />
                  );
                })}
              </ul>
            )}
          </button>
        </div>
      )}

      {renderClearBtn()}
    </div>
  );
};

export default Title;
