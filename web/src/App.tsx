import React from 'react';
import { initializeIcons } from '@uifabric/icons';
import './App.css';
import Article from './components/UI/product_box'

initializeIcons();

function App() {
  return (
    <div className="App">
        <Article/>
    </div>
  );
}

export default App;
