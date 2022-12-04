import styles from './Insurance.module.scss';
import PropTypes from 'prop-types';

const Silver = (props) => {
  const { handleSilverOption } = props;
  const { value } = props;

  const handleSilverClick = () => {
    const selected = value ? true : true;
    handleSilverOption(selected);
  };

  return (
    <div
      className={styles.option__wrapper}
      onClick={() => {
        handleSilverClick();
      }}>
      <div className={styles.option__header}>
        <input
          type="checkbox"
          className={styles.option__header__button}
          checked={value}
          onChange={() => {
            handleSilverClick();
          }}
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
  handleSilverOption: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired
};

export default Silver;
