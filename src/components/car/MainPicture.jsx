import React from 'react';
import styles from './Car.module.scss';
import PropTypes from 'prop-types';

const MainPicture = ({ picturePath: { url } }) => {
  return (
    <div className={styles.mainPictureWrapper}>
      <img src={url} alt="Car" className={styles.mainPicture} />
    </div>
  );
};

MainPicture.propTypes = {
  picturePath: PropTypes.object
};

export default MainPicture;
