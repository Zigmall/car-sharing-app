import React, { useState } from 'react';
import styles from './Comment.module.scss';

const Comment = () => {
  const [comment, setComment] = useState('');
  return (
    <div className={styles.comment__wrapper}>
      <textarea
        onChange={(event) => setComment(event.target.value)}
        className={styles.comment__wrapper}
        name="comment"
        value={comment}
        placeholder="Type your comment here"
        required
      />
    </div>
  );
};

export default Comment;
