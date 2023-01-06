import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import styles from './ActionButtons.module.scss';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/alertContext';
import { RETURN_CAR } from '../../mutations/mutations';
import AuthContext from '../../context/auth/authContext';
import { GET_ALL_BORROWED_CARS } from '../../queries/queries';

const ReturnActionButton = ({ car }) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [returnCar, { loading }] = useMutation(RETURN_CAR, {
    onCompleted: ({ returnCar: { message } }) => {
      setAlert(message, 'success');
    },

    onError: (error) => {
      setAlert(error.message, 'danger');
      console.log(error);
    },
    refetchQueries: [{ query: GET_ALL_BORROWED_CARS, variables: { userId: user.id } }]
  });

  return (
    <button
      className={styles.returnButton}
      disabled={loading}
      onClick={() => returnCar({ variables: { returnCarId: car.id } })}>
      Return Car
    </button>
  );
};

ReturnActionButton.propTypes = {
  car: PropTypes.object
};

export default ReturnActionButton;
