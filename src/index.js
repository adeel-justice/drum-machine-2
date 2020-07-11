import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


//TODO: keyboard clicks below moved from Drumpad.JS to index because these are global.

function globalKeyDown(evt) {
    if (evt.keyCode === 81) {
        window.DRUM_MACHINE.playSound('CHORD_1')
    }
    else if (evt.keyCode === 87) {
        window.DRUM_MACHINE.playSound('CHORD_2')
    }
    else if (evt.keyCode === 69) {
        window.DRUM_MACHINE.playSound('CHORD_3')
    }
    else if (evt.keyCode === 65) {
        window.DRUM_MACHINE.playSound('SHAKER')
    }
    else if (evt.keyCode === 83) {
        window.DRUM_MACHINE.playSound('OPEN_HH')
    }
    else if (evt.keyCode === 68) {
        window.DRUM_MACHINE.playSound('CLOSED_HH')
    }
    else if (evt.keyCode === 90) {
        window.DRUM_MACHINE.playSound('KICK')
    }
    else if (evt.keyCode === 88) {
        window.DRUM_MACHINE.playSound('SIDE_SHOT')
    }
    else if (evt.keyCode === 67)
        window.DRUM_MACHINE.playSound('SNARE')
}

function addKeyboardEvents() {
    window.addEventListener("keydown", globalKeyDown, false)
}
const sounds = new Map()
sounds.set('CHORD_1', 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3')
sounds.set('CHORD_2', 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3')
sounds.set('CHORD_3', 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3')
sounds.set('SHAKER', 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3')
sounds.set('OPEN_HH', 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3')
sounds.set('CLOSED_HH', 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3')
sounds.set('KICK', 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3')
sounds.set('SIDE_SHOT', 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3')
sounds.set('SNARE', 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3')


window.DRUM_MACHINE = window.DRUM_MACHINE || {}
window.DRUM_MACHINE.playSound = function (soundId) {
    const soundUrl = sounds.get(soundId)
    if (soundUrl) {
        const audio = new Audio(soundUrl)
        audio.play()

    } else {
        console.warn('Hey this is an invalid chord')
    }
}
addKeyboardEvents()