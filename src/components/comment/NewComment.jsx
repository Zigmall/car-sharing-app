import React, { useState, useContext, useEffect } from 'react';
import Rating from '../rating/Rating';
import styles from './Comment.module.scss';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/alertContext';
// import AuthContext from '../../context/auth/authContext';
import { CREATE_COMMENT, UPDATE_RENT_AFTER_COMMENT } from '../../mutations/mutations';
import { GET_CAR, GET_RENTS_BY_RENTER_ID } from '../../queries/queries';
import { useMutation, useQuery } from '@apollo/client';

const NewComment = ({ car, user }) => {
  const carId = car.id;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const [comment, setComment] = useState('');
  const [rating, changeRating] = useState(0);
  const [rentId, setRentId] = useState('');
  const voted = false;

  const checkIfUserIsAllowedToComment = (userRentList) => {
    if (userRentList === null || userRentList === undefined) {
      return [];
    }
    if (userRentList.length > 0) {
      return userRentList.filter(
        (rent) =>
          rent.car.brand.name === car.brand.name &&
          rent.car.model === car.model &&
          rent.rated === false
      );
    } else {
      return [];
    }
  };

  const { loading, error, data } = useQuery(GET_RENTS_BY_RENTER_ID, {
    variables: { renterId: user.id }
  });

  const handleSendComment = (e) => {
    e.preventDefault();
    if (user === null || user === undefined || user.id === null || user.id === undefined) {
      setAlert('You need to be logged in to comment', 'danger');
    } else if (comment === '') {
      setAlert('Comment cannot be empty', 'danger');
    } else if (rating === 0) {
      setAlert('You need to rate car', 'warning');
    } else {
      const input = {
        text: comment,
        userId: user.id,
        carId,
        rating
      };

      createComment({ variables: { input } });
    }
  };

  const [createComment] = useMutation(CREATE_COMMENT, {
    onCompleted: ({ createComment }) => {
      const { success, message } = createComment;
      if (success) {
        setAlert(message, 'success');
        setComment('');
        changeRating(0);
        const input = {
          id: rentId,
          rated: true
        };
        updateRentAfterComment({ variables: { input } });
        console.log('input', input);
      }
    },
    onError: (error) => {
      setAlert(error.message, 'danger');
    },
    refetchQueries: [{ query: GET_CAR, variables: { carId } }]
  });

  const [updateRentAfterComment] = useMutation(UPDATE_RENT_AFTER_COMMENT, {
    onCompleted: ({ updateRent }) => {
      const { success, message } = updateRent;
      console.log(success, message);
    },
    onError: (error) => {
      console.log(error.message);
    },
    refetchQueries: [{ query: GET_RENTS_BY_RENTER_ID, variables: { renterId: user.id } }]
  });

  useEffect(() => {
    if (data) {
      const filteredRentList = checkIfUserIsAllowedToComment(data.getRentsByRenterId);
      console.log('filteredRentList', filteredRentList);
      if (filteredRentList.length > 0) {
        setRentId(filteredRentList[0].id);
      }
    }
  }, [data]);

  if (loading) return;
  <div className={styles.left__space}>
    <div className={styles.error__message}>
      <p>loading...</p>
    </div>
  </div>;
  if (error)
    return (
      <div className={styles.left__space}>
        <div className={styles.error__message}>
          <p>loading...</p>
        </div>
      </div>
    );

  console.log('rentId', rentId);
  console.log('rentId.length === 0', rentId.length === 0);
  console.log('!rentId', !rentId);
  if (!rentId || rentId.length === 0) {
    return (
      <div className={styles.left__space}>
        <div className={styles.comment__replacement}>
          <h1>You need to rent this car to comment</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.comment__wrapper}>
      <div className={styles.comment__border}>
        <h3>Rate this car</h3>
        <Rating voted={voted} rating={rating} changeRating={changeRating} />
        <textarea
          onChange={(e) => setComment(e.target.value)}
          className={styles.comment__textarea}
          name="comment"
          value={comment}
          placeholder="Type your comment here"
          required
        />
        <div className={styles.button__wrapper}>
          <button onClick={(e) => handleSendComment(e)} className={styles.comment__button}>
            Send comment
          </button>
        </div>
      </div>
    </div>
  );
};

NewComment.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  car: PropTypes.object,
  user: PropTypes.object
};

export default NewComment;
