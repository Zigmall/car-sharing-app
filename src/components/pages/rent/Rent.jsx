import { useContext, useState } from 'react';
import styles from './Rent.module.scss';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';
import EditUserForm from '../../editUserForm/EditUserForm';
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { GET_BOOKING_BY_ID, GET_ALL_BOOKINGS, GET_ALL_RENTS } from '../../../queries/queries';
import { RENT_CAR, UPDATE_BOOKING } from '../../../mutations/mutations';
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
  const [deposit, setDeposit] = useState(0);
  const insuranceTable = {
    Silver: 0.3,
    Premium: 0.6,
    EU: 1.1
  };

  const [rentCar] = useMutation(RENT_CAR, {
    onCompleted: ({ createRent: { success, message, rent } }) => {
      if (!success) {
        setAlert(message, 'danger');
      } else {
        updatePreviousBooking(rent.id);
        navigate('/bookings');
      }
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
        bookedCar: { startDate, endDate, insuranceType, car }
      } = data;
      setStartDate(new Date(startDate));
      setEndDate(new Date(endDate));
      setInsuranceRate(insuranceTable[insuranceType]);
      setDeposit(car.deposit);
    }
  }, [data]);

  const [updateBooking] = useMutation(UPDATE_BOOKING, {
    onCompleted: ({ updateBookedCar: { success, message } }) => {
      if (!success) {
        setAlert(message, 'danger');
      } else {
        setAlert('Car rented successfully', 'success');
      }
    },
    onError: (error) => {
      console.log('error:', error.message);
    },
    refetchQueries: [
      { query: GET_BOOKING_BY_ID, variables: { bookingId } },
      { query: GET_ALL_BOOKINGS },
      { query: GET_ALL_RENTS }
    ]
  });

  const updatePreviousBooking = (id) => {
    const input = {
      id: bookingId,
      bookingChanges: {
        cancelled: false,
        moneyReturned: false,
        rentId: id
      }
    };
    updateBooking({ variables: { input } });
  };

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
  }
  if (user && user === null) {
    return (
      <div className={styles.rent__wrapper}>
        <div className={styles.error__message}>
          <p>You need to be log in to see this page</p>
        </div>
      </div>
    );
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
      depositReturned: false,
      handlingOverCard: {
        milageBefore: car.milage,
        milageAfter: car.milage,
        fullTankAfter: false,
        fuelCost: 0,
        dmgBefore: car.damaged,
        dmgBeforeDesc: car.dmgDescription,
        dmgAfter: false,
        dmgAfterDesc: '',
        regDocAfter: false,
        ocInsAfter: false,
        fireExtAfter: false,
        triangleAfter: false,
        firstAidKitAfter: false,
        arealAfter: false,
        spareWheelAfter: false,
        gpsAfter: false,
        userManualAfter: false
      }
    };
    rentCar({ variables: { input } });
  };

  return (
    <>
      {user && !(user.role === 'ADMIN' || user.role === 'SUPERVISOR') ? (
        <div className={styles.rent__wrapper}>
          <h1>You need to be Supervisor to perform this action</h1>
        </div>
      ) : (
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
