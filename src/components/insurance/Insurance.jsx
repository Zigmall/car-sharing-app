import React, { useState } from 'react';
import Silver from './Silver';
import styles from './Insurance.module.scss';
import Premium from './Premium';
import EU from './EU';
import PropTypes from 'prop-types';

const Insurance = ({ setInsurance, calculateInsurancePrice }) => {
  const [silverIsSelected, setSilverIsSelected] = useState(true);
  const [premiumIsSelected, setPremiumIsSelected] = useState(false);
  const [euIsSelected, setEuIsSelected] = useState(false);

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

  return (
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
  );
};

Insurance.propTypes = {
  setInsurance: PropTypes.func.isRequired,
  calculateInsurancePrice: PropTypes.func.isRequired
};

export default Insurance;
