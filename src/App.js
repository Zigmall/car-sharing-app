import CarGroupElement from './components/carGroup/CarGroupElement';

const App = () => {
  return (
    <div className="App">
      <>
        <CarGroupElement model="Small" active={false} luggage={2} passengers={4} />
        <CarGroupElement model="Suv" active={true} luggage={4} passengers={5} />
        <CarGroupElement model="Sport" active={false} luggage={2} passengers={4} />
        <CarGroupElement model="Regular" active={false} luggage={3} passengers={4} />
        <CarGroupElement model="Estate" active={false} luggage={6} passengers={5} />
      </>
    </div>
  );
};

export default App;
