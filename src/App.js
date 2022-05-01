import List from './components/list/List';

const App = () => {
  const viewElement = () => {};
  const data = [
    {
      carClass: 'Sport',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Ford Mustang',
      property: { seats: 4, doors: 3, bags: 2, airConditioning: false, manualGearBox: false },
      location: 'Warszawa',
      price: 50
    },
    {
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Toyota Yaris',
      property: { seats: 4, doors: 5, bags: 3, airConditioning: true, manualGearBox: true },
      location: 'Gdańsk',
      price: 40
    },
    {
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Nissan Micra',
      property: { seats: 4, doors: 5, bags: 4, airConditioning: true, manualGearBox: false },
      location: 'Poznań',
      price: 35
    }
  ];
  return (
    <div className="App">
      <>
        <List data={data} viewElement={viewElement} />
      </>
    </div>
  );
};

export default App;
