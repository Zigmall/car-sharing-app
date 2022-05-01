import React from 'react';
import PropTypes from 'prop-types';
import styles from '../bottomNavigation/BottomNavigation.module.scss';

const DirectionArrow = ({ direction, goToNumber, goToDirection, button, indexOfPage }) => {
  let icon = '';

  switch (direction) {
    case 'left':
      icon = 'M10 19l-7-7m0 0l7-7m-7 7h18';
      break;
    case 'right':
      icon = 'M14 5l7 7m0 0l-7 7m7-7H3';
      break;

    case 'start':
      icon = 'M11 19l-7-7 7-7m8 14l-7-7 7-7';
      break;
    case 'end':
      icon = 'M13 5l7 7-7 7M5 5l7 7-7 7';
      break;

    default:
      icon = 'M10 19l-7-7m0 0l7-7m-7 7h18';
      break;
  }

  return (
    <div className={styles.iconButton}>
      {!button && (
        <svg
          onClick={() => goToDirection(direction)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      )}
      {button && <button onClick={() => goToNumber(indexOfPage)}>{indexOfPage}</button>}
    </div>
  );
};

DirectionArrow.propTypes = {
  direction: PropTypes.string,
  goToNumber: PropTypes.func,
  button: PropTypes.bool,
  indexOfPage: PropTypes.number,
  goToDirection: PropTypes.func
};

export default DirectionArrow;
