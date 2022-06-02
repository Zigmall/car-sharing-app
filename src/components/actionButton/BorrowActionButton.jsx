import React, { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import styles from './ActionButton.module.scss';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/alertContext';
import { useNavigate } from 'react-router-dom';

const BORROW_CAR = gql`
  mutation BorrowCarCopy($carCopyId: ID!) {
    borrowCarCopy(id: $carCopyId) {
      id
      borrower {
        borrowedCarCopies {
          id
          car {
            copies {
              id
            }
          }
        }
      }
    }
  }
`;

const BorrowActionButton = ({ availableCarCopy }) => {
  const navigate = useNavigate();
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [borrowCar, { loading }] = useMutation(BORROW_CAR, {
    variables: { carCopyId: availableCarCopy },
    onCompleted: () => {
      navigate('/');
      // window.location.reload();
      setAlert('You have successfully borrowed the car', 'info');
    },
    onError: (error) => {
      setAlert(error.message, 'danger');
    }
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
  availableCarCopy: PropTypes.string
};

export default BorrowActionButton;
