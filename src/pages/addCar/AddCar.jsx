import React, { useState, useContext, useRef, useEffect } from 'react';
import styles from './AddCar.module.scss';
import { ALL_CARS } from '../../queries/queries';
// import { useQuery } from '@apollo/client';
import AlertContext from '../../context/alert/alertContext';
import { CREATE_CAR, UPLOAD_IMAGE, UPDATE_CAR } from '../../mutations/mutations';
import { useMutation } from '@apollo/client';
import MiddleIcon from '../../components/groupElement/MiddleIcon';
import AuthContext from '../../context/auth/authContext';
import PropTypes from 'prop-types';

const AddCar = ({ car, brands, classes, locations }) => {
  const handleCheckboxChange = (setFunction) => {
    setFunction((prevState) => !prevState);
  };
  const [isItEdit, setIsItEdit] = useState(false);

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [carClass, setCarClass] = useState('');
  const [year, setYear] = useState(0);
  const [milage, setMilage] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [damaged, setDamaged] = useState(false);
  const [dmgDescription, setDmgDescription] = useState('Damage description');
  const [price, setPrice] = useState(0);
  const [unlimitedMileage, setUnlimitedMileage] = useState(false);
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
  const [mainImage, setMainImage] = useState(null);
  const [smallImages, setSmallImages] = useState([]);
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [smallImagesUrlList, setSmallImagesUrlList] = useState([]);

  const inputRef = useRef();
  const inputRefSmall = useRef();
  const triggerFileSelection = (inputRef) => inputRef.current.click();

  const getCarClassId = (name) => {
    return classes?.find((carClassItem) => carClassItem.name === name).id;
  };

  const getBrandId = (name) => {
    return brands?.find((brandItem) => brandItem.name === name).id;
  };
  const getLocationId = (point) => {
    return locations.find((location) => location.point === point).id;
  };

  const checkIfItsEdit = () => {
    if (car) {
      setIsItEdit(true);
      setBrand(brands && getBrandId(car?.brand?.name));
      setModel(car.model);
      setCarClass(classes && getCarClassId(car?.carClass?.name));
      setYear(car.year);
      setMilage(car.milage);
      setDeposit(car.deposit);
      setDamaged(car.damaged);
      setDmgDescription(car.dmgDescription);
      setPrice(car.price);

      setBenefits(car.benefits);

      setSeats(car.property.seats);
      setDoors(car.property.doors);
      setTrunk(car.property.trunk);
      setEngine(car.property.engine);
      setAirConditioning(car.property.airConditioning);
      setManualGearBox(car.property.manualGearBox);

      setLocation(locations && getLocationId(car?.location?.point));
      setDescription(car.description);
      setMainImage(car.picturePath.url);
      setMainImageUrl(car.picturePath.url);
      // setSmallImages(car.pictures);
      // setSmallImagesUrlList(car.pictures);
    }
  };

  useEffect(() => {
    checkIfItsEdit();
  }, []);

  const resetForm = () => {
    setBrand('');
    setModel('');
    setCarClass('');
    setYear(0);
    setPrice(0);
    setUnlimitedMileage(false);
    setMilage(0);
    setDeposit(0);
    setDamaged(false);
    setDmgDescription('');
    setCollision(false);
    setTheftProtection(false);
    setRoadsideAssistance(false);
    setSeats(0);
    setDoors(0);
    setTrunk(0);
    setEngine('');
    setAirConditioning(false);
    setManualGearBox(false);
    setLocation('');
    setDescription('');
    setMainImage(null);
    setSmallImages([]);
    setMainImageUrl('');
    setSmallImagesUrlList([]);
  };
  const setBenefits = (benefits) => {
    if (benefits.includes('Unlimited mileage')) {
      setUnlimitedMileage(true);
    }
    if (benefits.includes('Collision damage protection')) {
      setCollision(true);
    }
    if (benefits.includes('Theft protection')) {
      setTheftProtection(true);
    }
    if (benefits.includes('Roadside assistance')) {
      setRoadsideAssistance(true);
    }
  };

  const checkBenefits = () => {
    let array = new Array();
    if (unlimitedMileage) {
      array.push('Unlimited mileage');
    }
    if (collision) {
      array.push('Collision damage protection');
    }
    if (theftProtection) {
      array.push('Theft protection');
    }
    if (roadsideAssistance) {
      array.push('Roadside assistance');
    }
    return array;
  };

  const [createNewCar] = useMutation(CREATE_CAR, {
    variables: {
      input: {
        brand,
        model,
        carClass,
        year: parseInt(year),
        price: parseInt(price),
        milage: parseInt(milage),
        deposit: parseInt(deposit),
        benefits: checkBenefits(),
        damaged,
        dmgDescription,
        property: {
          seats,
          doors,
          trunk,
          engine,
          airConditioning,
          manualGearBox
        },
        location,
        description,
        picturePath: {
          url: mainImageUrl
        },
        pictures: smallImagesUrlList
      }
    },
    refetchQueries: [{ query: ALL_CARS }]
  });

  const [updateCar] = useMutation(UPDATE_CAR, {
    variables: {
      input: {
        id: car?.id,
        brand,
        model,
        carClass,
        year: parseInt(year),
        price: parseInt(price),
        milage: parseInt(milage),
        deposit: parseInt(deposit),
        benefits: checkBenefits(),
        damaged,
        dmgDescription,
        property: {
          seats,
          doors,
          trunk,
          engine,
          airConditioning,
          manualGearBox
        },
        location,
        description,
        picturePath: {
          url: mainImageUrl
        }
      }
    },
    refetchQueries: [{ query: ALL_CARS }]
  });

  const [uploadMainImage] = useMutation(UPLOAD_IMAGE, {
    onCompleted: ({ uploadImage }) => {
      if (!uploadImage.success) {
        setAlert('Something went wrong with uploading image. Please try again.', 'danger');
        console.log(uploadImage.message);
      }
    },
    onError: (error) => {
      console.log(error.message);
    }
  });

  const [uploadSmallImage] = useMutation(UPLOAD_IMAGE, {
    onCompleted: ({ uploadImage }) => {
      if (!uploadImage.success) {
        setAlert('Something went wrong with uploading image. Please try again.', 'danger');
        console.log(uploadImage.message);
      }
    },
    onError: (error) => {
      console.log(error.message);
      console.log('error8786');
    }
  });

  const handleCreateCar = (e) => {
    e.preventDefault();
    if (
      brand === '' ||
      model === '' ||
      year === 0 ||
      milage === 0 ||
      deposit === 0 ||
      price === 0 ||
      seats === 0 ||
      doors === 0 ||
      trunk === 0 ||
      engine === '' ||
      location === '' ||
      description === ''
    ) {
      setAlert('Please fill out all fields', 'warning');
    } else if (mainImageUrl === '') {
      setAlert('Please upload main image', 'warning');
    } else {
      !isItEdit
        ? createNewCar().then((res) => {
            if (res.data.createCar.success) {
              setAlert('Car has been added', 'success');
              resetForm();
            } else {
              setAlert('Something went wrong', 'danger');
              console.log(res.data.createCar.message);
            }
          })
        : updateCar().then((res) => {
            if (res.data.updateCar.success) {
              setAlert('Car has been updated', 'success');
            } else {
              setAlert('Something went wrong', 'danger');
              console.log(res.data.updateCar.message);
            }
          });
    }
  };

  const onSelectMainImage = (e) => {
    const picture = e.target.files[0];
    if (!picture) return;
    let reader = new FileReader();
    reader.readAsDataURL(picture);
    reader.addEventListener('load', () => {
      setMainImage(reader.result);
      const input = {
        file: reader.result
      };
      uploadMainImage({ variables: { input } }).then((res) => {
        if (res.data.uploadImage.success) {
          setMainImageUrl(res.data.uploadImage.imageUrl.url);
        }
      });
    });
  };
  const onSelectSmallImage = (e) => {
    const picture = e.target.files[0];
    if (!picture) return;
    let reader = new FileReader();
    reader.readAsDataURL(picture);
    reader.addEventListener('load', () => {
      setSmallImages([...smallImages, reader.result]);
      const input = {
        file: reader.result
      };
      uploadSmallImage({ variables: { input } }).then((res) => {
        if (res.data.uploadImage.success) {
          let element = { url: res.data.uploadImage.imageUrl.url };
          setSmallImagesUrlList([...smallImagesUrlList, element]);
        }
      });
    });
  };

  return (
    <>
      {brands &&
      classes &&
      locations &&
      user &&
      !(user.role === 'ADMIN' || user.role === 'SUPERVISOR') ? (
        <div className={styles.error__message}>
          <h5>You need to be higher rank to perform this action</h5>
        </div>
      ) : (
        <div className={styles.left__space}>
          <div className={styles.car__wrapper}>
            <div className={styles.car__header}>
              <h1>{`${isItEdit ? 'Edit' : 'New'} Car`} </h1>
            </div>
            <form onSubmit={handleCreateCar}>
              <div className={styles.car__form}>
                <div className={styles.form__element}>
                  <div className={styles.brand__list}>
                    <div className={styles.image__wrapper}>
                      {mainImage ? (
                        <div className={styles.main__image__container}>
                          <img src={mainImage} alt="car" />
                        </div>
                      ) : (
                        <div className={styles.main__image__container}>
                          <MiddleIcon model={'Regular'} />
                        </div>
                      )}
                      <div className={styles.small__images__container}>
                        {smallImages.map((image, index) =>
                          image ? (
                            <div className={styles.small__image} key={index}>
                              <img src={image} alt="car" />
                            </div>
                          ) : (
                            <div className={styles.small__image} key={index}>
                              <MiddleIcon model={'Regular'} />
                            </div>
                          )
                        )}
                      </div>
                      <div className={styles.image__buttons}>
                        <input
                          type="file"
                          // accept="image/*"
                          ref={inputRef}
                          onChange={onSelectMainImage}
                          style={{ display: 'none' }}
                        />
                        <button
                          className={styles.button__update}
                          type="button"
                          onClick={() => triggerFileSelection(inputRef)}>
                          Add Main Picture
                        </button>
                        <button
                          className={styles.button__update}
                          type="button"
                          onClick={() => triggerFileSelection(inputRefSmall)}>
                          Add small picture
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          ref={inputRefSmall}
                          onChange={onSelectSmallImage}
                          style={{ display: 'none' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.form__line_top}>
                  <div className={styles.form__input__element}>
                    <label className={styles.form__label}>Brand</label>
                    <select
                      className={styles.form__select}
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.form__input__element}>
                    <label className={styles.form__label}>Car Class</label>
                    <select
                      className={styles.form__select}
                      value={carClass}
                      onChange={(e) => setCarClass(e.target.value)}>
                      {classes.map((element) => (
                        <option key={element.id} value={element.id}>
                          {element.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.form__input__element}>
                    <label className={styles.form__label}>Pick Up Location</label>
                    <select
                      className={styles.form__select}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}>
                      {/* <option value={isItEdit ? location : ''}>{`${
                        isItEdit ? car?.location?.point : 'Select Location'
                      }`}</option> */}
                      {locations.map((element) => (
                        <option key={element.id} value={element.id}>
                          {element.point}
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

                <div className={styles.form__line}>
                  <div className={styles.form__element}>
                    <label className={styles.form__label}>Milage</label>
                    <input
                      type="number"
                      className={styles.form__input}
                      id="milage"
                      value={milage}
                      onChange={(e) => setMilage(e.target.value)}
                    />
                  </div>
                  <div className={styles.form__element}>
                    <label className={styles.form__label}>Deposit</label>
                    <input
                      type="number"
                      className={styles.form__input}
                      id="deposit"
                      value={deposit}
                      onChange={(e) => setDeposit(e.target.value)}
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
                        id="unlimitedMileage"
                        checked={unlimitedMileage}
                        onChange={() => setUnlimitedMileage(!unlimitedMileage)}
                      />
                      <label className={styles.form__label}>Unlimited unlimitedMileage</label>
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
              <div className={styles.description__line}>
                <label className={styles.form__label}>Description</label>
                <textarea
                  type="textarea"
                  className={styles.textarea__input}
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className={styles.return__form__damage}>
                <input
                  type="checkbox"
                  id="damaged"
                  checked={!damaged}
                  onChange={() => handleCheckboxChange(setDamaged)}
                />
                Car not damaged
              </div>
              <div className={styles.return__form__damage}>
                <input
                  type="checkbox"
                  id="damaged"
                  checked={damaged}
                  onChange={() => handleCheckboxChange(setDamaged)}
                />
                Car damaged
              </div>
              {damaged && (
                <div className={styles.return__form__textarea}>
                  <textarea
                    id="dmgDescription"
                    onChange={(e) => setDmgDescription(e.target.value)}
                    defaultValue={dmgDescription}
                  />
                </div>
              )}

              <button type="submit" className={styles.button__update}>
                {`${isItEdit ? 'Edit' : 'Create'} car`}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

AddCar.propTypes = {
  car: PropTypes.object,
  locations: PropTypes.array,
  brands: PropTypes.array,
  classes: PropTypes.array
};

export default AddCar;
