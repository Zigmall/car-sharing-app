import React, { useContext } from 'react';
import styles from './ReturnSummary.module.scss';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import AuthContext from '../../context/auth/authContext';
import { GET_RENT_BY_ID } from '../../queries/queries';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_RENT } from '../../mutations/mutations';
import AlertContext from '../../context/alert/alertContext';
const ReturnSummary = () => {
  const { rentId } = useParams();
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const navigate = useNavigate();
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [updateRent] = useMutation(UPDATE_RENT, {
    onCompleted: ({ updateRent: { success, message } }) => {
      if (!success) {
        setAlert(message, 'danger');
      } else {
        setAlert('Data updated successfully', 'success');
      }
    },
    onError: (error) => {
      console.log('error:', error.message);
    },
    refetchQueries: [{ query: GET_RENT_BY_ID, variables: { rentId } }]
  });

  const handleUpdateFinanceInRent = () => {
    const input = {
      id: rentId,
      totalCosts: parseInt(rentPrice + additionalCosts),
      allFinancialSorted: true
    };
    updateRent({ variables: { input } });
    console.log('input: ', input);
  };

  const handleUpdateDepositInRent = () => {
    const input = {
      id: rentId,
      depositReturned: true
    };
    updateRent({ variables: { input } });
    console.log('input: ', input);
  };

  const { loading, error, data } = useQuery(GET_RENT_BY_ID, {
    variables: { rentId }
  });

  if (user && user === null) {
    return (
      <div className={styles.page__wrapper}>
        <div className={styles.error__message}>
          <p>You are not authorized to perform this action</p>
        </div>
      </div>
    );
  }

  if (loading)
    return (
      <div className={styles.error__message}>
        <p>Loading...</p>
      </div>
    );

  if (error) {
    console.log(error);
    if (user === null || user === undefined) {
      return (
        <div className={styles.error__message}>
          <p>You need to be log in to see this page</p>
        </div>
      );
    }
    return (
      <div className={styles.error__message}>
        <p>Something went wrong...</p>
      </div>
    );
  }

  const {
    rent: {
      returnDate,
      rentPrice,
      additionalCosts,
      allFinancialSorted,
      totalCosts,
      deposit,
      depositReturned,
      returnLocation
    }
  } = data;

  const transformDate = (date) => {
    if (!date) {
      return 'Not returned yet';
    }
    const result = new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
    return result;
  };

  const displayHandlingOverCard = () => {
    navigate(`/rents/handling-over-card/${rentId}`);
  };

  return (
    <>
      {user && !(user.role === 'ADMIN' || user.role === 'SUPERVISOR') ? (
        <div className={styles.error__message}>
          <h5>You need to be higher rank to perform this action</h5>
        </div>
      ) : (
        <div className={styles.rentSummary__wrapper}>
          <div className={styles.rentSummary__header}>
            <h1>Return Summary</h1>
          </div>
          <div className={styles.rentSummary__content}>
            <div className={styles.rentSummary__content__wrapper}>
              <div
                className={[
                  styles.rentSummary__content__element,
                  returnDate ? styles.background__green : styles.background__red
                ].join(' ')}>
                <div className={styles.rentSummary__content__left__header}>
                  <h2>Car return</h2>
                </div>
                <div className={styles.rentSummary__content__left__body}>
                  <div className={styles.rentSummary__content__left__body__item}>
                    <p>
                      <strong>Return Date</strong>
                    </p>
                    <p>{transformDate(returnDate)}</p>
                  </div>
                  <br />
                  {returnDate && (
                    <div className={styles.rentSummary__content__left__body__item}>
                      <p>
                        <strong>Return Location</strong>
                      </p>
                      <p>{returnLocation}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.rentSummary__content__left__body__item}>
                <button
                  disabled={returnDate ? false : true}
                  className={returnDate ? styles.rentSummary__content__button : styles.grey_button}
                  onClick={() => displayHandlingOverCard()}>
                  Check Handling Over Card
                </button>
              </div>
            </div>

            <div className={styles.rentSummary__content__wrapper}>
              <div
                className={[
                  styles.rentSummary__content__element,
                  allFinancialSorted ? styles.background__green : styles.background__red
                ].join(' ')}>
                <div className={styles.rentSummary__content__middle__header}>
                  <h2>Financial</h2>
                </div>

                <br />
                <div className={styles.rentSummary__content__middle__body}>
                  <div className={styles.rentSummary__content__middle__body__item}>
                    <p>
                      <strong>Total costs: €{rentPrice + additionalCosts}</strong>
                    </p>
                    <br />
                    <p>Already paid: €{allFinancialSorted ? totalCosts : rentPrice}</p>
                    <br />
                    <p>Additional costs: €{additionalCosts}</p>
                    <br />
                    <p>
                      <strong>To be paid: €{allFinancialSorted ? 0 : additionalCosts}</strong>
                    </p>
                  </div>
                  <br />
                </div>
              </div>
              <div className={styles.rentSummary__content__left__body__item}>
                <button
                  disabled={!allFinancialSorted && returnDate ? false : true}
                  className={
                    !allFinancialSorted && returnDate
                      ? styles.rentSummary__content__button
                      : styles.grey_button
                  }
                  onClick={() => handleUpdateFinanceInRent()}>
                  All financial completed
                </button>
              </div>
            </div>

            <div className={styles.rentSummary__content__wrapper}>
              <div
                className={[
                  styles.rentSummary__content__element,
                  depositReturned ? styles.background__green : styles.background__red
                ].join(' ')}>
                <div className={styles.rentSummary__content__right__header}>
                  <h2>Deposit</h2>
                </div>
                <div className={styles.rentSummary__content__right__body}>
                  <div className={styles.rentSummary__content__right__body__item}>
                    <p>Deposit Amount: €{deposit}</p>
                  </div>
                  <br />
                  <div className={styles.rentSummary__content__right__body__item}>
                    <p>
                      <strong>Returned: {depositReturned ? 'Yes' : 'No'}</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.rentSummary__content__left__body__item}>
                <button
                  disabled={!depositReturned && allFinancialSorted ? false : true}
                  className={
                    !depositReturned && allFinancialSorted
                      ? styles.rentSummary__content__button
                      : styles.grey_button
                  }
                  onClick={() => handleUpdateDepositInRent()}>
                  Return deposit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReturnSummary;
