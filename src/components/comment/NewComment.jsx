import React, { useState, useContext } from 'react';
import Rating from '../rating/Rating';
import styles from './Comment.module.scss';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { CREATE_COMMENT } from '../../mutations/mutations';
import { GET_CAR } from '../../queries/queries';
import { useMutation } from '@apollo/client';

const NewComment = ({ carId }) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [comment, setComment] = useState('');
  const [rating, changeRating] = useState(0);
  const voted = false;

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
      }
    },
    onError: (error) => {
      setAlert(error.message, 'danger');
    },
    refetchQueries: [{ query: GET_CAR, variables: { carId } }]
  });

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
  carId: PropTypes.string
};

export default NewComment;
