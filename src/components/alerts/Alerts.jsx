import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import styles from './Alerts.module.scss';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div key={alert.id} className={styles.alertWrapper}>
        <div className={[styles.wrapper, styles[`${alert.type}`]].join(' ')}>
          <div className={styles.alerts}>
            <p> {alert.msg} </p>
          </div>
        </div>
      </div>
    ))
  );
};

export default Alerts;
