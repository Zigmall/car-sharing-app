import React from 'react';
import styles from './Car.module.scss';
import PropTypes from 'prop-types';

const MainPicture = ({ picturePath }) => {
  return (
    <div className={styles.mainPictureWrapper}>
      <img src={picturePath} alt="Car" className={styles.mainPicture} />
    </div>
  );
};

MainPicture.propTypes = {
  picturePath: PropTypes.string
};

export default MainPicture;
