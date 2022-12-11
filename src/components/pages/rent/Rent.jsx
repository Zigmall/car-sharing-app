import { useContext, useState } from 'react';
import styles from './Rent.module.scss';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { GET_BOOKING_BY_ID } from '../../../queries/queries';
import AuthContext from '../../../context/auth/authContext';
import EditUserForm from '../../editUserForm/EditUserForm';
import { useEffect } from 'react';

const Rent = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { userId } = useParams();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const deposit = 200;
  const insuranceTable = {
    Silver: 0.3,
    Premium: 0.6,
    EU: 1.1
  };

  const { loading, error, data } = useQuery(GET_BOOKING_BY_ID, {
    variables: { bookedCarId: userId }
  });

  useEffect(() => {
    console.log('data', data);
    if (data) {
      const {
        bookedCar: { startDate: sd, endDate: ed }
      } = data;
      setStartDate(new Date(sd));
      setEndDate(new Date(ed));
    }
  }, [data]);

  if (loading)
    return (
      <div className={styles.rent__wrapper}>
        <div className={styles.error__message}>
          <p>Loading...</p>
        </div>
      </div>
    );

  if (error) {
    console.log(error);
    if (user === null) {
      return (
        <div className={styles.rent__wrapper}>
          <div className={styles.error__message}>
            <p>You need to be log in to see this page</p>
          </div>
        </div>
      );
    }
    return <p>Something went wrong error</p>;
  }
  const {
    bookedCar: { id, insuranceType, booker, car }
  } = data;

  console.log('id', id);

  const checkIfUserHasAllData = () => {};

  const insuranceRate = insuranceTable[insuranceType];

  const calculateInsurancePrice = (insuranceRate) => {
    return Math.round(Math.ceil((endDate - startDate) / 86400000) * car.price * insuranceRate, 2);
  };

  const calculateTotalPrice = (insuranceRate) => {
    return (
      Math.ceil((endDate - startDate) / 86400000) * car.price +
      calculateInsurancePrice(insuranceRate) +
      deposit
    );
  };

  startDate !== '' && console.log('startDate:', startDate);

  return (
    <>
      {data && car && (
        <div className={styles.rent__wrapper}>
          <h1>Rent Car</h1>
          <div className={styles.rent__data__wrapper}>
            <div className={styles.userData__wrapper}>
              <EditUserForm
                user={booker}
                completeForBooking={true}
                checkIfUserHasAllData={checkIfUserHasAllData}
              />
            </div>
            <div className={styles.carData__wrapper}>
              <div className={styles.carData__image}>
                <img
                  src={
                    car.picturePath.url
                      ? car.picturePath.url
                      : 'https://via.placeholder.com/400X200'
                  }
                  alt="car"
                />
              </div>

              <div className={styles.payment__summary}>
                <div className={styles.payment__summary__title}>
                  <h3>Summary</h3>
                </div>
                <div className={styles.payment__summary__info}>
                  <div className={styles.payment__summary__info__left}>
                    <p>Start Date</p>
                    <p>End Date</p>
                    <p>Price per day</p>
                    <p>Insurance</p>
                    <p>Deposit</p>
                    <p>Total price</p>
                  </div>
                  <div className={styles.payment__summary__info__right}>
                    <p>{startDate && startDate.toLocaleString()}</p>
                    <p>{endDate && endDate.toLocaleString()}</p>
                    <p>€{car.price}</p>
                    <p>€{calculateInsurancePrice(insuranceRate)}</p>
                    <p>€{deposit}</p>
                    <p>€{calculateTotalPrice(insuranceRate)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Rent;
