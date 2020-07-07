import React from 'react';
import './App.css';
import Pads from './Drumpad.js';

function App() {
  return (
    <div className='drum' id='drum-machine'>
      <div id='display' className='drum-display'>
        <h1>Drumpad</h1>
      </div>
      <Pads />
      <div className='footer' id='drum-footer'>
        Made by Adeel Rajwani
      </div>
    </div>
  );
}

export default App;
