import React, { useState } from 'react';
import Rating from '../rating/Rating';
import styles from './Comment.module.scss';

const NewComment = () => {
  const [comment, setComment] = useState('');

  const sumOfAllPoints = 10;
  const numberOfVoters = 3;
  const overallRating = 3;
  const voted = true;

  const changeVoted = () => {};
  const changeNumberOfVoters = () => {};
  const changeOverallRating = () => {};
  const changeSumOfAllPoints = () => {};

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

export default NewComment;
