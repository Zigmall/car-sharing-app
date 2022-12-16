import React, { useState } from 'react';
import Silver from './Silver';
import styles from './Insurance.module.scss';
import Premium from './Premium';
import EU from './EU';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Insurance = ({ setInsurance, calculateInsurancePrice, active }) => {
  const [silverIsSelected, setSilverIsSelected] = useState(false);
  const [premiumIsSelected, setPremiumIsSelected] = useState(false);
  const [euIsSelected, setEuIsSelected] = useState(false);
  console.log('active', active);

  const handleSilver = () => {
    setSilverIsSelected(true);
    setPremiumIsSelected(false);
    setEuIsSelected(false);
    setInsurance('Silver');
  };

  const handlePremium = () => {
    setPremiumIsSelected(true);
    setSilverIsSelected(false);
    setEuIsSelected(false);
    setInsurance('Premium');
  };

  const handleEU = () => {
    setEuIsSelected(true);
    setSilverIsSelected(false);
    setPremiumIsSelected(false);
    setInsurance('EU');
  };

  const activation = () => {
    if (active === 'Silver') {
      setSilverIsSelected(true);
    } else if (active === 'Premium') {
      setPremiumIsSelected(true);
    } else if (active === 'EU') {
      setEuIsSelected(true);
    }
  };

  useEffect(() => {
    activation();
  }, [active]);

  return (
    <>
      {active && (
        <div className={styles.insurance__wrapper}>
          <Silver
            handleSilver={handleSilver}
            value={silverIsSelected}
            calculateInsurancePrice={calculateInsurancePrice}
          />
          <Premium
            handlePremium={handlePremium}
            value={premiumIsSelected}
            calculateInsurancePrice={calculateInsurancePrice}
          />
          <EU
            handleEU={handleEU}
            value={euIsSelected}
            calculateInsurancePrice={calculateInsurancePrice}
          />
        </div>
      )}
    </>
  );
};

Insurance.propTypes = {
  setInsurance: PropTypes.func.isRequired,
  calculateInsurancePrice: PropTypes.func.isRequired,
  active: PropTypes.string
};

export default Insurance;
