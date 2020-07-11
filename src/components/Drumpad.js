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

  //Mouse
  const clickQpad = () => {
    window.DRUM_MACHINE.playSound('CHORD_1')
    setActivePadId('Q_PAD');
    setDisplayId('Chord_1')

  };
  const clickWpad = () => {
    window.DRUM_MACHINE.playSound('CHORD_2')
    setActivePadId('W_PAD');
    setDisplayId('Chord_2')

  };
  const clickEpad = () => {
    window.DRUM_MACHINE.playSound('CHORD_3')
    setActivePadId('E_PAD');
    setDisplayId('Chord_3')

  };
  const clickApad = () => {
    window.DRUM_MACHINE.playSound('SHAKER')
    setActivePadId('A_PAD');
    setDisplayId('Shaker')

  };
  const clickSpad = () => {
    window.DRUM_MACHINE.playSound('OPEN_HH')
    setActivePadId('S_PAD');
    setDisplayId('Open_HH')

  };
  const clickDpad = () => {
    window.DRUM_MACHINE.playSound('CLOSED_HH')
    setActivePadId('D_PAD');
    setDisplayId('Closed_HH')

  };
  const clickZpad = () => {
    window.DRUM_MACHINE.playSound('KICK')
    setActivePadId('Z_PAD');
    setDisplayId('Kick')

  };
  const clickXpad = () => {
    window.DRUM_MACHINE.playSound('SIDE_SHOT')
    setActivePadId('X_PAD');
    setDisplayId('Side-Shot')

  };
  const clickCpad = () => {
    window.DRUM_MACHINE.playSound('SNARE')
    setActivePadId('C_PAD');
    setDisplayId('Snare')

  };

  // TODO: keyboard clicks moved to index.js example of original below


  // window.addEventListener("keydown", keyCodeQ, false)
  // function keyCodeQ(key) {
  //   if (key.keyCode === 81) {
  //     var audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3')
  //     audio.play()
  //   }
  // }


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
