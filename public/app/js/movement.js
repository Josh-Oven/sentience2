const playArea = document.getElementById('play-area');
const spaceship = document.getElementById('spaceship-container');
const keys = {};
keys.UP = 38;
keys.LEFT = 37;
keys.RIGHT = 39;
keys.DOWN = 40;
keys.RELATIVITY = 32;
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
let detectCharacterMovement = function(){
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

  if (keys[keys.RELATIVITY]) {
    console.log('relativity activating');
    relativityStatus = true;
    keys.RELATIVITY = 0;
    setTimeout(()=>{
      relativityStatus = false;
      keys.RELATIVITY = 32;
    },5000)
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
  spaceDebree.id = `spaceDebree`;
  let debreeStyle = spaceDebree.style;

  debreeStyle.backgroundImage = template._image;
  debreeStyle.backgroundSize = 'cover';
  debreeStyle.backgroundRepeat = 'no-repeat';
  debreeStyle.backgroundPosition = 'center center';
  debreeStyle.height = `${template._size}px`;
  debreeStyle.width = `${template._size}px`;
  // debreeStyle.border = '1px solid white';
  // debreeStyle.borderRadius = '50%';
  debreeStyle.position = 'fixed';
  debreeStyle.left = `-${template._size}px`;
  debreeStyle.top = `${Math.floor(Math.random() * (windowHeight - (template._size/2)))}px`;

  debreeNum++;
  playArea.appendChild(spaceDebree)
  positionTracker(spaceship, spaceDebree)

    if (debreeOne.style.backgroundImage != '') {
      positionTracker(debreeOne, spaceDebree)
    }

    if (debreeTwo.style.backgroundImage != '') {
      positionTracker(debreeTwo, spaceDebree)
    }

    if (debreeThree.style.backgroundImage != '') {
      positionTracker(debreeThree, spaceDebree)
    }

    if (debreeFour.style.backgroundImage != '') {
      positionTracker(debreeFour, spaceDebree)
    }

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

let positionTracker = (item1, item2) => {

  let interval = setInterval(function(){

    let item1Rect = item1.getBoundingClientRect();
    let oneT = item1Rect.top
    let oneR = item1Rect.right
    let oneB = item1Rect.bottom
    let oneL = item1Rect.left
    let oneY = item1Rect.top + item1Rect.height / 2;
    let oneX = item1Rect.left + item1Rect.width / 2;

    let item2Rect = item2.getBoundingClientRect()
    let twoT = item2Rect.top
    let twoR = item2Rect.right
    let twoB = item2Rect.bottom
    let twoL = item2Rect.left
    let twoY = item2Rect.top + item2Rect.height / 2;
    let twoX = item2Rect.left + item2Rect.width / 2;

    let distanceFinder = () => {
      let distance = Math.sqrt(
        Math.pow(oneX - twoX, 2) + Math.pow(oneY - twoY, 2)
      )
      return distance
    }

    let distance = distanceFinder(item1Rect, item2);
    let collision;

    if (distance < item1Rect.width - item2Rect.width && twoR > oneL) {
      if (twoB > oneT && twoT < oneB) {
        collision = true;
        clearInterval(interval);
        // console.log('collision')
      }
       else {
        return;
      }
    }

    if (distance < item1Rect.width + item2Rect.width && twoL > oneR) {
      if (twoT < oneB && twoB > oneT) {
        collision = true;
        clearInterval(interval);
        // console.log('collision')
      }
       else {
        return;
      }
    }

    // asteroid collision //
    if (item2.id === 'spaceDebree' && collision === true) {
      asteroidCollision(item2, item1, interval)
      // clearInterval(interval);
    }

    // spaceship collision //
    if (item1 === spaceship && collision === true)  {
      spaceshipCollision(item1, item2, interval)
      // clearInterval(interval);
    }

    collision = false;
  },1000/150)
}

///////////////////// collisions //////////////////

/// asteroid collision
let asteroidCollision = (asteroid, item1, interval) => {
  if (item1 === spaceship) {
    console.log('spaceship hit')
  }

  if (item1 === debreeOne || item1=== debreeTwo || item1 === debreeThree || item1 === debreeFour) {
    item1.style.backgroundImage = '';
    console.log('blocked!')
  }

  asteroid.remove();
}
//////////////////////

let abilityStatus = false;

/// spaceship collision
let spaceshipCollision = (spaceship, item1, interval) => {

  if (item1.id === 'spaceDebree' && relativityStatus === true){
    relativity(item1)
  }

  if (item1.id === 'spaceDebree') {
    spaceship.style.border = '2px solid red';
    setTimeout(()=>{
      spaceship.style.border = 'none';
    },2000)
  }
}
///////////////////////

///////////////////////////////////////////////////

let relativityStatus = false;
let debreeOne = document.getElementById('object-one')
let debreeTwo = document.getElementById('object-two')
let debreeThree = document.getElementById('object-three')
let debreeFour = document.getElementById('object-four')

let relativity = (debree) => {

  if (debreeOne.style.backgroundImage === '') {
    debreeOne.style.backgroundImage = debree.style.backgroundImage;
    debreeOne.style.backgroundSize = debree.style.backgroundSize;
    debreeOne.style.backgroundRepeat = debree.style.backgroundRepeat;
    debreeOne.style.backgroundPosition = debree.style.backgroundPosition;
  }
  else if (debreeOne.style.backgroundImage != '' && debreeTwo.style.backgroundImage === '') {
    debreeTwo.style.backgroundImage = debree.style.backgroundImage;
    debreeTwo.style.backgroundSize = debree.style.backgroundSize;
    debreeTwo.style.backgroundRepeat = debree.style.backgroundRepeat;
    debreeTwo.style.backgroundPosition = debree.style.backgroundPosition;
  }
  else if (debreeOne.style.backgroundImage != '' && debreeTwo.style.backgroundImage != '' && debreeThree.style.backgroundImage === '') {
    debreeThree.style.backgroundImage = debree.style.backgroundImage;
    debreeThree.style.backgroundSize = debree.style.backgroundSize;
    debreeThree.style.backgroundRepeat = debree.style.backgroundRepeat;
    debreeThree.style.backgroundPosition = debree.style.backgroundPosition;
  }
  else if (debreeOne.style.backgroundImage != '' && debreeTwo.style.backgroundImage != '' && debreeThree.style.backgroundImage != '') {
    debreeFour.style.backgroundImage = debree.style.backgroundImage;
    debreeFour.style.backgroundSize = debree.style.backgroundSize;
    debreeFour.style.backgroundRepeat = debree.style.backgroundRepeat;
    debreeFour.style.backgroundPosition = debree.style.backgroundPosition;
  }
}

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
