import React from 'react';
import './App.css';
import Pads from './Drumpad.js';
import Login from './Login'


function App(props) {
  return (
    <div id="root">
      <Login />
      <div className='drum' id='drum-machine'>
        <Pads />
        <div className='footer' id='drum-footer'>
          Made by Adeel Rajwani & Keilen Wiley
      </div>
      </div>
    </div>
  );
}

export default App;
