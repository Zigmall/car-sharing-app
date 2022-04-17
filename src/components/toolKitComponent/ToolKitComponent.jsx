import Rating from '../rating/Rating';
import React, { useState } from 'react';

const ToolKitComponent = () => {
  const [sumOfAllPoints, changeSumOfAllPoints] = useState(4);
  const [voted, changeVoted] = useState(false);
  const [numberOfVoters, changeNumberOfVoters] = useState(1);
  const [overallRating, changeOverallRating] = useState(4);

  return (
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
  );
};

export default ToolKitComponent;
