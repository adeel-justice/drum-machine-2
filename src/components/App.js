import React from 'react';
import './App.css';
import Pads from './Drumpad.js';


function App(props) {
  return (
    <div className='drum' id='drum-machine'>
      <Pads />
      <div className='footer' id='drum-footer'>
        Made by Adeel Rajwani & Keilen Wiley
      </div>
    </div>
  );
}

export default App;
