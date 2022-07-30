import React, { useState, useContext } from 'react';
import styles from './AddCar.module.scss';
import { GET_BRANDS } from '../../../queries/queries';
import { useQuery } from '@apollo/client';
import AlertContext from '../../../context/alert/alertContext';

const AddCar = () => {
  const [brad, setBrand] = useState('');
  const { loading, error, data } = useQuery(GET_BRANDS);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [model, setModel] = useState('');
  const [year, setYear] = useState(0);
  const [price, setPrice] = useState(0);
  const [mileage, setMileage] = useState(false);
  const [collision, setCollision] = useState(false);
  const [theftProtection, setTheftProtection] = useState(false);
  const [roadsideAssistance, setRoadsideAssistance] = useState(false);
  const [seats, setSeats] = useState(0);
  const [doors, setDoors] = useState(0);
  const [trunk, setTrunk] = useState(0);
  const [engine, setEngine] = useState('');
  const [airConditioning, setAirConditioning] = useState(false);
  const [manualGearBox, setManualGearBox] = useState(false);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  // const [createNewCar] = useMutation(CREATE_NEW_CAR, {
  const createNewCar = () => {
    console.log({
      model,
      year,
      price,
      mileage,
      collision,
      theftProtection,
      roadsideAssistance,
      seats,
      doors,
      trunk,
      engine,
      airConditioning,
      manualGearBox,
      location,
      description
    });
  };

  const handleCreateCar = (e) => {
    e.preventDefault();
    if (
      model === '' ||
      year === 0 ||
      price === 0 ||
      seats === 0 ||
      doors === 0 ||
      trunk === 0 ||
      engine === '' ||
      location === '' ||
      description === ''
    ) {
      setAlert('Please fill out all fields', 'warning');
    } else {
      createNewCar();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return (
      <div className={styles.left__space}>
        <div className={styles.error__message}>
          <p>Something went wrong</p>
        </div>
      </div>
    );
  }
  const brands = data.brands;

  return (
    <>
      {brands && (
        <div className={styles.left__space}>
          <div className={styles.car__wrapper}>
            <div className={styles.car__header}>
              <h1>Add Car</h1>
            </div>
            <form onSubmit={handleCreateCar}>
              <div className={styles.car__form}>
                <div className={styles.form__element}>
                  <div className={styles.brand__list}>
                    <label className={styles.form__label}>Brand</label>
                    <select
                      className={styles.form__select}
                      value={brad}
                      onChange={(e) => setBrand(e.target.value)}>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.form__line}>
                  <div className={styles.form__element}>
                    <label className={styles.form__label}>Model</label>
                    <input
                      type="text"
                      className={styles.form__input}
                      id="city"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </div>

                  <div className={styles.form__element}>
                    <label className={styles.form__label}>Year</label>
                    <input
                      type="number"
                      className={styles.form__input}
                      id="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </div>

                  <div className={styles.form__element}>
                    <label className={styles.form__label}>Pick Up Location</label>
                    <input
                      type="text"
                      className={styles.form__input}
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div className={styles.form__element}>
                    <label className={styles.form__label}>Price</label>
                    <input
                      type="number"
                      className={styles.form__input}
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                <h2>Car benefits</h2>
                <div className={styles.form__line}>
                  <div className={styles.benefit__line}>
                    <div className={styles.benefit__wrapper}>
                      <input
                        type="checkbox"
                        className={styles.benefit__checkbox}
                        id="mileage"
                        checked={mileage}
                        onChange={() => setMileage(!mileage)}
                      />
                      <label className={styles.form__label}>Unlimited Mileage</label>
                    </div>

                    <div className={styles.benefit__wrapper}>
                      <input
                        type="checkbox"
                        className={styles.benefit__checkbox}
                        id="collision"
                        checked={collision}
                        onChange={() => setCollision(!collision)}
                      />
                      <label className={styles.form__label}>Collision Damage Waiver</label>
                    </div>

                    <div className={styles.benefit__wrapper}>
                      <input
                        type="checkbox"
                        className={styles.benefit__checkbox}
                        id="theftProtection"
                        checked={theftProtection}
                        onChange={() => setTheftProtection(!theftProtection)}
                      />
                      <label className={styles.form__label}>Theft Protection</label>
                    </div>

                    <div className={styles.benefit__wrapper}>
                      <input
                        type="checkbox"
                        className={styles.benefit__checkbox}
                        id="roadsideAssistance"
                        checked={roadsideAssistance}
                        onChange={() => setRoadsideAssistance(!roadsideAssistance)}
                      />
                      <label className={styles.form__label}>Roadside Assistance</label>
                    </div>
                  </div>
                </div>

                <h2>Car properties</h2>
                <div className={styles.form__line}>
                  <div className={styles.form__element}>
                    <label className={styles.form__label}>Seats number</label>
                    <input
                      type="number"
                      className={styles.form__input}
                      id="seats"
                      value={seats}
                      onChange={(e) => setSeats(e.target.value)}
                    />
                  </div>

                  <div className={styles.form__element}>
                    <label className={styles.form__label}>Doors number</label>
                    <input
                      type="number"
                      className={styles.form__input}
                      id="doors"
                      value={doors}
                      onChange={(e) => setDoors(e.target.value)}
                    />
                  </div>

                  <div className={styles.form__element}>
                    <label className={styles.form__label}>Trunk capacity</label>
                    <input
                      type="number"
                      className={styles.form__input}
                      id="trunk"
                      value={trunk}
                      onChange={(e) => setTrunk(e.target.value)}
                    />
                  </div>

                  <div className={styles.form__element}>
                    <label className={styles.form__label}>Engine capacity</label>
                    <input
                      type="text"
                      className={styles.form__input}
                      id="engine"
                      value={engine}
                      onChange={(e) => setEngine(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.property__line}>
                <div className={styles.benefit__wrapper}>
                  <input
                    type="checkbox"
                    className={styles.benefit__checkbox}
                    id="airConditioning"
                    checked={airConditioning}
                    onChange={() => setAirConditioning(!airConditioning)}
                  />
                  <label className={styles.form__label}>Air Conditioning</label>
                </div>

                <div className={styles.benefit__wrapper}>
                  <input
                    type="checkbox"
                    className={styles.benefit__checkbox}
                    id="manualGearBox"
                    checked={manualGearBox}
                    onChange={() => setManualGearBox(!manualGearBox)}
                  />
                  <label className={styles.form__label}>Manual Gearbox</label>
                </div>
              </div>
              <div className={styles.property__line}>
                <div className={styles.form__element}>
                  <label className={styles.form__label}>Description</label>
                  <textarea
                    type="textarea"
                    className={styles.textarea__input}
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className={styles.button__update}>
                Create car
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCar;
