import styles from './Insurance.module.scss';
import PropTypes from 'prop-types';

const Premium = (props) => {
  const { handlePremiumOption } = props;
  const { value } = props;

  const handlePremiumClick = () => {
    const selected = value ? true : true;
    handlePremiumOption(selected);
  };

  return (
    <div
      className={styles.option__wrapper}
      onClick={() => {
        handlePremiumClick();
      }}>
      <div className={styles.option__header}>
        <input
          type="checkbox"
          className={styles.option__header__button}
          checked={value}
          onChange={() => {
            handlePremiumClick();
          }}
        />

        <h4>Premium Disclaimer Package</h4>
      </div>
      <div className={styles.option__body}>
        <br />
        <p>Basic insurance</p>
        <br />
        <p>When choosing the SILVER option, the own contribution is €500.</p>
      </div>
    </div>
  );
};

Premium.propTypes = {
  handlePremiumOption: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired
};

export default Premium;
