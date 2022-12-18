import { useContext, useState } from 'react';
import styles from './Rent.module.scss';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { GET_BOOKING_BY_ID } from '../../../queries/queries';
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';
import EditUserForm from '../../editUserForm/EditUserForm';
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { RENT_CAR } from '../../../mutations/mutations';
import { useNavigate } from 'react-router-dom';

const Rent = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { userId: bookingId } = useParams();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();
  const [insuranceRate, setInsuranceRate] = useState(0);
  const deposit = 200;
  const insuranceTable = {
    Silver: 0.3,
    Premium: 0.6,
    EU: 1.1
  };

  const [rentCar] = useMutation(RENT_CAR, {
    onCompleted: ({ createRent: { success, message } }) => {
      setAlert(message, success ? 'success' : 'error');
      navigate('/bookings');
    },
    onError: (error) => {
      console.log(error);
      setAlert('Something went wrong', 'error');
    }
    // refetchQueries: ['GET_RENTS_BY_ID']
  });

  const { loading, error, data } = useQuery(GET_BOOKING_BY_ID, {
    variables: { bookingId }
  });

  useEffect(() => {
    if (data) {
      const {
        bookedCar: { startDate, endDate, insuranceType }
      } = data;
      setStartDate(new Date(startDate));
      setEndDate(new Date(endDate));
      setInsuranceRate(insuranceTable[insuranceType]);
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
    bookedCar: { car, totalPayment: previousTotalPayment, booker, insuranceType }
  } = data;

  const checkIfUserHasAllData = () => {};

  const calculateInsurancePrice = (insuranceRate) => {
    return Math.round(Math.ceil((endDate - startDate) / 86400000) * car.price * insuranceRate, 2);
  };

  const calculateTotalPrice = (insuranceRate) => {
    return (
      Math.ceil((endDate - startDate) / 86400000) * car.price +
      calculateInsurancePrice(insuranceRate)
    );
  };

  const handleRentCar = () => {
    const firstBookingId =
      data && data.bookedCar.newBooking ? bookingId : data.bookedCar.firstBookingId;
    const input = {
      carId: car.id,
      renterId: booker.id,
      firstBookingId,
      pickupDate: startDate,
      rated: false,
      rentPrice: calculateTotalPrice(insuranceRate),
      deposit,
      additionalCosts: 0,
      depositCollected: true, // check if user has
      allFinancialSorted: false,
      depositReturned: false
    };
    rentCar({ variables: { input } });
  };

  return (
    <>
      {user && !user.isAdmin ? (
        <div className={styles.rent__wrapper}>
          <h1>You need to be Supervisor to perform this action</h1>
        </div>
      ) : (
        data &&
        car && (
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
                      <p>Car</p>
                      <p>Start Date</p>
                      <p>End Date</p>
                      <p>Insurance Type</p>
                      <p>Total Price</p>
                      <p>Already Paid</p>
                      <br />
                      <p>Deposit</p>
                      <p>
                        <strong>Amount To Pay</strong>
                      </p>
                    </div>
                    <div className={styles.payment__summary__info__right}>
                      <p>{`${car.brand.name} ${car.model}`}</p>
                      <p>{startDate && startDate.toLocaleString()}</p>
                      <p>{endDate && endDate.toLocaleString()}</p>
                      <p>{insuranceType}</p>
                      <p>€{calculateTotalPrice(insuranceRate)}</p>
                      <p>€{previousTotalPayment}</p>
                      <br />
                      <p>€{deposit}</p>
                      <p>
                        <strong>
                          €{calculateTotalPrice(insuranceRate) - previousTotalPayment}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.button_wrapper}>
                  <button className={styles.button__update} onClick={() => handleRentCar()}>
                    Rent Car
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Rent;
