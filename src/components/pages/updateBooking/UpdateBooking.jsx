import { useContext, useState } from 'react';
import styles from './UpdateBooking.module.scss';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GET_BOOKING_BY_ID, GET_ALL_BOOKINGS } from '../../../queries/queries';
import { BOOK_CAR, UPDATE_BOOKING } from '../../../mutations/mutations';
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Insurance from '../../insurance/Insurance';

const UpdateBooking = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { userId: bookingId } = useParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [insuranceType, setInsuranceType] = useState('');
  const [insuranceRate, setInsuranceRate] = useState(0);
  const insuranceTable = {
    Silver: 0.3,
    Premium: 0.6,
    EU: 1.1
  };

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
      setInsuranceType(insuranceType);
      setInsuranceRate(insuranceTable[insuranceType]);
    }
  }, [data]);

  const [bookCar] = useMutation(BOOK_CAR, {
    onCompleted: ({ bookCar: { success, message, bookedCar } }) => {
      if (!success) {
        setAlert(message, 'danger');
      } else {
        updatePreviousBooking(bookedCar.id);
        success && navigate('/bookings');
        // success && changeTab(1); TODO
      }
    },
    onError: (error) => {
      console.log('error:', error.message);
    },
    refetchQueries: [{ query: GET_ALL_BOOKINGS }]
  });

  const [updateBooking] = useMutation(UPDATE_BOOKING, {
    onCompleted: ({ updateBookedCar: { success, message } }) => {
      setAlert(message, success ? 'success' : 'danger');
    },
    onError: (error) => {
      console.log('error:', error.message);
    },
    refetchQueries: [{ query: GET_BOOKING_BY_ID, variables: { bookingId } }]
  });

  const updatePreviousBooking = (id) => {
    const input = {
      id: bookingId,
      bookingChanges: {
        cancelled: false,
        moneyReturned: false,
        newBookingId: id
      }
    };
    updateBooking({ variables: { input } });
  };

  if (loading)
    return (
      <div className={styles.updateBooking__wrapper}>
        <div className={styles.error__message}>
          <p>Loading...</p>
        </div>
      </div>
    );

  if (error) {
    console.log(error);
    if (user === null) {
      return (
        <div className={styles.updateBooking__wrapper}>
          <div className={styles.error__message}>
            <p>You need to be log in to see this page</p>
          </div>
        </div>
      );
    }
    return <p>Something went wrong error</p>;
  }

  const {
    bookedCar: { car, totalPayment: previousTotalPayment, booker }
  } = data;

  const handUpdateButton = () => {
    const input = {
      carId: car.id,
      bookerId: booker.id,
      startDate,
      endDate,
      insuranceType,
      previousTotalPayment,
      currentPaid: calculateTotalPrice(insuranceRate) - previousTotalPayment,
      totalPayment: calculateTotalPrice(insuranceRate)
    };
    bookCar({ variables: { input } });
  };

  //   const insuranceRate = insuranceTable[insuranceType];
  const calculateInsurancePrice = (insuranceRate) => {
    return Math.round(Math.ceil((endDate - startDate) / 86400000) * car.price * insuranceRate, 2);
  };

  const calculateTotalPrice = (insuranceRate) => {
    return (
      Math.ceil((endDate - startDate) / 86400000) * car.price +
      calculateInsurancePrice(insuranceRate)
    );
  };

  const setInsurance = (insuranceType) => {
    setInsuranceRate(insuranceTable[insuranceType]);
    setInsuranceType(insuranceType);
  };

  return (
    <>
      {user && !user.isAdmin ? (
        <div className={styles.updateBooking__wrapper}>
          <h1>You need to be Supervisor to perform this action</h1>
        </div>
      ) : (
        data &&
        car && (
          <div className={styles.updateBooking__wrapper}>
            <h1>Update Booking</h1>
            <div className={styles.updateBooking__data__wrapper}>
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

                <>
                  <div className={styles.datePicker__container}>
                    <div className={styles.datePicker__container__left}>
                      <label>Start Date</label>

                      <DatePicker
                        showTimeSelect
                        selected={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                        }}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        dateFormat="d/M/yyyy - HH:mm"
                        readOnly
                      />
                    </div>
                    <div className={styles.datePicker__container__right}>
                      <label>End Date</label>
                      <DatePicker
                        showTimeSelect
                        selected={endDate}
                        onChange={(date) => {
                          setEndDate(date);
                        }}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        dateFormat="d/M/yyyy - HH:mm"
                      />
                    </div>
                  </div>
                </>
                <div className={styles.insurance__container}>
                  <Insurance
                    setInsurance={setInsurance}
                    calculateInsurancePrice={calculateInsurancePrice}
                    active={insuranceType}
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
                      <p>Total price</p>
                      <p>Already paid</p>
                      <br />
                      <p>
                        <strong>Amount to pay</strong>
                      </p>
                    </div>
                    <div className={styles.payment__summary__info__right}>
                      <p>{startDate && startDate.toLocaleString()}</p>
                      <p>{endDate && endDate.toLocaleString()}</p>
                      <p>€{calculateTotalPrice(insuranceRate)}</p>
                      <p>€{previousTotalPayment}</p>
                      <br />
                      <p>
                        <strong>
                          €{calculateTotalPrice(insuranceRate) - previousTotalPayment}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.button_wrapper}>
                  <button className={styles.button__update} onClick={() => handUpdateButton()}>
                    Update
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

export default UpdateBooking;
