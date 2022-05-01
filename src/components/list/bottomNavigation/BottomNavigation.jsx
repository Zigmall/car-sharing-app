import React from 'react';
import styles from './BottomNavigation.module.scss';
import DirectionArrow from '../arrows/DirectionArrow';
import PropTypes from 'prop-types';

const BottomNavigation = ({ currentIndex, numberOfPages, changePage }) => {
  const goToNumber = (number) => {
    if (number > 0 && number <= numberOfPages) {
      changePage(number);
    }
  };

  const goToDirection = (direction) => {
    switch (direction) {
      case 'left':
        currentIndex > 1 && changePage(currentIndex - 1);
        break;
      case 'right':
        currentIndex < numberOfPages && changePage(currentIndex + 1);
        break;

      case 'start':
        changePage(1);
        break;
      case 'end':
        changePage(numberOfPages);
        break;

      default:
        changePage(1);
        break;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.iconsGroup}>
        {currentIndex > 1 && <DirectionArrow direction="start" goToDirection={goToDirection} />}
        <DirectionArrow direction="left" goToDirection={goToDirection} />
        <div className={styles.numbers}>
          {currentIndex > 1 && (
            <DirectionArrow
              button={true}
              indexOfPage={currentIndex - 1}
              key={1}
              goToNumber={goToNumber}
            />
          )}
          {
            <div className={styles.blue}>
              <DirectionArrow
                button={true}
                indexOfPage={currentIndex}
                key={2}
                goToNumber={goToNumber}
              />
            </div>
          }
          {currentIndex < numberOfPages && (
            <DirectionArrow
              button={true}
              indexOfPage={currentIndex + 1}
              key={3}
              goToNumber={goToNumber}
            />
          )}
        </div>
        {<DirectionArrow direction="right" goToDirection={goToDirection} />}
        {currentIndex < numberOfPages && (
          <DirectionArrow direction="end" goToDirection={goToDirection} />
        )}
      </div>
    </div>
  );
};

BottomNavigation.propTypes = {
  currentIndex: PropTypes.number,
  numberOfPages: PropTypes.number,
  changePage: PropTypes.func
};

export default BottomNavigation;
