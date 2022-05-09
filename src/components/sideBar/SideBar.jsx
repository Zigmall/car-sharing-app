import React from 'react';
import styles from './SideBar.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SideBar = ({ setColorOnSideBarIcon, sideBarIndex }) => {
  const userMenuArray = [
    {
      label: 'Dashboard',
      icon: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z'
    },
    {
      label: 'Highest rated',
      icon: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
    },
    {
      label: 'Most popular',
      icon: 'M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z'
    }
  ];

  return (
    <div className={styles.sideBarWrapper}>
      <div className={styles.sideBar}>
        {userMenuArray.map((element, index) => (
          <Link key={index} to={element.label === 'Groups' ? '/groups' : '/'} title={element.label}>
            <div
              className={styles.menuElement}
              onClick={() => setColorOnSideBarIcon(index + 1, element.label)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={index + 1 === sideBarIndex ? styles.blue : undefined}
                viewBox="0 0 20 20">
                <path fillRule="evenodd" clipRule="evenodd" d={element.icon} />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

SideBar.propTypes = {
  setColorOnSideBarIcon: PropTypes.func,
  sideBarIndex: PropTypes.number
};

export default SideBar;
