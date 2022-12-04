import styles from './Insurance.module.scss';
import PropTypes from 'prop-types';

const Silver = (props) => {
  const { handleSilver } = props;
  const { value } = props;

  return (
    <div
      className={[styles.option__wrapper, value ? styles.option__blue : null].join(' ')}
      onClick={() => handleSilver()}>
      <div className={styles.option__header}>
        <input
          type="checkbox"
          className={styles.option__header__button}
          checked={value}
          onChange={() => handleSilver()}
        />

        <h4>Silver Disclaimer Package</h4>
      </div>
      <div className={styles.option__body}>
        <h5 className={styles.subtitle}>Included in price</h5>
        <p>Basic insurance</p>
        <br />
        <p>When choosing the SILVER option, the own contribution is €500.</p>
      </div>
    </div>
  );
};

Silver.propTypes = {
  handleSilver: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired
};

export default Silver;
