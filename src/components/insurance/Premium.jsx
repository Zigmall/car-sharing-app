import styles from './Insurance.module.scss';
import PropTypes from 'prop-types';

const Premium = (props) => {
  const { handlePremium } = props;
  const { value } = props;

  return (
    <div
      className={[styles.option__wrapper, value ? styles.option__blue : null].join(' ')}
      onClick={() => handlePremium()}>
      <div className={styles.option__header}>
        <input
          type="checkbox"
          className={styles.option__header__button}
          checked={value}
          onChange={() => handlePremium()}
        />

        <h4>Premium Disclaimer Package</h4>
      </div>
      <div className={styles.option__body}>
        <br />
        <p>PREMIUM option guarantee, the own contribution is €0.</p>
        <br />
        <p>As part of the insurance, you get protection for windows and tires.</p>
        <br />
        <p>Safety package - courtesy car and towing included in the price.</p>
        <br />
        <p>The insurance covers rental only in Poland</p>
      </div>
    </div>
  );
};

Premium.propTypes = {
  handlePremium: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired
};

export default Premium;
