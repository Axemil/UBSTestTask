import React from 'react';
import './App.scss';
import ComponentsList from './components/ComponentsList/ComponentsList';

function App() {

  return (
      <div className='container'>
          <h1>Exchange Rates (USD)</h1>
          <ComponentsList />
      </div>
  )
}

export default App;
