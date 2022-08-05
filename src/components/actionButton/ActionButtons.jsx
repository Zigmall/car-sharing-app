import React from 'react';
import BorrowActionButton from './BorrowActionButton';
import PropTypes from 'prop-types';
import ReturnActionButton from './ReturnActionButton';

const ActionButtons = ({ car, returnCar }) => {
  console.log(car);

  return (
    <div>
      {!returnCar && <BorrowActionButton carId={car.id} />}
      {returnCar && <ReturnActionButton car={car} />}
    </div>
  );
};

ActionButtons.propTypes = {
  car: PropTypes.object,
  returnCar: PropTypes.bool
};

export default ActionButtons;
