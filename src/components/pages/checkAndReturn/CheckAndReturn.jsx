import { useState } from 'react';
import styles from './CheckAndReturn.module.scss';

const CheckAndReturn = () => {
  const handleCheckboxChange = (setFunction) => {
    setFunction((prevState) => !prevState);
  };

  const milageBefore = 0;
  const fuelLevelBefore = 100;
  const damageBefore = false;
  const damageBeforeDesc = 'Damages description';
  const damageAfter = false;
  const damageAfterDesc = 'Damages description';
  const regDocBefore = true;
  const ocInsBefore = true;
  const fireExtinguisherBefore = true;
  const triangleBefore = true;
  const firstAidKitBefore = true;
  const arealBefore = true;
  const spareWheelBefore = true;
  const additionalGPSBefore = true;
  const userManualBefore = true;

  const [milageAfter, setMilageAfter] = useState(0);
  const [fullTankAfter, setFullTankAfter] = useState(false);
  const [fuelCost, setFuelCost] = useState(0);
  const [dmgBefore, setDmgBefore] = useState(damageBefore);
  const [dmgBeforeDesc, setDmgBeforeDesc] = useState(damageBeforeDesc);
  const [dmgAfter, setDmgAfter] = useState(damageAfter);
  const [dmgAfterDesc, setDmgAfterDesc] = useState(damageAfterDesc);
  const [regDocAfter, setRegDocAfter] = useState(false);
  const [ocInsAfter, setOcInsAfter] = useState(false);
  const [fireExtAfter, setFireExtAfter] = useState(false);
  const [triangleAfter, setTriangleAfter] = useState(false);
  const [firstAidKitAfter, setFirstAidKitAfter] = useState(false);
  const [arealAfter, setArealAfter] = useState(false);
  const [spareWheelAfter, setSpareWheelAfter] = useState(false);
  const [gpsAfter, setGpsAfter] = useState(false);
  const [userManualAfter, setUserManualAfter] = useState(false);

  fuelCost && console.log('fuelCost: ', fuelCost);
  return (
    <div className={styles.return__wrapper}>
      <div className={styles.return__container}>
        <div className={styles.return__header}>
          <h1>Check and Return</h1>
        </div>
        <div className={styles.return__form}>
          <div className={styles.return__form__leftColumn}>
            <div className={styles.return__form__element}>
              <p>{`Milage before: ${milageBefore}`}</p>
            </div>
            <div className={styles.return__form__element}>
              <p>{`Fuel level: ${fuelLevelBefore}%`}</p>
            </div>
            <div className={styles.return__form__damage}>
              <input
                type="checkbox"
                id="dmgBefore"
                checked={dmgBefore}
                onChange={() => handleCheckboxChange(setDmgBefore)}
              />
              No old damages
            </div>
            <div className={styles.return__form__damage}>
              <input
                type="checkbox"
                id="dmgBefore"
                checked={!dmgBefore}
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
            <h2>HANDLING OVER</h2>

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
              <input type="checkbox" id="triangleBefore" checked={triangleBefore} readOnly={true} />
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
                  type="number"
                  id="milageAfter"
                  onChange={(e) => setMilageAfter(e.target.value)}
                  defaultValue={milageAfter}
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
                  id="fuelCost"
                  placeholder="Fuel cost"
                  onChange={(e) => setFuelCost(e.target.value)}
                />
              )}
            </div>
            <div className={styles.return__form__damage}>
              <input
                type="checkbox"
                id="dmgAfter"
                checked={dmgAfter}
                onChange={() => handleCheckboxChange(setDmgAfter)}
              />
              No new damages
            </div>
            <div className={styles.return__form__damage}>
              <input
                type="checkbox"
                id="dmgAfter"
                checked={!dmgAfter}
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
          </div>
        </div>
        <div className={styles.return__footer}>
          <div className={styles.return__footer__element}></div>
          <button className={styles.return__footer__button}>Confirm return</button>
        </div>
      </div>
    </div>
  );
};

export default CheckAndReturn;
