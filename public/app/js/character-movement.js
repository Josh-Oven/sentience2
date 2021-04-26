export {
  detectCharacterMovement,
  keys,
  moveCharacter,
  returnRelativityStatus,
  returnBlackTollStatus,
  returnLaserStatus,
  returnBoostStatus,
  returnPauseStatus
}

import * as groundWork from './groundwork.js';
let spaceship = groundWork.spaceship;
let pause = groundWork.pause;
let windowWidth = groundWork.windowWidth;
let windowHeight = groundWork.windowHeight;
let relativityStatus = groundWork.relativityStatus;
let blackTollStatus = groundWork.blackTollStatus;
let laserStatus = groundWork.laserStatus;
let boostStatus = groundWork.boostStatus;
let objectScale = groundWork.objectScale;
let objectSpeed = groundWork.objectSpeed;
import * as objects from './objects.js';
import * as abilities from './abilities.js'
let relativityIcon = objects.relativity;
let blackTollIcon = objects.blackToll;
let laserIcon = objects.laser;
let boostIcon = objects.boost;

let cooldownBlock = document.getElementById('cooldown-block')
let tollCooldownBlock = document.getElementById('cooldown-block-blacktoll')
let laserCooldownBlock = document.getElementById('cooldown-block-laser')
let relativityReady = document.getElementById('relativity-ready-border')
let blackTollReady = document.getElementById('blacktoll-ready-border')
let laserReady = document.getElementById('laser-ready-border')
let boostCooldownBlock = document.getElementById('cooldown-block-boost')
let boostReady = document.getElementById('boost-ready-border')

const keys = {};
keys.UP = 38;
keys.LEFT = 37;
keys.RIGHT = 39;
keys.DOWN = 40;
// keys.RELATIVITY = 32;
keys.BLACKTOLL = 65;
keys.LASER = 83;
keys.PAUSE = 27;
keys.BOOST = 68;
keys.JUMP = 32;

let shipRect = spaceship.getBoundingClientRect();
let charX = shipRect.left + shipRect.width / 2;
let charY = shipRect.top + shipRect.height / 2;

let character = {
  x: charX,
  y: charY,
  speedMultiplier: objectSpeed/1.4,
  element: spaceship
};

document.body.onkeyup =
document.body.onkeydown = function(e){

  if (e.preventDefault) {
    e.preventDefault();
  }
  else {
    e.returnValue = false;
  }
  let kc = e.keyCode || e.which;
  keys[kc] = e.type == 'keydown';
};

let moveCharacter = function(dx, dy){
  character.x += (dx||0) * character.speedMultiplier;
  character.y += (dy||0) * character.speedMultiplier;
  character.element.style.left = `${character.x}px`;
  character.element.style.top = `${character.y}px`;
};

