import SvgIconBar from './components/svgIconBar/SvgIconBar';

const App = () => {
  return (
    <div className="App">
      <>
        <SvgIconBar
          iconHeight={'25'}
          iconWidth={'25'}
          seats={5}
          doors={5}
          bags={4}
          airConditioning={true}
          manualGearBox={true}
        />
      </>
    </div>
  );
};

export default App;
