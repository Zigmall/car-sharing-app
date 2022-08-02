import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import styles from './ActionButtons.module.scss';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/alertContext';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_BORROWED_CARS } from '../../queries/queries';
import AuthContext from '../../context/auth/authContext';
import CarContext from '../../context/car/carContext';
import { BORROW_CAR } from '../../mutations/mutations';

const BorrowActionButton = ({ carId }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const userId = user && user.id;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const carContext = useContext(CarContext);
  const { changeTab } = carContext;

  const [borrowCar, { loading }] = useMutation(BORROW_CAR, {
    variables: { borrowCarId: carId },
    onCompleted: ({ borrowCar: { success, message } }) => {
      changeTab(1);
      navigate('/');
      success ? setAlert(message, 'success') : setAlert(message, 'warning');
    },
    onError: (error) => {
      setAlert(error.message, 'danger');
    },
    refetchQueries: [{ query: GET_ALL_BORROWED_CARS, variables: { userId: userId } }]
  });
  return (
    <div className={styles.orderButton}>
      <button disabled={loading} onClick={() => borrowCar()}>
        Order
      </button>
    </div>
  );
};

BorrowActionButton.propTypes = {
  carId: PropTypes.string
};

export default BorrowActionButton;
