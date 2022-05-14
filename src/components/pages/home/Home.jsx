import React, { useContext } from 'react';
import List from '../../list/List';
import CarContext from '../../../context/car/carContext';

const Home = () => {
  const carContext = useContext(CarContext);
  const { currentView } = carContext;

  const viewElement = () => {};

  // const [currentIndex, setCurrentIndex] = useState(1);
  // const [numberOfPages, setNumberOfPages] = useState(null);
  // const [tableOfPages, setTableOfPages] = useState(null);

  // const [data, setData] = useState(cars);

  const changePage = () => {};
  // const changePage = (index) => {
  //   setCurrentIndex(index);
  //   setData(tableOfPages[index - 1]);
  // };
  return (
    <>
      {currentView && (
        <List
          data={currentView}
          viewElement={viewElement}
          currentIndex={1}
          numberOfPages={1}
          changePage={changePage}
        />
      )}
    </>
  );
};

export default Home;
