import React from 'react';
import styles from './Car.module.scss';
import PropTypes from 'prop-types';

const MainPicture = ({ picturePath: { url } }) => {
  console.log(url);
  return (
    <div className={styles.mainPictureWrapper}>
      <img src={url} alt="car 123" className={styles.mainPicture} />
    </div>
  );
};

MainPicture.propTypes = {
  picturePath: PropTypes.object
};

export default MainPicture;
