import Car from './components/car/Car';

import SvgIcon from './components/svgIcon/SvgIcon';

const App = () => {
  return (
    <div className="App">
      <>
        <Car carClass={'Economy'} />
        <SvgIcon iconHeight={'50'} iconWidth={'50'} />
      </>
    </div>
  );
};

export default App;
