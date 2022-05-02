import React from 'react';
import styles from './TopBar.module.scss';
import Search from './Search';
import UserGroup from './UserGroup';

const TopBar = (props) => {
  return (
    <div className={styles.topBarWrapper} title={'topBar'}>
      <Search />
      <UserGroup {...props} />
    </div>
  );
};

export default TopBar;
