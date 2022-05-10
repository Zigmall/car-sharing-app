import React from 'react';
import styles from './TopBar.module.scss';

const Search = () => {
  return (
    <div className={styles.searchWrapper}>
      <label>
        <input type="text" placeholder="Search question" />
      </label>
    </div>
  );
};

export default Search;
