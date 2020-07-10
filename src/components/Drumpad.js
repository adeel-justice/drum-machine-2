import React, { useState } from 'react';
import './App.css';
import Display from './Display'
// import src from '*.bmp';

function Pad(props) {
  const classStr = props.isActive === true ? 'is-active' : '';
  //same thing as terenary line  above
  //let classStr = ''
  // if (props.isActive === true) classStr = 'is-active'
  return (
    <div className={ classStr } id='drum-pad' onClick={ props.clickFn } >
      { props.label }
    </div>
  );
}


function Pads(props) {
  const [activePadId, setActivePadId] = useState('');
  const [displayId, setDisplayId] = useState('Drumpad')
  const clickQpad = () => {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3')
    setActivePadId('Q_PAD');
    setDisplayId('Chord_1')
    audio.play()

  };
  const clickWpad = () => {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3')
    setActivePadId('W_PAD');
    setDisplayId('Chord_2')
    audio.play()
  };
  const clickEpad = () => {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3')
    setActivePadId('E_PAD');
    setDisplayId('Chord_3')
    audio.play()
  };
  const clickApad = () => {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3')
    setActivePadId('A_PAD');
    setDisplayId('Shaker')
    audio.play()
  };
  const clickSpad = () => {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3')
    setActivePadId('S_PAD');
    setDisplayId('Open_HH')
    audio.play()
  };
  const clickDpad = () => {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3')
    setActivePadId('D_PAD');
    setDisplayId('Closed_HH')
    audio.play()
  };
  const clickZpad = () => {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3')
    setActivePadId('Z_PAD');
    setDisplayId('Kick')
    audio.play()
  };
  const clickXpad = () => {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3')
    setActivePadId('X_PAD');
    setDisplayId('Side-Shot')
    audio.play()
  };
  const clickCpad = () => {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3')
    setActivePadId('C_PAD');
    setDisplayId('Snare')
    audio.play()
  };


  // Keyboard clicks
  window.addEventListener("keydown", keyCodeQ, false)
  function keyCodeQ(key) {
    if (key.keyCode === 81) {
      var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3')
      audio.play()
    }
  }

  window.addEventListener("keydown", keyCodeW, false)
  function keyCodeW(key) {
    if (key.keyCode === 87) {
      var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3')
      audio.play()
    }
  }

  window.addEventListener("keydown", keyCodeE, false)
  function keyCodeE(key) {
    if (key.keyCode === 69) {
      var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3')
      audio.play()
    }
  }

  window.addEventListener("keydown", keyCodeA, false)
  function keyCodeA(key) {
    if (key.keyCode === 65) {
      var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3')
      audio.play()
    }
  }

  window.addEventListener("keydown", keyCodeS, false)
  function keyCodeS(key) {
    if (key.keyCode === 83) {

      var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3')
      audio.play()
    }
  }

  window.addEventListener("keydown", keyCodeD, false)
  function keyCodeD(key) {
    if (key.keyCode === 68) {

      var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3')
      audio.play()
    }
  }

  window.addEventListener("keydown", keyCodeZ, false)
  function keyCodeZ(key) {
    if (key.keyCode === 90) {
      var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3')
      audio.play()
    }
  }

  window.addEventListener("keydown", keyCodeX, false)
  function keyCodeX(key) {
    if (key.keyCode === 88) {
      var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3')
      audio.play()
    }
  }

  window.addEventListener("keydown", keyCodeC, false)
  function keyCodeC(key) {
    if (key.keyCode === 67) {
      var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3')
      audio.play()
    }
  }


  return (
    <div>
      <div id='display' className='drum-machine'>
        <Display displayId={ displayId } />
      </div>
      <div className='drum-pads' id='drum-pads-group'>
        <Pad label='Q' isActive={ activePadId === 'Q_PAD' } clickFn={ clickQpad } />
        <Pad label='W' isActive={ activePadId === 'W_PAD' } clickFn={ clickWpad } />
        <Pad label='E' isActive={ activePadId === 'E_PAD' } clickFn={ clickEpad } />
        <Pad label='A' isActive={ activePadId === 'A_PAD' } clickFn={ clickApad } />
        <Pad label='S' isActive={ activePadId === 'S_PAD' } clickFn={ clickSpad } />
        <Pad label='D' isActive={ activePadId === 'D_PAD' } clickFn={ clickDpad } />
        <Pad label='Z' isActive={ activePadId === 'Z_PAD' } clickFn={ clickZpad } />
        <Pad label='X' isActive={ activePadId === 'X_PAD' } clickFn={ clickXpad } />
        <Pad label='C' isActive={ activePadId === 'C_PAD' } clickFn={ clickCpad } />
      </div>
    </div>
  );
}

export default Pads;
