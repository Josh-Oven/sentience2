const spaceship = document.getElementById('spaceship-container');
const keys = {};
keys.UP = 38;
keys.LEFT = 37;
keys.RIGHT = 39;
keys.DOWN = 40;

let shipRect = spaceship.getBoundingClientRect();
// console.log(`shipRectLeft: ${shipRect.left}`, `shipRectRight: ${shipRect.right}`)

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
var detectCharacterMovement = function(){

  if (keys[keys.LEFT]) {
    moveCharacter(-1, 0);
  }
  if ( keys[keys.RIGHT] ) {
    moveCharacter(1, 0);
  }
  if ( keys[keys.UP] ) {
    moveCharacter(0, -1);
  }
  if ( keys[keys.DOWN] ) {
    moveCharacter(0, 1);
  }
};

/// update current position on screen
moveCharacter();

/// game loop
setInterval(function(){
  detectCharacterMovement();
}, 1000/150);
