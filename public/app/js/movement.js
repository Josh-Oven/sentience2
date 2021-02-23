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
  let size = Math.floor(Math.random() * (75 - 30) + 30);
  if (type == 'asteroid'){
    speed = 3
    image = 'url(../assets/images/space-debree/asteroid4.png)'
  } else if (type == 'metal salvage'){
    speed = 2
    image = 'url(../assets/images/space-debree/asteroid1_150.png)'
  }

  let spaceDebree = new SpaceDebree(type, size, speed, image);
  return spaceDebree;
}

let debreeNum = 0;
let createSpaceDebree = () => {
  let template = createSpaceDebreeTemplate();
  // console.log(template._size)
  let spaceDebree = document.createElement('div');
  spaceDebree.id = `spaceDebree${debreeNum}`;
  let debreeStyle = spaceDebree.style;

  debreeStyle.backgroundImage = template._image;
  debreeStyle.backgroundSize = 'cover';
  debreeStyle.backgroundRepeat = 'no-repeat';
  debreeStyle.backgroundPosition = 'center center';
  debreeStyle.height = `${template._size}px`;
  debreeStyle.width = `${template._size}px`;
  debreeStyle.border = '1px solid white';
  // debreeStyle.borderRadius = '50%';
  debreeStyle.position = 'fixed';
  debreeStyle.left = `-${template._size}px`;
  debreeStyle.top = `${Math.floor(Math.random() * (windowHeight - (template._size/2)))}px`;

  debreeNum++;
  playArea.appendChild(spaceDebree)
  positionTracker(spaceDebree)
  return spaceDebree
}

let objectMovement = () => {
  let debreeLocation = -50;
  let debreeSpeed = 5
  let debree = createSpaceDebree()
  let distance = windowWidth;
  let distanceTraveled = 0;
  let interval = setInterval(function(){
    if(debreeLocation > (distance - 70) && pause === false){
      clearInterval(interval);
      debree.remove();
    } else if (pause === true){
      clearInterval();
    } else {
      debreeLocation += debreeSpeed;
      debree.style.left = `${debreeLocation}px`;
      // console.log(debree.style.left)
    }
  },1000/150)
}

let positionTracker = (debree) => {
  let debreeId = debree.id;
  let windowWidth = window.innerWidth;

  let interval = setInterval(function(){
    let spaceshipRect = spaceship.getBoundingClientRect();
    let st = spaceshipRect.top
    let sr = spaceshipRect.right
    let sb = spaceshipRect.bottom
    let sl = spaceshipRect.left
    let sy = spaceshipRect.top + spaceshipRect.height / 2;
    let sx = spaceshipRect.left + spaceshipRect.width / 2;
    let debreeRect = debree.getBoundingClientRect()
    let dt = debreeRect.top
    let dr = debreeRect.bottom
    let db = debreeRect.right
    let dl = debreeRect.left
    let dy = debreeRect.top + debreeRect.height / 2;
    let dx = debreeRect.left + debreeRect.width / 2;

    let distanceFinder = () => {
      let distance = Math.sqrt(
        Math.pow(sx - dx, 2) + Math.pow(sy - dy, 2)
      )
      return distance
    }

    let distance = distanceFinder();
    // console.log(`distance: ${distanceFinder()}`)

    if (debreeRect.left < (windowWidth - 70) && pause === false){
      // console.log(`left ${spaceshipRect.left}`)
      return;
    } else if (pause === true) {
      clearInterval(interval)
    } else {
      // console.log(`debree: ${debree.id} cleared`)
      clearInterval(interval);
    }



    if (distance < 1000) {
      console.log(distance)
      console.log('ouch left')
      spaceship.style.border = '1px solid red';
      setTimeout(function(){
        spaceship.style.border = '1px solid white';
      }, 1000/150)
    }
  },1000/150)

  // console.log(window.innerWidth);
  // console.log(`debree id: ${debree.id}`)
  // console.log(`ship rect left: ${spaceshipRect.left}`)
  // console.log(`debree rect right: ${debreeRect.right}`)
}

// objectMovement()

/// game loop
let debreeLoop = setInterval(function(){
  if (pause === true){
    return
  } else if (pause === false){
    objectMovement()
  }
}, 1000)

let characterLoop = setInterval(function(){
  detectCharacterMovement();
}, 1000/150);

/////// player movement ////////
