import React, { useEffect, useState, useContext } from 'react';
import Star from './star/Star';
import styles from './Rating.module.scss';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/alertContext';

const Rating = ({
  sumOfAllPoints,
  voted,
  numberOfVoters,
  overallRating,
  changeSumOfAllPoints,
  changeVoted,
  changeNumberOfVoters,
  changeOverallRating
}) => {
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
      changeSumOfAllPoints(sumOfAllPoints + index);
      changeNumberOfVoters(numberOfVoters + 1);
      setAlert('Thank you for your vote.', 'info');
      changeVoted(true);
    } else {
      setAlert('You have already voted!', 'danger');
    }
  };

  useEffect(() => {
    changeOverallRating(
      isNaN(Math.round((sumOfAllPoints / numberOfVoters) * 10) / 10)
        ? 0
        : ((sumOfAllPoints / numberOfVoters) * 10) / 10
    );
  });

  return (
    <div className={styles.wrapper}>
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <Star
            key={index}
            index={index}
            rating={overallRating}
            hoveredNumber={hoveredNumber}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onSave={onSave}
          />
        );
      })}
      <div className={styles.counter}>
        <span>{overallRating.toFixed(1)}</span>
      </div>
    </div>
  );
};

Rating.propTypes = {
  voted: PropTypes.bool,
  changeVoted: PropTypes.func,
  sumOfAllPoints: PropTypes.number,
  changeSumOfAllPoints: PropTypes.func,
  numberOfVoters: PropTypes.number,
  changeNumberOfVoters: PropTypes.func,
  overallRating: PropTypes.number,
  changeOverallRating: PropTypes.func
};

export default Rating;
