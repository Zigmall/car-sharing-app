import CarGroup from './components/carGroup/CarGroup';

const App = () => {
  return (
    <div className="App">
      <>
        <CarGroup model="Small" active={false} />
        <CarGroup model="Suv" active={true} />
        <CarGroup model="Sport" active={false} />
      </>
    </div>
  );
};

export default App;
