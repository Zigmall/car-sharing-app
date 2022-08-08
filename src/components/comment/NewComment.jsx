import React, { useState } from 'react';
import Rating from '../rating/Rating';
import styles from './Comment.module.scss';
import PropTypes from 'prop-types';

const NewComment = ({ comments }) => {
  const [comment, setComment] = useState('');
  console.log(comments);
  // const sumPoints = comments.reduce((acc, curr) => acc + curr.rating, 0);

  const [sumOfAllPoints, changeSumOfAllPoints] = useState(0);
  const [numberOfVoters, changeNumberOfVoters] = useState(0);
  const [overallRating, changeOverallRating] = useState(0);
  const [voted, changeVoted] = useState(false);

  console.log('overal', overallRating);
  return (
    <div className={styles.comment__wrapper}>
      <div className={styles.comment__border}>
        <h3>Rate this car</h3>
        <Rating
          sumOfAllPoints={sumOfAllPoints}
          voted={voted}
          numberOfVoters={numberOfVoters}
          overallRating={overallRating}
          changeSumOfAllPoints={changeSumOfAllPoints}
          changeVoted={changeVoted}
          changeNumberOfVoters={changeNumberOfVoters}
          changeOverallRating={changeOverallRating}
        />
        <textarea
          onChange={(e) => setComment(e.target.value)}
          className={styles.comment__textarea}
          name="comment"
          value={comment}
          placeholder="Type your comment here"
          required
        />
        <div className={styles.button__wrapper}>
          <button className={styles.comment__button}>Send comment</button>
        </div>
      </div>
    </div>
  );
};

NewComment.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object)
};

export default NewComment;
