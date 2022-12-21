import { useState } from 'react';
import styles from './CheckAndReturn.module.scss';

const CheckAndReturn = () => {
  const handleCheckboxChange = (setFunction) => {
    setFunction((prevState) => !prevState);
  };

  const regDocBefore = true;
  const ocInsBefore = true;
  const fireExtinguisherBefore = true;
  const triangleBefore = true;
  const firstAidKitBefore = true;
  const arealBefore = true;
  const spareWheelBefore = true;
  const additionalGPSBefore = true;
  const userManualBefore = true;

  const [regDocAfter, setRegDocAfter] = useState(false);
  const [ocInsAfter, setOcInsAfter] = useState(false);
  const [fireExtinguisherAfter, setFireExtinguisherAfter] = useState(false);
  const [triangleAfter, setTriangleAfter] = useState(false);
  const [firstAidKitAfter, setFirstAidKitAfter] = useState(false);
  const [arealAfter, setArealAfter] = useState(false);
  const [spareWheelAfter, setSpareWheelAfter] = useState(false);
  const [additionalGPSAfter, setAdditionalGPSAfter] = useState(false);
  const [userManualAfter, setUserManualAfter] = useState(false);

  return (
    <div className={styles.return__wrapper}>
      <div className={styles.return__container}>
        <div className={styles.return__header}>
          <h1>Check and Return</h1>
        </div>
        <div className={styles.return__form}>
          <div className={styles.return__form__leftColumn}>
            <div className={styles.return__form__leftColumn__element}>
              <input type="radio" name="damages-before" value="no-damages" />
              No damages
            </div>
            <div className={styles.return__form__leftColumn__element}>
              <input type="radio" name="damages-before" value="damages" />
              Damages
            </div>
            <div className={styles.return__form__textarea}>
              <textarea
                name="damages-before"
                id="damages-before"
                defaultValue="Damages description"
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
                id="fireExtinguisherAfter"
                checked={fireExtinguisherAfter}
                onChange={() => handleCheckboxChange(setFireExtinguisherAfter)}
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
                id="additionalGPSAfter"
                checked={additionalGPSAfter}
                onChange={() => handleCheckboxChange(setAdditionalGPSAfter)}
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
          </div>
          <div className={styles.return__form__rightColumn}>
            <div className={styles.return__form__leftColumn__element}>
              <input type="radio" name="damages-after" value="no-damages" />
              No new damages
            </div>
            <div className={styles.return__form__leftColumn__element}>
              <input type="radio" name="damages-after" value="damages" />
              New damages
            </div>
            <div className={styles.return__form__textarea}>
              <textarea name="damages-before" id="damages-before" defaultValue="Description" />
            </div>
          </div>
        </div>
        <div className={styles.return__footer}>
          <div className={styles.return__footer__element}>
            <h4>Return date</h4>
          </div>
          <button className={styles.return__footer__button}>Confirm return</button>
        </div>
      </div>
    </div>
  );
};

export default CheckAndReturn;
