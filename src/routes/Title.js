import React, { useState } from 'react';
import * as RiIcons from 'react-icons/ri';
import SelectorsData from '../components/data/SelectorsData';
import Selector from '../components/UI/Selector/Selector';
import styles from './Title.module.css';

const Title = ({
  genres,
  selectedItem,
  setSelectedItem,
  isAscend,
  setIsAscend,
  type,
  isDetail,
}) => {
  const [currentGroup, setCurrentGroup] = useState('');
  const [isOpen, setIsOpen] = useState({
    category: false,
    order: false,
    count: false,
  });

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

  return (
    <div className={styles.title}>
      <div className={styles['title-name']}>
        {type === 'movies' ? 'Movies' : 'TV Shows'}
      </div>

      {!isDetail && (
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
          </button>
        </div>
      )}

      {/* このポジションについては、各ボタンをrelativeとしてtop,leftを合わせたいが、下のグリッドの上にこさせたいので、fixedとするべき？ */}
      {isOpen.category && (
        <ul className={styles['list-items']} style={{ left: '3.7rem' }}>
          {SelectorsData[type].category.map((item, i) => {
            return (
              <Selector
                genres={genres}
                currentGroup={currentGroup}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                isAscend={isAscend}
                setIsAscend={setIsAscend}
                group="category"
                item={item}
                key={i}
              />
            );
          })}
        </ul>
      )}
      {isOpen.order && (
        <ul className={styles['list-items']} style={{ left: '10rem' }}>
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
      {isOpen.count && (
        <ul
          className={styles['list-items']}
          style={{ left: '19.5rem', width: '10rem' }}
        >
          {SelectorsData[type].count.map((item, i) => {
            return (
              <Selector
                currentGroup={currentGroup}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                isAscend={isAscend}
                setIsAscend={setIsAscend}
                group="count"
                item={item}
                key={i}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Title;
