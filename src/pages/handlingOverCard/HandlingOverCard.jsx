import { useContext, useState, useEffect } from 'react';
import styles from './HandlingOverCard.module.scss';
import { useParams } from 'react-router';

import { useQuery } from '@apollo/client';
import AuthContext from '../../context/auth/authContext';
import { GET_RENT_BY_ID } from '../../queries/queries';

const HandlingOverCard = () => {
  const { rentId } = useParams();
  const authContext = useContext(AuthContext);
  const { user } = authContext;

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

  const { loading, error, data } = useQuery(GET_RENT_BY_ID, {
    variables: { rentId }
  });

  useEffect(() => {
    if (data) {
      const {
        rent: { handlingOverCard, returnLocation }
      } = data;
      setMilageBefore(handlingOverCard.milageBefore);
      setMilageAfter(handlingOverCard.milageAfter);
      setFullTankAfter(handlingOverCard.fullTankAfter);
      setFuelCost(handlingOverCard.fuelCost);
      setDmgBefore(handlingOverCard.dmgBefore);
      setDmgBeforeDesc(handlingOverCard.dmgBeforeDesc);
      setDmgAfter(handlingOverCard.dmgAfter);
      setDmgAfterDesc(handlingOverCard.dmgAfterDesc);
      setRegDocAfter(handlingOverCard.regDocAfter);
      setOcInsAfter(handlingOverCard.ocInsAfter);
      setFireExtAfter(handlingOverCard.fireExtAfter);
      setTriangleAfter(handlingOverCard.triangleAfter);
      setFirstAidKitAfter(handlingOverCard.firstAidKitAfter);
      setArealAfter(handlingOverCard.arealAfter);
      setSpareWheelAfter(handlingOverCard.spareWheelAfter);
      setGpsAfter(handlingOverCard.gpsAfter);
      setUserManualAfter(handlingOverCard.userManualAfter);
      setLocation(returnLocation);
    }
  }, [data]);

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
    return cost;
  };

  if (loading)
    return (
      <div className={styles.error__message}>
        <p>Loading...</p>
      </div>
    );

  if (error) {
    console.log(error);
    if (user === null) {
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
  }
  return (
    <>
      {data && user && !(user.role === 'ADMIN' || user.role === 'SUPERVISOR') ? (
        <div className={styles.error__message}>
          <h5>You need to be higher rank to perform this action</h5>
        </div>
      ) : (
        <div className={styles.return__wrapper}>
          <div className={styles.return__container}>
            <div className={styles.return__form}>
              <div className={styles.return__form__leftColumn}>
                <div className={styles.return__form__element}>
                  <p>{`Milage before: ${milageBefore}`}</p>
                </div>
                <div className={styles.return__form__element}>
                  <p>Fuel level: 100%</p>
                </div>
                <div className={styles.return__form__damage}>
                  <input type="checkbox" id="dmgBefore" checked={!dmgBefore} readOnly={true} />
                  No old damages
                </div>
                <div className={styles.return__form__damage}>
                  <input type="checkbox" id="dmgBefore" checked={dmgBefore} readOnly={true} />
                  New damages
                </div>
                <div className={styles.return__form__textarea}>
                  <textarea id="dmgBeforeDesc" readOnly={true} defaultValue={dmgBeforeDesc} />
                </div>
              </div>
              <div className={styles.return__form__middleColumn}>
                <h2>HANDLING OVER</h2>

                <div className={styles.return__form__middleColumn__element}>
                  <input type="checkbox" id="regDocBefore" checked={regDocBefore} readOnly={true} />
                  <h4>Registration documents</h4>
                  <input type="checkbox" id="regDocAfter" checked={regDocAfter} readOnly={true} />
                </div>

                <div className={styles.return__form__middleColumn__element}>
                  <input type="checkbox" id="ocInsBefore" checked={ocInsBefore} readOnly={true} />
                  <h4>OC insurance</h4>
                  <input type="checkbox" id="ocInsAfter" checked={ocInsAfter} readOnly={true} />
                </div>

                <div className={styles.return__form__middleColumn__element}>
                  <input
                    type="checkbox"
                    id="fireExtinguisherBefore"
                    checked={fireExtinguisherBefore}
                    readOnly={true}
                  />
                  <h4>Fire extinguisher</h4>
                  <input type="checkbox" id="fireExtAfter" checked={fireExtAfter} readOnly={true} />
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
                    readOnly={true}
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
                    readOnly={true}
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
                    readOnly={true}
                  />
                </div>

                <div className={styles.return__form__middleColumn__element}>
                  <input type="checkbox" id="arealBefore" checked={arealBefore} readOnly={true} />
                  <h4>Areal</h4>
                  <input type="checkbox" id="arealAfter" checked={arealAfter} readOnly={true} />
                </div>

                <div className={styles.return__form__middleColumn__element}>
                  <input
                    type="checkbox"
                    id="additionalGPSBefore"
                    checked={additionalGPSBefore}
                    readOnly={true}
                  />
                  <h4>Additional GPS</h4>
                  <input type="checkbox" id="gpsAfter" checked={gpsAfter} readOnly={true} />
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
                    readOnly={true}
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
                      readOnly={true}
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
                      readOnly={true}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      id="fullTankAfter"
                      checked={!fullTankAfter}
                      readOnly={true}
                    />
                    No
                  </label>

                  {!fullTankAfter && (
                    <input
                      type="number"
                      className={styles.form__input}
                      value={fuelCost}
                      id="fuelCost"
                      placeholder="Fuel cost"
                      readOnly={true}
                    />
                  )}
                </div>
                <div className={styles.return__form__damage}>
                  <input type="checkbox" id="dmgAfter" checked={!dmgAfter} readOnly={true} />
                  No new damages
                </div>
                <div className={styles.return__form__damage}>
                  <input type="checkbox" id="dmgAfter" checked={dmgAfter} readOnly={true} />
                  New damages
                </div>
                <div className={styles.return__form__textarea}>
                  <textarea id="dmgAfterDesc" readOnly={true} defaultValue={dmgAfterDesc} />
                </div>
                <div className={styles.return__location}>
                  <h3>Return location:</h3>
                  <p>{location?.point}</p>
                </div>
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
                    <p>
                      <strong>{`TOTAL: €${calculateAdditionalCost()}`}</strong>
                    </p>
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

export default HandlingOverCard;
