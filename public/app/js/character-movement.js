export {
  detectCharacterMovement,
  keys,
  moveCharacter,
  returnRelativityStatus,
  returnBlackTollStatus
  // cooldownActivate
}

import * as groundWork from './groundwork.js';
let spaceship = groundWork.spaceship;
let pause = groundWork.pause;
let windowWidth = groundWork.windowWidth;
let windowHeight = groundWork.windowHeight;
let relativityStatus = groundWork.relativityStatus;
let blackTollStatus = groundWork.blackTollStatus;
import * as objects from './objects.js';
import * as abilities from './abilities.js'
let relativityIcon = objects.relativity;
let blackTollIcon = objects.blackToll;

let cooldownBlock = document.getElementById('cooldown-block')
let tollCooldownBlock = document.getElementById('cooldown-block-blacktoll')

const keys = {};
keys.UP = 38;
keys.LEFT = 37;
keys.RIGHT = 39;
keys.DOWN = 40;
keys.RELATIVITY = 32;
keys.BLACKTOLL = 87;

let shipRect = spaceship.getBoundingClientRect();
let charX = shipRect.left + shipRect.width / 2;
let charY = shipRect.top + shipRect.height / 2;

let character = {
  x: charX,
  y: charY,
  speedMultiplier: 5,
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

/// character movement update
let moveCharacter = function(dx, dy){
  character.x += (dx||0) * character.speedMultiplier;
  character.y += (dy||0) * character.speedMultiplier;
  character.element.style.left = `${character.x}px`;
  character.element.style.top = `${character.y}px`;
};

/// character control
let detectCharacterMovement = () => {
  if (pause == true) {
    console.log('paused')
    return;
  }
  // console.log('yeeeet', playAreaHeight)
  if (keys[keys.LEFT] && character.x >= -120) {
    // console.log(character.x, windowWidth)
    moveCharacter(-1, 0);
  }

  if ( keys[keys.RIGHT] && character.x <= windowWidth-370) {
    moveCharacter(1, 0);
  }

  if ( keys[keys.UP] && character.y >= 50) {
    moveCharacter(0, -1);
  }

  if ( keys[keys.DOWN] && character.y <= windowHeight - 50) {
    moveCharacter(0, 1);
  }

  if (keys[keys.RELATIVITY]) {
    console.log('relativity activating');
    cooldownBlock.style.display = 'block';
    relativityStatus = true;
    keys.RELATIVITY = 0;
    returnRelativityStatus();

    setTimeout(()=>{
      relativityStatus = false;
      returnRelativityStatus();
    },6000)

    setTimeout(()=>{
      keys.RELATIVITY = 32;
      cooldownBlock.style.display = 'none'
    },relativityIcon.cooldown)

    return relativityStatus;
  }

  if (keys[keys.BLACKTOLL]) {
    tollCooldownBlock.style.display = 'block';
    keys.BLACKTOLL = 0;
    console.log('blacktoll')
    blackTollStatus = true;
    returnBlackTollStatus();
    abilities.blackToll();

    setTimeout(()=>{
      blackTollStatus = false;
      returnBlackTollStatus();
      // console.log(blackHoleElement);
    },7000)

    setTimeout(()=>{
      tollCooldownBlock.style.display = 'none';
      keys.BLACKTOLL = 87;
    },blackTollIcon.cooldown)
    return blackTollStatus;
  }
};

let returnRelativityStatus = () => {
  // console.log(relativityStatus)
  return relativityStatus;
}

let returnBlackTollStatus = () => {
  return blackTollStatus;
}

/// update current position on screen
moveCharacter();
