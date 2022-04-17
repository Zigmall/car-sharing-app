import React from 'react';
import PropTypes from 'prop-types';
import styles from './CarGroup.module.scss';

const InfoIcon = ({ icon }) => {
  switch (icon) {
    case 'users':
      icon =
        'M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z';
      break;
    case 'right':
      icon = 'trunk';
      break;
    default:
      icon =
        'M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z';
      break;
  }

  return (
    <div className={styles.iconButton}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
    </div>
  );
};

InfoIcon.propTypes = {
  icon: PropTypes.string
};

export default InfoIcon;
