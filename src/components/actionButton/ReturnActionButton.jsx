import React, { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import styles from './ActionButtons.module.scss';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/alertContext';
// import { GET_ALL_BORROWED_CARS } from '../../queries/queries';

const RETURN_CAR = gql`
  mutation ReturnCarCopy($returnCarCopyId: ID!) {
    returnCarCopy(id: $returnCarCopyId) {
      id
      borrower {
        id
        borrowedCarCopies {
          id
          car {
            id
            carClass
            benefits
            model
            brand {
              name
            }
            year
            property {
              seats
              doors
              trunk
              airConditioning
              manualGearBox
            }
            location
            price
            copies {
              id
              borrower {
                id
              }
            }
          }
        }
      }
      id
      car {
        copies {
          id
          borrower {
            id
          }
        }
      }
    }
  }
`;

const ReturnActionButton = ({ borrowedCarCopy }) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [returnCar, { loading }] = useMutation(RETURN_CAR, {
    onCompleted: () => {
      setAlert('You have successfully returned car', 'info');
    },
    onError: (error) => {
      setAlert(error.message, 'danger');
      console.log(error);
    }
    // refetchQueries: [{ query: GET_ALL_BORROWED_CARS }]
  });

  return (
    <button
      className={styles.returnButton}
      disabled={loading}
      onClick={() => returnCar({ variables: { returnCarCopyId: borrowedCarCopy.id } })}>
      Return Car
    </button>
  );
};

ReturnActionButton.propTypes = {
  borrowedCarCopy: PropTypes.object
};

export default ReturnActionButton;