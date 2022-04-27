import React from 'react';
import PropTypes from 'prop-types';

const BenefitList = ({ benefits }) => {
  return benefits.map((benefit, index) => (
    <div key={index}>
      <p>icon</p>
      <p>{benefit}</p>
    </div>
  ));
};

BenefitList.propTypes = {
  benefits: PropTypes.array
};

export default BenefitList;
