import React from 'react';
import PropTypes from 'prop-types';
import { GreenTick } from '../assets/SvgList';
import styles from './Car.module.scss';

const BenefitList = ({ benefits }) => {
  return benefits.map((benefit, index) => (
    <div key={index} className={styles.benefitListItem}>
      <GreenTick iconHeight={'15'} iconWidth={'15'} />
      <p>{benefit}</p>
    </div>
  ));
};

BenefitList.propTypes = {
  benefits: PropTypes.array
};

export default BenefitList;
