import React, { useContext } from 'react';
import BorrowActionButton from './BorrowActionButton';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/alertContext';

const ActionButtons = ({ carCopy }) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const canBorrow = !!carCopy.copies.filter((car) => car.borrower === null).length > 0;
  //   const canReturn = !carCopy.borrower;
  setAlert('Temporary unavailable', 'info');

  //   useEffect(() => {
  //     if (carCopy.copies.filter((car) => car.borrower === null).length < 1) {
  //     }
  //   }, []);
  return (
    <div>
      {canBorrow && (
        <BorrowActionButton
          availableCarCopy={carCopy.copies.filter((car) => car.borrower === null)[0].id}
        />
      )}
    </div>
  );
};

ActionButtons.propTypes = {
  carCopy: PropTypes.object
};

export default ActionButtons;
