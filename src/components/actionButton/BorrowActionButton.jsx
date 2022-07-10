import React, { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import styles from './ActionButtons.module.scss';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/alertContext';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_BORROWED_CARS } from '../../queries/queries';
import AuthContext from '../../context/auth/authContext';

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
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const userId = user && user.id;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [borrowCar, { loading }] = useMutation(BORROW_CAR, {
    variables: { carCopyId: availableCarCopy },
    onCompleted: () => {
      navigate('/');
      setAlert('You have successfully borrowed the car', 'info');
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
  availableCarCopy: PropTypes.string
};

export default BorrowActionButton;
