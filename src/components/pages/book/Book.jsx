import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import styles from './Book.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import EditUserForm from '../../editUserForm/EditUserForm';
import AuthContext from '../../../context/auth/authContext';
import CarContext from '../../../context/car/carContext';
import AlertContext from '../../../context/alert/alertContext';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { GET_CAR } from '../../../queries/queries';
import { CheckIcon, DropDownArrow } from '../../assets/SvgList';
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { BOOK_CAR } from '../../../mutations/mutations';
import Insurance from '../../insurance/Insurance';
import { useNavigate } from 'react-router-dom';

const Book = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [userDataCompleted, setUserDataCompleted] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showInsuranceOptions, setShowInsuranceOptions] = useState(false);
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const [insuranceType, setInsuranceType] = useState('Silver');
  const { carId } = useParams();
  const { loading, error, data } = useQuery(GET_CAR, {
    variables: { carId }
  });

  const [bookCar] = useMutation(BOOK_CAR, {
    onCompleted: ({ bookCar: { success, message } }) => {
      setAlert(message, success ? 'success' : 'danger');
      success && navigate('/');
      success && changeTab(1);
    },
    onError: (error) => {
      console.log('error:', error.message);
    }
  });

  useEffect(() => {
    userDataCompleted && setShowEditUserForm(!userDataCompleted);
  }, [userDataCompleted]);

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const navigate = useNavigate();
  const carContext = useContext(CarContext);
  const { changeTab } = carContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const insuranceTable = {
    Silver: 0.3,
    Premium: 0.6,
    EU: 1.1
  };
  const [insuranceRate, setInsuranceRate] = useState(insuranceTable.Silver);
  const setInsurance = (insuranceType) => {
    setInsuranceRate(insuranceTable[insuranceType]);
    setInsuranceType(insuranceType);
  };

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
  // const { brand, model, price, year, fuel, transmission, image } = car;

  const handlePayAndBookButton = () => {
    const input = {
      carId,
      bookerId: user.id,
      startDate,
      endDate,
      insuranceType,
      amountPaid: calculateTotalPrice(insuranceRate)
    };
    bookCar({ variables: { input } });
  };

  const checkIfUserHasAllData = (completed) => {
    setUserDataCompleted(completed);
    setShowDatePicker(completed);
  };

  const calculateInsurancePrice = (insuranceRate) => {
    return Math.round(Math.ceil((endDate - startDate) / 86400000) * car.price * insuranceRate, 2);
  };

  const calculateTotalPrice = (insuranceRate) => {
    return (
      Math.ceil((endDate - startDate) / 86400000) * car.price +
      calculateInsurancePrice(insuranceRate)
    );
  };

  return (
    <>
      {user && car && (
        <div className={styles.page__wrapper}>
          <div className={styles.userData__title}>
            <h1>Car booking</h1>
          </div>
          <div className={styles.userData__steps}>
            <div
              className={styles.dropDownArrow}
              onClick={() => setShowEditUserForm(!showEditUserForm)}>
              <DropDownArrow iconHeight={'25'} iconWidth={'25'} />
            </div>

            <h2>{`Step 1: Your personal data: ${
              userDataCompleted ? 'COMPLETED' : 'INCOMPLETE'
            }`}</h2>

            {userDataCompleted && (
              <div className={styles.checkIconStyles}>
                <CheckIcon iconHeight={'25'} iconWidth={'25'} />
              </div>
            )}
          </div>
          {showEditUserForm && (
            <div className={styles.userData__wrapper}>
              <EditUserForm
                user={user}
                completeForBooking={true}
                checkIfUserHasAllData={checkIfUserHasAllData}
              />
            </div>
          )}

          {(showDatePicker || userDataCompleted) && (
            <div className={styles.userData__steps}>
              <div
                className={styles.dropDownArrow}
                onClick={() => setShowDatePicker(!showDatePicker)}>
                <DropDownArrow iconHeight={'25'} iconWidth={'25'} />
              </div>
              <h2>{`Step 2: Start and End Dates ${startDate && endDate ? 'COMPLETED' : ''}`}</h2>
              {startDate && endDate && (
                <div className={styles.checkIconStyles}>
                  <CheckIcon iconHeight={'25'} iconWidth={'25'} />
                </div>
              )}
            </div>
          )}

          {showDatePicker && (
            <>
              <div className={styles.datePicker__container}>
                <div className={styles.datePicker__container__left}>
                  <label>Start Date</label>

                  <DatePicker
                    showTimeSelect
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setShowDatePicker(startDate && endDate ? false : true);
                      setShowPaymentSummary(startDate && endDate ? true : false);
                      setShowInsuranceOptions(startDate && endDate ? true : false);
                    }}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    dateFormat="d/M/yyyy - HH:mm"
                  />
                </div>
                <div className={styles.datePicker__container__right}>
                  <label>End Date</label>
                  <DatePicker
                    showTimeSelect
                    selected={endDate}
                    onChange={(date) => {
                      setEndDate(date);
                      setShowPaymentSummary(startDate && endDate ? true : false);
                      setShowDatePicker(startDate && endDate ? false : true);
                      setShowInsuranceOptions(startDate && endDate ? true : false);
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
          )}
          {(showInsuranceOptions || (startDate && endDate)) && (
            <div className={styles.userData__steps}>
              <div
                className={styles.dropDownArrow}
                onClick={() => setShowInsuranceOptions(!showInsuranceOptions)}>
                <DropDownArrow iconHeight={'25'} iconWidth={'25'} />
              </div>
              <h2>Step 3: Insurance options</h2>
              <div className={styles.checkIconStyles}>
                <CheckIcon iconHeight={'25'} iconWidth={'25'} />
              </div>
            </div>
          )}
          {showInsuranceOptions && (
            <Insurance
              setInsurance={setInsurance}
              calculateInsurancePrice={calculateInsurancePrice}
            />
          )}
          {showPaymentSummary && (
            <>
              <div className={styles.userData__steps}>
                <h2>Step 4: Summary and payment</h2>
              </div>
              <div className={styles.payment__summary}>
                <div className={styles.payment__summary__left}>
                  <div className={styles.payment__summary__left__title}>
                    <h3>{`${car.brand.name} ${car.model}`}</h3>
                  </div>
                  <div className={styles.payment__summary__left__car}>
                    <div className={styles.payment__summary__left__car__image}>
                      <img
                        src={
                          car.picturePath.url
                            ? car.picturePath.url
                            : 'https://via.placeholder.com/400X200'
                        }
                        alt="car"
                      />
                    </div>
                    <div className={styles.payment__summary__left__car__info}>
                      <p>{car.description}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.payment__summary__right}>
                  <div className={styles.payment__summary__right__title}>
                    <h3>Payment</h3>
                  </div>
                  <div className={styles.payment__summary__right__info}>
                    <div className={styles.payment__summary__right__info__left}>
                      <p>Start Date</p>
                      <p>End Date</p>
                      <p>Price per day</p>
                      <p>Insurance</p>
                      <p>Total price</p>
                    </div>
                    <div className={styles.payment__summary__right__info__right}>
                      <p>{startDate && startDate.toLocaleString()}</p>
                      <p>{endDate && endDate.toLocaleString()}</p>
                      <p>€{car.price}</p>
                      <p>€{calculateInsurancePrice(insuranceRate)}</p>
                      <p>€{calculateTotalPrice(insuranceRate)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {userDataCompleted && startDate && endDate && (
            <div className={styles.summary__wrapper}>
              <button onClick={() => handlePayAndBookButton()} className={styles.summary__button}>
                PAY AND BOOK
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Book;
