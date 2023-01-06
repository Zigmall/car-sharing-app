import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './AllCars.module.scss';
import { GET_BRANDS } from '../../queries/queries';
import { useMutation } from '@apollo/client';
import { DELETE_CAR } from '../../mutations/mutations';
import AlertContext from '../../context/alert/alertContext';

const CarRow = ({ car: { picturePath, brand, model, id } }) => {
  const navigate = useNavigate();
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const handleEdit = (id) => {
    navigate(`/edit-car/${id}`);
  };

  const handleDelete = (id) => {
    const txt = 'Are you sure you want to delete this car?';
    confirm(txt) && deleteCar({ variables: { carId: id } });
  };

  const [deleteCar] = useMutation(DELETE_CAR, {
    onCompleted: ({ deleteCar: { success, message } }) => {
      if (success) {
        setAlert('Car deleted successfully', 'success');
      } else {
        setAlert('Something went wrong', 'danger');
        console.log('error:', message);
      }
    },
    onError: (error) => {
      console.log('error:', error.message);
    },
    refetchQueries: [{ query: GET_BRANDS }]
  });

  return (
    <>
      {id && (
        <tr>
          <td>
            <div className={styles.spallPictureWrapper}>
              <img src={picturePath.url} alt="Car" className={styles.spallPicture} />
            </div>
          </td>
          <td>{`${brand.name} ${model}`}</td>
          <td>{id}</td>
          <td>Status</td>
          <td>
            <button
              onClick={() => handleEdit(id)}
              className={[styles.button__wrapper, styles.button__update].join(' ')}>
              Update Car
            </button>
          </td>
          <td>
            <button
              onClick={() => handleDelete(id)}
              className={[styles.button__wrapper, styles.button__cancelBooking].join(' ')}>
              Delete Car
            </button>
          </td>
        </tr>
      )}
    </>
  );
};

CarRow.propTypes = {
  car: PropTypes.object,
  model: PropTypes.string,
  id: PropTypes.string
};

export default CarRow;