let detectCharacterMovement = () => {
  let shipRect = spaceship.getBoundingClientRect();
  let idleScreen = document.getElementById('idle-screen');
  let pauseButton = document.getElementById('pause-button');
  let idlePauseButton = document.getElementById('idle-pause-button');
  idleScreen.style.display = 'none';
  if (keys[keys.PAUSE]) {
    if (pause === false) {
      idleScreen.style.display = 'flex';
      pause = true;
      return pause
    } else if (pause === true) {
      idleScreen.style.display = 'none';
      pause = false;
    }
  }
  if (pause == true) {
    console.log('paused')
    return;
  }
  // console.log('yeeeet', playAreaHeight)
  if (keys[keys.LEFT] && character.x >= 0) {
    moveCharacter(-1, 0);
    if(keys[keys.JUMP]){
      moveCharacter(-20, 0);
      cooldownBlock.style.display = 'block';
      relativityReady.style.display = 'none';
      keys.JUMP = 0;
      setTimeout(()=>{
        keys.JUMP = 32;
        cooldownBlock.style.display = 'none'
        relativityReady.style.display = 'flex';
      },2000)
    }
  }

  if ( keys[keys.RIGHT] && character.x <= windowWidth-(shipRect.width + 10)) {
    moveCharacter(1, 0);
    if(keys[keys.JUMP]){
      moveCharacter(20, 0);
      cooldownBlock.style.display = 'block';
      relativityReady.style.display = 'none';
      keys.JUMP = 0;
      setTimeout(()=>{
        keys.JUMP = 32;
        cooldownBlock.style.display = 'none'
        relativityReady.style.display = 'flex';
      },2000)
    }
  }

  if ( keys[keys.UP] && character.y >= 1) {
    moveCharacter(0, -1);
    if(keys[keys.JUMP]){
      moveCharacter(0, -10);
      cooldownBlock.style.display = 'block';
      relativityReady.style.display = 'none';
      keys.JUMP = 0;
      setTimeout(()=>{
        keys.JUMP = 32;
        cooldownBlock.style.display = 'none'
        relativityReady.style.display = 'flex';
      },2000)
    }
  }

  if ( keys[keys.DOWN] && shipRect.bottom <= windowHeight) {
    moveCharacter(0, 1);
    if(keys[keys.JUMP]){
      moveCharacter(0, 10);
      cooldownBlock.style.display = 'block';
      relativityReady.style.display = 'none';
      keys.JUMP = 0;
      setTimeout(()=>{
        keys.JUMP = 32;
        cooldownBlock.style.display = 'none'
        relativityReady.style.display = 'flex';
      },2000)
    }
  }

  if (keys[keys.RELATIVITY]) {
    console.log('relativity activating');
    relativityStatus = true;
    keys.RELATIVITY = 0;
    spaceship.style.border = '2px solid yellow';
    returnRelativityStatus();
    abilities.relativity();

    setTimeout(()=>{
      relativityStatus = false;
      spaceship.style.border = 'none';
      returnRelativityStatus();
    },10000)



    return relativityStatus;
  }

  if (keys[keys.BLACKTOLL]) {
    tollCooldownBlock.style.display = 'block';
    blackTollReady.style.display = 'none';
    keys.BLACKTOLL = 0;
    console.log('blacktoll')
    blackTollStatus = true;
    returnBlackTollStatus();
    abilities.blackHoleMovement();

    setTimeout(()=>{
      blackTollStatus = false;
      returnBlackTollStatus();
      // console.log(blackHoleElement);
    },7000)

    setTimeout(()=>{
      tollCooldownBlock.style.display = 'none';
      blackTollReady.style.display = 'flex';
      keys.BLACKTOLL = 65;
    },blackTollIcon.cooldown)
    return blackTollStatus;
  }

  if (keys[keys.LASER]) {
    laserCooldownBlock.style.display = 'block';
    laserReady.style.display = 'none';
    keys.LASER = 0;
    console.log('laser activating')
    laserStatus = true;
    returnLaserStatus();
    abilities.laser();

    setTimeout(()=>{
      laserStatus = false;
      returnLaserStatus();
    },5000)

    setTimeout(()=>{
      laserCooldownBlock.style.display = 'none';
      laserReady.style.display = 'flex';
      keys.LASER = 83;
    },laserIcon.cooldown)
    return laserStatus;
  }

  if (keys[keys.BOOST]) {
    boostCooldownBlock.style.display = 'block';
    boostReady.style.display = 'none';
    keys.BOOST = 0;
    // console.log('boost activating')
    boostStatus = true;
    returnBoostStatus();
    abilities.boost();

    setTimeout(()=>{
      boostStatus = false;
      returnBoostStatus();
    },5000)

    setTimeout(()=>{
      boostCooldownBlock.style.display = 'none';
      boostReady.style.display = 'flex';
      keys.BOOST = 68;
    },boostIcon.cooldown)
    return boostStatus;
  }
};

let returnRelativityStatus = () => {
  // console.log(relativityStatus)
  return relativityStatus;
}

let returnBlackTollStatus = () => {
  return blackTollStatus;
}

let returnLaserStatus = () => {
  return laserStatus;
}

let returnBoostStatus = () => {
  return boostStatus;
}

let returnPauseStatus = () => {
  return pause;
}

/// update current position on screen
moveCharacter();
