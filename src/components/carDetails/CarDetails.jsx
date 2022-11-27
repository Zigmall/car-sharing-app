import React from 'react';
import { useParams } from 'react-router';
import styles from './CarDetails.module.scss';
import MainPicture from '../car/MainPicture';
import { GearBox, Luggage, OpenDoorCar, AirConditioner } from '../assets/SvgList';
import Rating from '../rating/Rating';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Comment from '../comment/Comment';
import { GET_CAR } from '../../queries/queries';
import NewComment from '../comment/NewComment';

const CarDetails = () => {
  const { carId } = useParams();
  const voted = true;
  const { loading, error, data } = useQuery(GET_CAR, {
    variables: { carId }
  });

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className={styles.left__space}>
        <div className={styles.error__message}>
          <p>loading...</p>
        </div>
      </div>
    );
  }
  if (error) {
    console.log('error:', error.message);
    return <p>Could not load car...</p>;
  }
  const { car } = data;
  const sumOfAllPoints = car.comments.reduce((acc, curr) => acc + curr.rating, 0);
  const numberOfComments = car.comments.length;

  const overallRating = isNaN(Math.round((sumOfAllPoints / numberOfComments) * 10) / 10)
    ? 0
    : ((sumOfAllPoints / numberOfComments) * 10) / 10;

  return !loading && !error ? (
    <div className={styles.carDetailsWrapper}>
      <div className={styles.topPicture}>
        <MainPicture picturePath={car.picturePath.url} />
      </div>
      <div className={styles.bottomWrapper}>
        <div className={styles.leftColumn}>
          <label>
            {car.brand.name} {car.model} {car.year}
          </label>
          <Rating voted={voted} rating={overallRating} />
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
          <button onClick={() => navigate(`/book-car/${car.id}`)} className={styles.button}>
            Book
          </button>
        </div>
      </div>
      <div className={styles.review}>
        <h3>RATINGS AND COMMENTS</h3>
        <h3>{`${car.comments.length} ratings`}</h3>
        {car.comments.map((comment) => (
          <Comment
            key={comment.id}
            createdAt={comment.createdAt}
            rating={comment.rating}
            text={comment.text}
            author={comment.user}
          />
        ))}
        <NewComment comments={car.comments} carId={carId} />
      </div>
    </div>
  ) : null;
};

export default CarDetails;
