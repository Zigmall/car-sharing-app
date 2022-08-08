import React, { useState, useContext } from 'react';
import Star from './star/Star';
import styles from './Rating.module.scss';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/alertContext';

const Rating = ({ voted, rating, changeRating = () => {} }) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const [hoveredNumber, setHoveredNumber] = useState(0);

  const onMouseEnter = (index) => {
    setHoveredNumber(index);
  };

  const onMouseLeave = () => {
    setHoveredNumber(0);
  };

  const onSave = (index) => {
    if (!voted) {
      changeRating(index);
    } else {
      setAlert('Action not allowed!', 'danger');
    }
  };

  return (
    <div className={styles.wrapper}>
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <Star
            key={index}
            index={index}
            rating={rating}
            hoveredNumber={hoveredNumber}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onSave={onSave}
          />
        );
      })}
      <div className={styles.counter}>
        <span>{rating.toFixed(1)}</span>
      </div>
    </div>
  );
};

Rating.propTypes = {
  voted: PropTypes.bool,
  rating: PropTypes.number,
  changeRating: PropTypes.func
};

export default Rating;
