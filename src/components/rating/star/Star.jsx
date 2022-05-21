import React, { useMemo } from 'react';
import styles from './Star.module.scss';
import StarIcon from '../starIcon/StarIcon';
import PropTypes from 'prop-types';

const Star = ({ index, rating, hoveredNumber, onMouseEnter, onMouseLeave, onSave }) => {
  const fill = useMemo(() => {
    if (hoveredNumber >= index) {
      return '#0074ef';
    } else if (!hoveredNumber && rating >= index) {
      return '#0074ef';
    }
    return 'none';
  }, [rating, hoveredNumber, index]);

  return (
    <div
      className={styles.stars}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onSave(index)}>
      <StarIcon fill={fill} />
    </div>
  );
};

Star.propTypes = {
  index: PropTypes.number,
  rating: PropTypes.number,
  hoveredNumber: PropTypes.number,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onSave: PropTypes.func
};

export default Star;
