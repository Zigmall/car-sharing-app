import React from 'react';
import PropTypes from 'prop-types';
import styles from './GroupElement.module.scss';

const InfoIcon = ({ icon }) => {
  console.log(icon);
  let infoIcon = null;
  switch (icon) {
    case 'passengers':
      infoIcon =
        'M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z';
      break;
    case 'luggage':
      infoIcon =
        'M720.9,286.2H600.2V101.7h74.7v-40H349.1v40h74.7v184.5H303.1c-32,0-58,26-58,58v534.4c0,32,26,58,58,58  h56.7v25.6h40v-25.6h224.5v25.6h40v-25.6h56.7c32,0,58-26,58-58V344.2C778.9,312.2,752.9,286.2,720.9,286.2z M463.8,101.7h96.5  v184.5h-96.5V101.7z M435.8,443.8h152.3v40H435.8V443.8z M635.6,794.5H388.4v-182h247.2V794.5z';
      break;
    default:
      infoIcon =
        'M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z';
      break;
  }

  return (
    <div className={styles.infoIcon}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="#707070"
        viewBox={icon === 'passengers' ? '0 0 24 24' : '0 0 1024 1024'}
        stroke="currentColor"
        strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={infoIcon} />
      </svg>
    </div>
  );
};

InfoIcon.propTypes = {
  icon: PropTypes.string
};

export default InfoIcon;
