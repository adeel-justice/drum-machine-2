import React, { useState } from 'react';
import './App.css';

function Pad(props) {
  const classStr = props.isActive === true ? 'is-active' : '';
  //same thing as terenary line  above
  //let classStr = ''
  // if (props.isActive === true) classStr = 'is-active'
  return (
    <div className={classStr} id="drum-pad" onClick={props.clickFn}>
      {props.label}
    </div>
  );
}

function Pads(props) {
  const [activePadId, setActivePadId] = useState(' ');

  const clickQpad = () => {
    setActivePadId('Q_PAD');
  };
  const clickWpad = () => {
    setActivePadId('W_PAD');
  };
  const clickEpad = () => {
    setActivePadId('E_PAD');
  };
  const clickApad = () => {
    setActivePadId('A_PAD');
  };
  const clickSpad = () => {
    setActivePadId('S_PAD');
  };
  const clickDpad = () => {
    setActivePadId('D_PAD');
  };
  const clickZpad = () => {
    setActivePadId('Z_PAD');
  };
  const clickXpad = () => {
    setActivePadId('X_PAD');
  };
  const clickCpad = () => {
    setActivePadId('C_PAD');
  };

  return (
    <div className="drum-pads" id="drum-pads-group">
      <Pad label="Q" isActive={activePadId === 'Q_PAD'} clickFn={clickQpad} />
      <Pad label="W" isActive={activePadId === 'W_PAD'} clickFn={clickWpad} />
      <Pad label="E" isActive={activePadId === 'E_PAD'} clickFn={clickEpad} />
      <Pad label="A" isActive={activePadId === 'A_PAD'} clickFn={clickApad} />
      <Pad label="S" isActive={activePadId === 'S_PAD'} clickFn={clickSpad} />
      <Pad label="D" isActive={activePadId === 'D_PAD'} clickFn={clickDpad} />
      <Pad label="Z" isActive={activePadId === 'Z_PAD'} clickFn={clickZpad} />
      <Pad label="X" isActive={activePadId === 'X_PAD'} clickFn={clickXpad} />
      <Pad label="C" isActive={activePadId === 'C_PAD'} clickFn={clickCpad} />
    </div>
  );
}

export default Pads;
