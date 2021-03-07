export {
  detectCharacterMovement,
  keys,
  moveCharacter,
  returnRelativityStatus
}

import * as groundWork from './groundwork.js';
let spaceship = groundWork.spaceship;
let pause = groundWork.pause;
let windowWidth = groundWork.windowWidth;
let windowHeight = groundWork.windowHeight;
let relativityStatus = groundWork.relativityStatus;

const keys = {};
keys.UP = 38;
keys.LEFT = 37;
keys.RIGHT = 39;
keys.DOWN = 40;
keys.RELATIVITY = 32;

let shipRect = spaceship.getBoundingClientRect();
let charX = shipRect.left + shipRect.width / 2;
let charY = shipRect.top + shipRect.height / 2;

let character = {
  x: charX,
  y: charY,
  speedMultiplier: 5,
  element: spaceship
};

/// key detection (better to use addEventListener, but this will do)
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
  // console.log(relativityStatus)
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
    relativityStatus = true;
    returnRelativityStatus();
    keys.RELATIVITY = 0;
    setTimeout(()=>{
      relativityStatus = false;
      returnRelativityStatus();
      keys.RELATIVITY = 32;
    },6000)
    return relativityStatus;
  }
  // return relativityStatus;
};

let returnRelativityStatus = () => {
  // console.log(relativityStatus)
  return relativityStatus;
}

/// update current position on screen
moveCharacter();
