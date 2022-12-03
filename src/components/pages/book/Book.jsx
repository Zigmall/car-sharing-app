import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import styles from './Book.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import EditUserForm from '../../editUserForm/EditUserForm';
import AuthContext from '../../../context/auth/authContext';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { GET_CAR } from '../../../queries/queries';
import { CheckIcon, DropDownArrow } from '../../assets/SvgList';
import { useEffect } from 'react';

const Book = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [userDataCompleted, setUserDataCompleted] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showInsuranceOptions, setShowInsuranceOptions] = useState(false);
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  // const [insuranceRate, setInsuranceRate] = useState(0.8);
  // const [insuranceType, setInsuranceType] = useState('Basic');
  const { carId } = useParams();
  const { loading, error, data } = useQuery(GET_CAR, {
    variables: { carId }
  });

  useEffect(() => {
    userDataCompleted && setShowEditUserForm(!userDataCompleted);
  }, [userDataCompleted]);

  // const navigate = useNavigate();
  // const carContext = useContext(CarContext);
  // const { changeTab } = carContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;

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
  const insuranceRate = 0.8;

  const handleSummaryButton = () => {};

  const checkIfUserHasAllData = (completed) => {
    setUserDataCompleted(completed);
    setShowDatePicker(completed);
  };

  const calculateInsurancePrice = () => {
    return Math.round(Math.ceil((car.price * (endDate - startDate)) / 86400000) * insuranceRate, 2);
  };

  const calculateTotalPrice = () => {
    return Math.round(
      Math.ceil((car.price * (endDate - startDate)) / 86400000) +
        calculateInsurancePrice(insuranceRate),
      2
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

          {(showDatePicker || showPaymentSummary) && (
            <div className={styles.userData__steps}>
              <h2>{`Step 2: Start and end dates ${startDate && endDate ? 'COMPLETED' : ''}`}</h2>
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
                    isClearable
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
                    isClearable
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="d/M/yyyy - HH:mm"
                  />
                </div>
              </div>
            </>
          )}
          {showInsuranceOptions && (
            <div className={styles.userData__steps}>
              <h2>Step 3: Insurance options</h2>
            </div>
          )}
          {showPaymentSummary && (
            <>
              <div className={styles.userData__steps}>
                <h2>Step 4: Payment</h2>
              </div>
              <div className={styles.payment__summary}>
                <div className={styles.payment__summary__left}>
                  <div className={styles.payment__summary__left__title}>
                    <h3>Car</h3>
                  </div>
                  <div className={styles.payment__summary__left__car}>
                    <div className={styles.payment__summary__left__car__image}>
                      <img
                        src={
                          car.picturePath.url
                            ? car.picturePath.url
                            : 'https://via.placeholder.com/150'
                        }
                        alt="car"
                      />
                    </div>
                    <div className={styles.payment__summary__left__car__info}>
                      <p>{car.brand.name}</p>
                      <h3>{car.model}</h3>
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
                      <p>€{calculateInsurancePrice()}</p>
                      <p>€{calculateTotalPrice()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className={styles.summary__wrapper}>
            <button onClick={() => handleSummaryButton()} className={styles.summary__button}>
              BOOK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Book;
