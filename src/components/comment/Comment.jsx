import React from 'react';
import styles from './Comment.module.scss';
import Rating from '../rating/Rating';
import PropTypes from 'prop-types';

const Comment = ({ createdAt, rating, text, author }) => {
  const sumOfAllPoints = rating;
  const numberOfVoters = 1;
  const overallRating = rating;
  const voted = true;

  const changeVoted = () => {};
  const changeNumberOfVoters = () => {};
  const changeOverallRating = () => {};
  const changeSumOfAllPoints = () => {};

  return (
    <div className={styles.comment__wrapper}>
      <div className={styles.comment__border}>
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
        <div className={styles.reviewer__details}>
          <p className={styles.name}>{`${author.firstName} ${author.lastName}`}</p>
          <p className={styles.date}>{createdAt}</p>
        </div>
        <div className={styles.comment__content}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  createdAt: PropTypes.string,
  rating: PropTypes.number,
  text: PropTypes.string,
  author: PropTypes.object
};

export default Comment;
