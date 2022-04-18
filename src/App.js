import CarGroup from './components/carGroup/CarGroup';

const App = () => {
  return (
    <div className="App">
      <>
        <CarGroup model="Small" active={false} luggage={2} passengers={4} />
        <CarGroup model="Suv" active={true} luggage={4} passengers={5} />
        <CarGroup model="Sport" active={false} luggage={2} passengers={4} />
        <CarGroup model="Regular" active={false} luggage={3} passengers={4} />
        <CarGroup model="Estate" active={false} luggage={6} passengers={5} />
      </>
    </div>
  );
};

export default App;
