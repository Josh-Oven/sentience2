const playArea = document.getElementById('play-area');
const spaceship = document.getElementById('spaceship-container');
const keys = {};
keys.UP = 38;
keys.LEFT = 37;
keys.RIGHT = 39;
keys.DOWN = 40;
let pause = false;

////// screen bounds ///////

let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

let setBoundaries = (height, width) => {
  let playAreaHeight = height;
  let playAreaWidth = width;
  playArea.style.height = `${height}px`;
  playArea.style.width = `${width}px`;
}

setBoundaries(windowHeight, windowWidth)
// console.log(`new height: ${playArea.style.height}`, `new width: ${playArea.style.width}`)

////// screen bounds ///////

/////// player movement ////////

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
  if (pause == true) {
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
};

/// update current position on screen
moveCharacter();

class SpaceDebree {
  constructor(type, size, speed, image){
    this._type = type;
    this._size = size;
    this._speed = speed;
    this._image = image;
  }
}

let createSpaceDebreeTemplate = () => {
  let speed;
  let image;
  let debreeTypes = ['asteroid', 'metal salvage']

  let type = debreeTypes[Math.floor(Math.random() * 2)]
  let size = `${Math.floor(Math.random() * (100 - 50) + 50)}px`
  if (type == 'asteroid'){
    speed = 3
    image = 'grey'
  } else if (type == 'metal salvage'){
    speed = 2
    image = 'green'
  }

  let spaceDebree = new SpaceDebree(type, size, speed, image);
  return spaceDebree;
}

let debreeNum = 0;
let createSpaceDebree = () => {
  let template = createSpaceDebreeTemplate();
  // console.log(template._image)
  let spaceDebree = document.createElement('div');
  spaceDebree.id = `spaceDebree${debreeNum}`;
  let debreeStyle = spaceDebree.style;

  debreeStyle.backgroundColor = template._image;
  debreeStyle.height = template._size;
  debreeStyle.width = template._size;
  debreeStyle.borderRadius = '50%';
  debreeStyle.position = 'fixed';
  debreeStyle.left = '100px';
  debreeStyle.top = `${Math.floor(Math.random() * windowHeight)}px`;

  console.log(debreeStyle.backgroundColor)
  playArea.appendChild(spaceDebree)
  debreeNum++;
}

createSpaceDebree();

let objectMovement = () => {
  debr
}

/// game loop
setInterval(function(){
  detectCharacterMovement();
}, 1000/150);

/////// player movement ////////
