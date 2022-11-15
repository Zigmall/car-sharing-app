import React, { useState, useContext, useRef } from 'react';
import styles from './AddCar.module.scss';
import { GET_BRANDS, ALL_CARS } from '../../../queries/queries';
import { useQuery } from '@apollo/client';
import AlertContext from '../../../context/alert/alertContext';
import { CREATE_CAR, UPLOAD_IMAGE } from '../../../mutations/mutations';
import { useMutation } from '@apollo/client';
import MiddleIcon from '../../groupElement/MiddleIcon';

const AddCar = () => {
  const [brand, setBrand] = useState('');
  const { loading, error, data } = useQuery(GET_BRANDS);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [model, setModel] = useState('');
  const [carClass, setCarClass] = useState('');
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
  const [mainImage, setMainImage] = useState(null);
  const [smallImages, setSmallImages] = useState([]);
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [smallImagesUrlList, setSmallImagesUrlList] = useState([]);

  const inputRef = useRef();
  const inputRefSmall = useRef();
  const triggerFileSelection = (inputRef) => inputRef.current.click();

  const resetForm = () => {
    setBrand('');
    setModel('');
    setCarClass('');
    setYear(0);
    setPrice(0);
    setMileage(false);
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

  const checkBenefits = () => {
    let array = new Array();
    if (mileage) {
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
        benefits: checkBenefits(),
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
    onCompleted: () => {
      setAlert('Car has been added', 'success');
      resetForm();
    },
    onError: (error) => {
      console.log(error.message);
    },
    refetchQueries: [{ query: ALL_CARS }]
  });

  const [uploadFile] = useMutation(UPLOAD_IMAGE, {
    onCompleted: ({ uploadImage }) => {
      if (uploadImage.success) {
        setMainImageUrl(uploadImage.imageUrl.url);
      } else setAlert('Something went wrong with uploading image. Please try again.', 'danger');
      console.log(uploadImage.message);
    },
    onError: (error) => {
      console.log(error.message);
    }
  });

  const handleCreateCar = (e) => {
    e.preventDefault();
    if (
      brand === '' ||
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
    } else if (mainImageUrl === '') {
      setAlert('Please upload main image', 'warning');
    } else if (smallImagesUrlList.length < 2) {
      setAlert('Please upload at least 2 small images', 'warning');
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

  const onSelectMainImage = (e) => {
    const picture = e.target.files[0];
    if (!picture) return;
    // convert file to base64 string
    let reader = new FileReader();
    reader.readAsDataURL(picture);
    reader.addEventListener('load', () => {
      setMainImage(reader.result);
      const input = {
        file: reader.result
      };
      uploadFile({ variables: { input } });
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
      uploadFile({ variables: { input } });
    });
  };

  // const removeSmallImage = (index) => {
  //   const newSmallImages = [...smallImages];
  //   newSmallImages.splice(index, 1);
  //   setSmallImages(newSmallImages);
  // };

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
                    <label className={styles.form__label}>Brand</label>
                    <select
                      className={styles.form__select}
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}>
                      <option value="">Select brand</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.form__element}>
                  <label className={styles.form__label}>Car class</label>
                  <input
                    type="text"
                    className={styles.form__input}
                    id="carClass"
                    value={carClass}
                    onChange={(e) => setCarClass(e.target.value)}
                  />
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
