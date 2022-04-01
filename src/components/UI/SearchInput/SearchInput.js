import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as IoIcons from 'react-icons/io';
import styles from './SearchInput.module.css';

const SearchInput = () => {
  const [term, setTerm] = useState('');
  const ref = useRef();
  const navigate = useNavigate();

  const onSearchTerm = (e) => {
    e.preventDefault();

    if (term.trim().length === 0) return;

    navigate(`/search/${term}`);

    setTerm('');
    ref.current.blur();
  };

  return (
    <form className={styles['search-form']} onSubmit={onSearchTerm}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        ref={ref}
      />
      <button className={styles.btn}>
        <IoIcons.IoIosSearch className={styles['btn-icon']} />
      </button>
    </form>
  );
};

export default SearchInput;
