export {
  relativity,
  blackToll,
  laser,
  blackHoleMovement,
  boost
}

import * as tracker from './position-tracker.js'
import * as groundwork from './groundwork.js'
let spaceship = groundwork.spaceship
import * as objects from './objects.js'
let blackTollObject = objects.blackToll
let laserObject = objects.laser
let boostObject = objects.boost
let fuelBar = objects.fuelBar;
import * as groundWork from './groundwork.js';
let debreeOne = groundWork.debreeOne;
let debreeTwo = groundWork.debreeTwo;
let debreeThree = groundWork.debreeThree;
let debreeFour = groundWork.debreeFour;
let objectScale = groundWork.objectScale;
let pause = groundWork.pause;
let objectsScale = groundWork.objectScale;
let playArea = groundWork.playArea;
import * as characterMovement from './character-movement.js'
let returnRelativityStatus = characterMovement.returnRelativityStatus;
let returnBlackTollStatus = characterMovement.returnBlackTollStatus;
let returnLaserStatus = characterMovement.returnLaserStatus;
let returnBoostStatus = characterMovement.returnBoostStatus;
let shipRect = spaceship.getBoundingClientRect()

let relativity = (debree) => {

  if (debreeOne.style.backgroundImage === '') {
    // debreeOne.style.transform = `rotate(90deg)`;
    debreeOne.style.backgroundImage = debree.style.backgroundImage;
    debreeOne.style.backgroundSize = debree.style.backgroundSize;
    debreeOne.style.backgroundRepeat = debree.style.backgroundRepeat;
    debreeOne.style.backgroundPosition = debree.style.backgroundPosition;
  }
  else if (debreeOne.style.backgroundImage != '' && debreeTwo.style.backgroundImage === '') {
    // debreeTwo.style.transform = `rotate(90deg)`;
    debreeTwo.style.backgroundImage = debree.style.backgroundImage;
    debreeTwo.style.backgroundSize = debree.style.backgroundSize;
    debreeTwo.style.backgroundRepeat = debree.style.backgroundRepeat;
    debreeTwo.style.backgroundPosition = debree.style.backgroundPosition;
  }
  else if (debreeOne.style.backgroundImage != '' && debreeTwo.style.backgroundImage != '' && debreeThree.style.backgroundImage === '') {
    // debreeThree.style.transform = `rotate(90deg)`;
    debreeThree.style.backgroundImage = debree.style.backgroundImage;
    debreeThree.style.backgroundSize = debree.style.backgroundSize;
    debreeThree.style.backgroundRepeat = debree.style.backgroundRepeat;
    debreeThree.style.backgroundPosition = debree.style.backgroundPosition;
  }
  else if (debreeOne.style.backgroundImage != '' && debreeTwo.style.backgroundImage != '' && debreeThree.style.backgroundImage != '') {
    // debreeFour.style.transform = `rotate(90deg)`;
    debreeFour.style.backgroundImage = debree.style.backgroundImage;
    debreeFour.style.backgroundSize = debree.style.backgroundSize;
    debreeFour.style.backgroundRepeat = debree.style.backgroundRepeat;
    debreeFour.style.backgroundPosition = debree.style.backgroundPosition;
  }
}

let blackToll = () => {
  let shipRect = spaceship.getBoundingClientRect();
  let blackHole = blackTollObject.css();
  blackHole.id = 'black-toll'
  return blackHole
}

let blackHoleMovement = () => {
  let shipRect = spaceship.getBoundingClientRect()
  let blackHole = blackToll();
  console.log(blackHole)
  playArea.appendChild(blackHole)

  setTimeout(()=>{
    let blackTollStatus = returnBlackTollStatus();
    let blackHoleElement = document.getElementById('black-toll');
    blackTollStatus = false;
    returnBlackTollStatus();
    blackHoleElement.remove();
    console.log(blackHole);
  },7000)

  let location = (shipRect.left)-(objectScale*8)
  blackHole.style.left = `${location}px`
  let speed = 2.5;
  let distance = 0;
  let interval = setInterval(()=>{

    let blackTollStatus = returnBlackTollStatus();
    returnBlackTollStatus();
    if (blackTollStatus === false) {
      clearInterval(interval)
      interval = 0;
      return;
    } else {
      blackHole.style.left = `${location}px`
      location -= speed;
    }
  },50)
}

//// IN ORDER TO START TRACKING ON ABILITY ACTIVATION YOURE GOING TO HAVE TO BUILD A FUNCTION THAT FINDS ALL CURRENT SPACE DEBREE ON THE DOM, AND ADDS THEM TO POSITION TRACKER AFTER THE ABILITIES HAVE ACTIVATED ////

let laser = () => {
  let lastLaserPosition = 0;
  let laserContainer = laserObject.css()
  laserContainer.id = 'laser-container';
  let laserLeft = laserObject.leftCss()
  laserLeft.id = 'laser-left';
  let laserMid = laserObject.midCss()
  laserMid.id = 'laser-mid';
  let laserRight= laserObject.rightCss()
  laserRight.id = 'laser-right';

  spaceship.appendChild(laserContainer)
  laserContainer.appendChild(laserRight)
  let counter = 0;
  let interval = setInterval(()=>{
    if (counter === 50){
      clearInterval(interval);
      interval = 0;
    }
    let newMid = laserObject.midCss();
    newMid.id = `laserMid${counter}`
    lastLaserPosition += objectScale;
    newMid.style.right = `${lastLaserPosition}px`;
    laserContainer.appendChild(newMid)
    counter += 1;
  },10)

  setTimeout(()=>{
    let laserStatus = returnLaserStatus();
    laserStatus = false;
    returnLaserStatus();
    removeAllChildNodes(laserContainer)
    laserContainer.remove();
  },5000)
  return laserContainer;
}

let removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

let boost = () => {
  console.log('fuel', fuelBar.currentSegments)
  let fuel = fuelBar.currentSegments * 500;
  let shipRect = spaceship.getBoundingClientRect();
  let boost = boostObject.css();
  boost.id = 'boost'
  spaceship.appendChild(boost)

  let interval = setInterval(()=>{
    if (fuelBar.currentSegments === 0) {
      clearInterval(interval);
      interval = 0;
      console.log('interval, done')
    } else {
      fuelBar.removeFuel();
    }
  },500)

    setTimeout(()=>{
      let boostStatus = returnLaserStatus();
      boostStatus = false;
      returnBoostStatus();
      boost.remove();
      console.log('timoute, done')
    },fuel)
  return boost
}
