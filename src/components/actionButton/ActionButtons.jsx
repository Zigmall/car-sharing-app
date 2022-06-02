import React, { useContext, useEffect } from 'react';
import BorrowActionButton from './BorrowActionButton';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/alertContext';
import ReturnActionButton from './ReturnActionButton';

const ActionButtons = ({ carCopy, returnCar }) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  let availableCopies = null;
  let canBorrow = null;
  if (!returnCar) {
    availableCopies = carCopy.copies.filter((car) => car.borrower === null);
    canBorrow = !!availableCopies.length > 0;
  }

  //   const canReturn = !carCopy.borrower;
  // const carsToReturn =

  useEffect(() => {
    if (availableCopies !== null && availableCopies.length === 0 && !returnCar) {
      setAlert('Car temporary unavailable', 'danger');
    }
  }, []);
  return (
    <div>
      {canBorrow && <BorrowActionButton availableCarCopy={availableCopies[0].id} />}
      {returnCar && <ReturnActionButton borrowedCarCopy={carCopy} />}
    </div>
  );
};

ActionButtons.propTypes = {
  carCopy: PropTypes.object,
  returnCar: PropTypes.bool
};

export default ActionButtons;
