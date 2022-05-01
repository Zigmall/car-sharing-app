import List from './components/list/List';

const App = () => {
  const viewElement = () => {};
  const data = [
    {
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection']
    },
    {
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection']
    },
    {
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection']
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
