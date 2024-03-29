import { useContext, useState, useEffect } from 'react';
import styles from './CheckAndReturn.module.scss';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import AuthContext from '../../context/auth/authContext';
import { GET_RENT_BY_ID, GET_LOCATIONS } from '../../queries/queries';
import { useMutation } from '@apollo/client';
import { UPDATE_RENT, UPDATE_CAR_FROM_HANDLING_OVER_CARD } from '../../mutations/mutations';
import AlertContext from '../../context/alert/alertContext';
import { useNavigate } from 'react-router-dom';

const CheckAndReturn = () => {
  const handleCheckboxChange = (setFunction) => {
    setFunction((prevState) => !prevState);
  };

  const { rentId } = useParams();
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const carLocations = useQuery(GET_LOCATIONS);
  const navigate = useNavigate();
  user && (user === null || user === undefined) ? navigate('/login') : null;

  const regDocBefore = true;
  const ocInsBefore = true;
  const fireExtinguisherBefore = true;
  const triangleBefore = true;
  const firstAidKitBefore = true;
  const arealBefore = true;
  const spareWheelBefore = true;
  const additionalGPSBefore = true;
  const userManualBefore = true;

  const [milageBefore, setMilageBefore] = useState(0);
  const [milageAfter, setMilageAfter] = useState(0);
  const [fullTankAfter, setFullTankAfter] = useState(false);
  const [fuelCost, setFuelCost] = useState(0);
  const [dmgBefore, setDmgBefore] = useState(false);
  const [dmgBeforeDesc, setDmgBeforeDesc] = useState('');
  const [dmgAfter, setDmgAfter] = useState(false);
  const [dmgAfterDesc, setDmgAfterDesc] = useState('Damages description');
  const [regDocAfter, setRegDocAfter] = useState(false);
  const [ocInsAfter, setOcInsAfter] = useState(false);
  const [fireExtAfter, setFireExtAfter] = useState(false);
  const [triangleAfter, setTriangleAfter] = useState(false);
  const [firstAidKitAfter, setFirstAidKitAfter] = useState(false);
  const [arealAfter, setArealAfter] = useState(false);
  const [spareWheelAfter, setSpareWheelAfter] = useState(false);
  const [gpsAfter, setGpsAfter] = useState(false);
  const [userManualAfter, setUserManualAfter] = useState(false);
  const [location, setLocation] = useState('');
  const [overTimeCost, setOverTimeCost] = useState(0);

  const { loading, error, data } = useQuery(GET_RENT_BY_ID, {
    variables: { rentId }
  });

  const checkIfLocationIsChosen = () => {
    return location === '' || location === 'Select Return Location' ? false : true;
  };

  useEffect(() => {
    if (data) {
      const {
        rent: { handlingOverCard }
      } = data;
      setMilageBefore(handlingOverCard.milageBefore);
      setDmgBefore(handlingOverCard.dmgBefore);
      setDmgBeforeDesc(handlingOverCard.dmgBeforeDesc);
      setMilageAfter(handlingOverCard.milageBefore);
      checkOverTimeCost();
    }
  }, [data]);

  const [updateRent] = useMutation(UPDATE_RENT, {
    onCompleted: ({ updateRent: { success, message } }) => {
      if (!success) {
        setAlert(message, 'danger');
      } else {
        setAlert('Handling Over Card completed', 'success');
        navigate('/rents');
      }
    },
    onError: (error) => {
      console.log('error:', error.message);
    },
    refetchQueries: [{ query: GET_RENT_BY_ID, variables: { rentId } }]
  });

  const [updateCar] = useMutation(UPDATE_CAR_FROM_HANDLING_OVER_CARD, {
    onCompleted: ({ updateCar: { success, message } }) => {
      if (!success) {
        setAlert(message, 'danger');
      } else {
        console.log('success', message);
      }
    },
    onError: (error) => {
      console.log('error:', error.message);
    },
    refetchQueries: [{ query: GET_RENT_BY_ID, variables: { rentId } }]
  });

  const checkOverTimeCost = () => {
    if (data) {
      const {
        rent: { booking, car, rentPrice }
      } = data;
      const currentBooking =
        booking &&
        booking.find(
          (b) => b.bookingChanges.cancelled === false && b.bookingChanges.newBookingId === null
        );
      // console.log('currentBooking', currentBooking);
      const { startDate, endDate, insuranceType } = currentBooking;

      console.log('car', car);
      const insuranceTable = {
        Silver: 0.3,
        Premium: 0.6,
        EU: 1.1
      };
      const insuranceRate = insuranceTable[insuranceType];
      const rentStartTimestamp = new Date(startDate).getTime();
      const rentEndTimestamp = new Date(endDate).getTime();
      const nowTimestamp = new Date().getTime();
      const calculateInsurancePrice = (insuranceRate) => {
        return Math.round(
          Math.ceil((nowTimestamp - rentStartTimestamp) / 86400000) * car.price * insuranceRate,
          2
        );
      };

      const overTimeCost =
        Math.ceil((nowTimestamp - rentStartTimestamp) / 86400000) * car.price +
        calculateInsurancePrice(insuranceRate);
      // console.log('overTimeCost', overTimeCost);
      // console.log('rentPrice', rentPrice);
      if (nowTimestamp > rentEndTimestamp) {
        setOverTimeCost(overTimeCost - rentPrice);
        return overTimeCost - rentPrice;
      } else {
        return 0;
      }
    }
  };

  if (loading || carLocations.loading) {
    return (
      <div className={styles.error__message}>
        <p>loading...</p>
      </div>
    );
  }
  if (error) {
    console.log(error);
    if (user === null || user === undefined) {
      return (
        <div className={styles.error__message}>
          <p>You need to be log in to see this page</p>
        </div>
      );
    }
    return (
      <div className={styles.error__message}>
        <p>Something went wrong...</p>
      </div>
    );
  } else if (carLocations.error) {
    console.log(carLocations.error);
    return (
      <div className={styles.error__message}>
        <p>Something went wrong...</p>
      </div>
    );
  }

  const calculateAdditionalCost = () => {
    let cost = 0;
    if (!regDocAfter) cost += 25;
    if (!ocInsAfter) cost += 25;
    if (!fireExtAfter) cost += 50;
    if (!spareWheelAfter) cost += 100;
    if (!triangleAfter) cost += 25;
    if (!firstAidKitAfter) cost += 20;
    if (!arealAfter) cost += 15;
    if (!gpsAfter) cost += 100;
    if (!userManualAfter) cost += 10;
    if (!fullTankAfter) cost += fuelCost;
    if (overTimeCost > 0) cost += overTimeCost;
    return cost;
  };

  const updateCarDetails = () => {
    const {
      rent: { car, handlingOverCard }
    } = data;
    const { milageAfter, dmgAfter, dmgAfterDesc, dmgBeforeDesc } = handlingOverCard;
    const dmgDes = dmgAfter ? car.dmgDescription + ' ' + dmgAfterDesc : dmgBeforeDesc;
    const dmg = dmgBefore || dmgAfter ? true : false;
    const input = {
      id: car.id,
      milage: milageAfter,
      damaged: dmg,
      dmgDescription: dmgDes,
      location: location
    };
    updateCar({ variables: { input } });
    console.log('input: ', input);
  };
  const handleUpdateRent = () => {
    if (!checkIfLocationIsChosen()) {
      setAlert('Please choose return location', 'warning');
      return;
    }
    updateCarDetails();
    const input = {
      id: rentId,
      returnDate: new Date(),
      returnLocation: location,
      overTimeCost: overTimeCost > 0 ? overTimeCost : 0,
      additionalCosts: calculateAdditionalCost(),
      handlingOverCard: {
        milageBefore,
        milageAfter,
        fullTankAfter,
        fuelCost: fullTankAfter ? 0 : fuelCost,
        dmgBefore,
        dmgBeforeDesc,
        dmgAfter,
        dmgAfterDesc,
        regDocAfter,
        ocInsAfter,
        fireExtAfter,
        triangleAfter,
        firstAidKitAfter,
        arealAfter,
        spareWheelAfter,
        gpsAfter,
        userManualAfter
      }
    };
    updateRent({ variables: { input } });
  };

  return (
    <>
      {data && user && !(user.role === 'ADMIN' || user.role === 'SUPERVISOR') ? (
        <div className={styles.error__message}>
          <h4>You need to be higher rank to perform this action</h4>
        </div>
      ) : (
        <div className={styles.return__wrapper}>
          <div className={styles.return__container}>
            <div className={styles.return__header}>
              <h1>Return Car</h1>
            </div>
            <div className={styles.return__form}>
              <div className={styles.return__form__leftColumn}>
                <div className={styles.return__form__element}>
                  <p>{`Milage before: ${milageBefore}`}</p>
                </div>
                <div className={styles.return__form__element}>
                  <p>Fuel level: 100%</p>
                </div>
                <div className={styles.return__form__damage}>
                  <input
                    type="checkbox"
                    id="dmgBefore"
                    checked={!dmgBefore}
                    onChange={() => handleCheckboxChange(setDmgBefore)}
                  />
                  No old damages
                </div>
                <div className={styles.return__form__damage}>
                  <input
                    type="checkbox"
                    id="dmgBefore"
                    checked={dmgBefore}
                    onChange={() => handleCheckboxChange(setDmgBefore)}
                  />
                  New damages
                </div>
                <div className={styles.return__form__textarea}>
                  <textarea
                    id="dmgBeforeDesc"
                    onChange={() => handleCheckboxChange(setDmgBeforeDesc)}
                    defaultValue={dmgBeforeDesc}
                  />
                </div>
              </div>
              <div className={styles.return__form__middleColumn}>
                <h2>HANDLING OVER CARD</h2>

                <div className={styles.return__form__middleColumn__element}>
                  <input type="checkbox" id="regDocBefore" checked={regDocBefore} readOnly={true} />
                  <h4>Registration documents</h4>
                  <input
                    type="checkbox"
                    id="regDocAfter"
                    checked={regDocAfter}
                    onChange={() => handleCheckboxChange(setRegDocAfter)}
                  />
                </div>

                <div className={styles.return__form__middleColumn__element}>
                  <input type="checkbox" id="ocInsBefore" checked={ocInsBefore} readOnly={true} />
                  <h4>OC insurance</h4>
                  <input
                    type="checkbox"
                    id="ocInsAfter"
                    checked={ocInsAfter}
                    onChange={() => handleCheckboxChange(setOcInsAfter)}
                  />
                </div>

                <div className={styles.return__form__middleColumn__element}>
                  <input
                    type="checkbox"
                    id="fireExtinguisherBefore"
                    checked={fireExtinguisherBefore}
                    readOnly={true}
                  />
                  <h4>Fire extinguisher</h4>
                  <input
                    type="checkbox"
                    id="fireExtAfter"
                    checked={fireExtAfter}
                    onChange={() => handleCheckboxChange(setFireExtAfter)}
                  />
                </div>

                <div className={styles.return__form__middleColumn__element}>
                  <input
                    type="checkbox"
                    id="spareWheelBefore"
                    checked={spareWheelBefore}
                    readOnly={true}
                  />
                  <h4>Spare wheel</h4>
                  <input
                    type="checkbox"
                    id="spareWheelAfter"
                    checked={spareWheelAfter}
                    onChange={() => handleCheckboxChange(setSpareWheelAfter)}
                  />
                </div>

                <div className={styles.return__form__middleColumn__element}>
                  <input
                    type="checkbox"
                    id="triangleBefore"
                    checked={triangleBefore}
                    readOnly={true}
                  />
                  <h4>Triangle</h4>
                  <input
                    type="checkbox"
                    id="triangleAfter"
                    checked={triangleAfter}
                    onChange={() => handleCheckboxChange(setTriangleAfter)}
                  />
                </div>

                <div className={styles.return__form__middleColumn__element}>
                  <input
                    type="checkbox"
                    id="firstAidKitBefore"
                    checked={firstAidKitBefore}
                    readOnly={true}
                  />
                  <h4>First Aid Kit</h4>
                  <input
                    type="checkbox"
                    id="firstAidKitAfter"
                    checked={firstAidKitAfter}
                    onChange={() => handleCheckboxChange(setFirstAidKitAfter)}
                  />
                </div>

                <div className={styles.return__form__middleColumn__element}>
                  <input type="checkbox" id="arealBefore" checked={arealBefore} readOnly={true} />
                  <h4>Areal</h4>
                  <input
                    type="checkbox"
                    id="arealAfter"
                    checked={arealAfter}
                    onChange={() => handleCheckboxChange(setArealAfter)}
                  />
                </div>

                <div className={styles.return__form__middleColumn__element}>
                  <input
                    type="checkbox"
                    id="additionalGPSBefore"
                    checked={additionalGPSBefore}
                    readOnly={true}
                  />
                  <h4>Additional GPS</h4>
                  <input
                    type="checkbox"
                    id="gpsAfter"
                    checked={gpsAfter}
                    onChange={() => handleCheckboxChange(setGpsAfter)}
                  />
                </div>

                <div className={styles.return__form__middleColumn__element}>
                  <input
                    type="checkbox"
                    id="userManualBefore"
                    checked={userManualBefore}
                    readOnly={true}
                  />
                  <h4>User Manual</h4>
                  <input
                    type="checkbox"
                    id="userManualAfter"
                    checked={userManualAfter}
                    onChange={() => handleCheckboxChange(setUserManualAfter)}
                  />
                </div>
                <div className={styles.bottom__space} />
              </div>
              <div className={styles.return__form__rightColumn}>
                <div className={styles.return__form__milageAfter}>
                  <label>
                    Milage:{' '}
                    <input
                      className={styles.form__input}
                      type="number"
                      id="milageAfter"
                      onChange={(e) => setMilageAfter(parseInt(e.target.value))}
                      value={milageAfter}
                    />
                  </label>
                </div>
                <div className={styles.return__form__fuelAfter}>
                  <label>
                    Full tank?
                    <input
                      type="checkbox"
                      id="fullTankAfter"
                      checked={fullTankAfter}
                      onChange={() => handleCheckboxChange(setFullTankAfter)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      id="fullTankAfter"
                      checked={!fullTankAfter}
                      onChange={() => handleCheckboxChange(setFullTankAfter)}
                    />
                    No
                  </label>

                  {!fullTankAfter && (
                    <input
                      type="number"
                      className={styles.form__input}
                      id="fuelCost"
                      placeholder="Fuel cost"
                      onChange={(e) => setFuelCost(parseInt(e.target.value))}
                    />
                  )}
                </div>
                <div className={styles.return__form__damage}>
                  <input
                    type="checkbox"
                    id="dmgAfter"
                    checked={!dmgAfter}
                    onChange={() => handleCheckboxChange(setDmgAfter)}
                  />
                  No new damages
                </div>
                <div className={styles.return__form__damage}>
                  <input
                    type="checkbox"
                    id="dmgAfter"
                    checked={dmgAfter}
                    onChange={() => handleCheckboxChange(setDmgAfter)}
                  />
                  New damages
                </div>
                <div className={styles.return__form__textarea}>
                  <textarea
                    id="dmgAfterDesc"
                    onChange={() => handleCheckboxChange(setDmgAfterDesc)}
                    defaultValue={dmgAfterDesc}
                  />
                </div>
                {carLocations?.data && (
                  <select
                    className={styles.form__select}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}>
                    <option>Select Return Location</option>
                    {carLocations.data.locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.point}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className={styles.return__footer__summary}>
              <div className={styles.payment__summary__right}>
                <div className={styles.payment__summary__right__title}>
                  <h3>Addition costs:</h3>
                </div>
                <div className={styles.payment__summary__right__info}>
                  <div className={styles.payment__summary__right__info__left}>
                    {!regDocAfter && <p>Registration Documents:</p>}
                    {!ocInsAfter && <p>OC insurance:</p>}
                    {!fireExtAfter && <p>Fire extinguisher:</p>}
                    {!spareWheelAfter && <p>Spare wheel:</p>}
                    {!triangleAfter && <p>Triangle:</p>}
                    {!firstAidKitAfter && <p>First Aid Kit:</p>}
                    {!arealAfter && <p>Areal:</p>}
                    {!gpsAfter && <p>Additional GPS:</p>}
                    {!userManualAfter && <p>User Manual:</p>}
                    {!fullTankAfter && <p>Cost of fuel:</p>}
                    {overTimeCost > 0 && <p>Over Time Cost:</p>}

                    <p>
                      <strong>Total price</strong>
                    </p>
                  </div>
                  <div className={styles.payment__summary__right__info__right}>
                    {!regDocAfter && <p>€25</p>}
                    {!ocInsAfter && <p>€25</p>}
                    {!fireExtAfter && <p>€50</p>}
                    {!spareWheelAfter && <p>€100</p>}
                    {!triangleAfter && <p>€25</p>}
                    {!firstAidKitAfter && <p>€20</p>}
                    {!arealAfter && <p>€15</p>}
                    {!gpsAfter && <p>€100</p>}
                    {!userManualAfter && <p>€10</p>}
                    {!fullTankAfter && <p>€{fuelCost}</p>}
                    {overTimeCost > 0 && <p>€{overTimeCost}</p>}
                    <p>
                      <strong>{`TOTAL: €${calculateAdditionalCost()}`}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.return__footer}>
              <button className={styles.return__footer__button} onClick={() => handleUpdateRent()}>
                Confirm car return
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckAndReturn;
