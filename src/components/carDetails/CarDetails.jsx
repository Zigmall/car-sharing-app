import React from 'react';
import { useParams } from 'react-router';
import styles from './CarDetails.module.scss';
import MiddleIcon from '../groupElement/MiddleIcon';
import { GearBox, Luggage, OpenDoorCar, AirConditioner } from '../assets/SvgList';
import Rating from '../rating/Rating';
import { useQuery } from '@apollo/client';
import ActionButtons from '../actionButton/ActionButtons';
import Comment from '../comment/Comment';
import { GET_CAR } from '../../queries/queries';
import NewComment from '../comment/NewComment';

const CarDetails = () => {
  const { carId } = useParams();
  const { loading, error, data } = useQuery(GET_CAR, {
    variables: { carId }
  });

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    console.log('error:', error.message);
    return <p>Could not load car...</p>;
  }
  const { car } = data;

  const sumOfAllPoints = 10;
  const numberOfVoters = 3;
  const overallRating = 3;
  const voted = true;

  const changeVoted = () => {};
  const changeNumberOfVoters = () => {};
  const changeOverallRating = () => {};
  const changeSumOfAllPoints = () => {};

  return !loading && !error ? (
    <div className={styles.carDetailsWrapper}>
      <div className={styles.topPicture}>
        <MiddleIcon model={'Regular'} />
      </div>
      <div className={styles.bottomWrapper}>
        <div className={styles.leftColumn}>
          <label>
            {car.brand.name} {car.model} {car.year}
          </label>
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
          <div className={styles.columns}>
            <div className={styles.lineOfIcons}>
              <div className={styles.informationElement}>
                <OpenDoorCar iconHeight={'25'} iconWidth={'25'} />
                <label>{`${car.property.doors} doors`}</label>
              </div>
              <div className={styles.informationElement}>
                <Luggage iconHeight={'25'} iconWidth={'25'} />
                <label>{`${car.property.trunk} bags`}</label>
              </div>
            </div>
            <div className={styles.lineOfIcons}>
              <div className={styles.informationElement}>
                <GearBox iconHeight={'25'} iconWidth={'25'} />
                <label>{car.property.manualGearBox ? 'Manual' : 'Automat'}</label>
              </div>
              <div className={styles.informationElement}>
                <AirConditioner iconHeight={'25'} iconWidth={'25'} />
                <label>{car.property.airConditioning ? '' : 'No'} Air Conditioning</label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <h3>Price €{car.price}</h3>
          <p>Location: {car.location}</p>
          <ActionButtons car={car} returnCar={false} />
        </div>
      </div>
      <div className={styles.review}>
        <h3>RATINGS AND COMMENTS</h3>
        <h3>RATING 5/5</h3>
        <h3>46 ratings</h3>
        {car.comments.map((comment) => (
          <Comment
            key={comment.id}
            createdAt={comment.createdAt}
            rating={comment.rating}
            text={comment.text}
            author={comment.user}
          />
        ))}
        <NewComment comments={car.comments} />
      </div>
    </div>
  ) : null;
};

export default CarDetails;
