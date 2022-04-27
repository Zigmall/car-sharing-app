import Car from './components/car/Car';

import SvgIconBar from './components/svgIconBar/SvgIconBar';

const App = () => {
  return (
    <div className="App">
      <>
        <Car carClass={'Economy'} />
        <SvgIconBar iconHeight={'20'} iconWidth={'20'} />
      </>
    </div>
  );
};

export default App;
