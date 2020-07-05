import React, { useState } from 'react';
import './App.css';
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
  const [activePadId, setActivePadId] = useState(' ');

  const clickQpad = () => {
    // window.addEventListener("keydown", keyCodeQ, false)
    // function keyCodeQ(key) {
    //   if (key.keyCode === 81) {
    //   }
    // }
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3')
    setActivePadId('Q_PAD');
    audio.play()

  };
  const clickWpad = () => {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3')
    setActivePadId('W_PAD');
    audio.play()
  };
  const clickEpad = () => {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3')
    setActivePadId('E_PAD');
    audio.play()
  };
  const clickApad = () => {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3')
    setActivePadId('A_PAD');
    audio.play()
  };
  const clickSpad = () => {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3')
    setActivePadId('S_PAD');
    audio.play()
  };
  const clickDpad = () => {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3')
    setActivePadId('D_PAD');
    audio.play()
  };
  const clickZpad = () => {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3')
    setActivePadId('Z_PAD');
    audio.play()
  };
  const clickXpad = () => {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3')
    setActivePadId('X_PAD');
    audio.play()
  };
  const clickCpad = () => {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3')
    setActivePadId('C_PAD');
    audio.play()
  };


  //FIXME: need to find out why this is not clicking with keycode
  window.addEventListener("keydown", keyCodeQ, false)
  function keyCodeQ(key) {
    if (key.keyCode === 81) {
      var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3')
      setActivePadId('Q_PAD');
      audio.play()
    }
  }


  return (
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
  );
}

export default Pads;
