import React, { useState, useContext } from 'react';
import styles from './TopBar.module.scss';
import CarContext from '../../context/car/carContext';

const Search = () => {
  const carContext = useContext(CarContext);
  const { filterCarsBySearch } = carContext;

  const [search, setSearch] = useState('');
  const handleChanges = (e) => {
    setSearch(e.target.value);
    filterCarsBySearch(e.target.value);
  };
  return (
    <div className={styles.searchWrapper}>
      <label>
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleChanges}
          placeholder="Search"
        />
      </label>
    </div>
  );
};

export default Search;
