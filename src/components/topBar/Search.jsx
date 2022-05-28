import React from 'react';
import styles from './TopBar.module.scss';

const Search = () => {
  return (
    <div className={styles.searchWrapper}>
      <label>
        <input type="text" placeholder="Search" />
      </label>
    </div>
  );
};

export default Search;
