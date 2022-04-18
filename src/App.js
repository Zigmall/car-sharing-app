import CarGroup from './components/carGroup/CarGroup';

const App = () => {
  return (
    <div className="App">
      <>
        <CarGroup model="Small" active={false} />
        <CarGroup model="Suv" active={true} />
        <CarGroup model="Sport" active={false} />
        <CarGroup model="Regular" active={false} />
        <CarGroup model="Estate" active={false} />
      </>
    </div>
  );
};

export default App;
