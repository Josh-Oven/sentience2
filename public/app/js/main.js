import * as positionTracker from './position-tracker.js';
import * as createElement from './create-element.js';
import * as starBackground from './star-background.js';
import * as groundWork from './groundwork.js'
import * as characterMovement from './character-movement.js'
let detectCharacterMovement = characterMovement.detectCharacterMovement;
let returnBoostStatus = characterMovement.returnBoostStatus;
// let cooldownActivate = characterMovement.cooldownActivate;
let debreeOne = groundWork.debreeOne;
let debreeTwo = groundWork.debreeTwo;
let debreeThree = groundWork.debreeThree;
let debreeFour = groundWork.debreeFour;
let appendSpaceDebree = createElement.appendSpaceDebree;
let appendOrb = createElement.appendOrb;
let playArea = groundWork.playArea;
let spaceship = groundWork.spaceship;
let windowHeight = groundWork.windowHeight;
let windowWidth = groundWork.windowWidth;
let pause = groundWork.pause;
let relativityStatus = groundWork.relativityStatus;
let boostStatus = groundWork.boostStatus;
let cooldownBlock = document.getElementById('cooldown-block');
let travelDistance = groundWork.travelDistance;

starBackground.starPopulate();

////// screen bounds ///////

let setBoundaries = (height, width) => {
  let playAreaHeight = height;
  let playAreaWidth = width;
  playArea.style.height = `${height}px`;
  playArea.style.width = `${width}px`;
0}

setBoundaries(windowHeight, windowWidth)

let shipDistance = 0;
let setTravelDistance = () => {
  let boostStatus = returnBoostStatus();
  if (boostStatus === false){
    shipDistance += 1;
  } else if (boostStatus === true){
    shipDistance+= 10;
  }
  travelDistance.innerHTML = `  ${shipDistance}ly`;
}

let objectMovement = () => {
  let debreeSpeed = .5;
  let boostStatus = returnBoostStatus();
  if (boostStatus === true){
    debreeSpeed = 1.5;
  } else if (boostStatus === false) {
    debreeSpeed = .5
  }
  let location = -10;
  let debree = appendSpaceDebree(relativityStatus)
  // let orb = appendOrb();
  let distance = windowWidth;
  let distanceTraveled = 0;
  let interval = setInterval(function(){
    if(location > distance && pause === false){
      clearInterval(interval);
      interval = 0;
      // orb.remove();
      debree.remove();
      // console.log(debree)
    } else if (pause === true){
      return;
    } else {
      location += debreeSpeed;
      debree.style.left = `${location}%`;
      // orb.style.left = `${location}px`;
      // console.log(debree.style.left)
    }
  },1000/100)
}

let orbMovement = () => {
  let location = -10;
  let orbSpeed = .2;
  let boostStatus = returnBoostStatus();
  if (boostStatus === true){
    orbSpeed = .4;
  } else if (boostStatus === false) {
  orbSpeed = .2
  }
  let orb = appendOrb();
  let distance = windowWidth;
  let distanceTraveled = 0;
  let interval = setInterval(function(){
    if(location > distance && pause === false){
      clearInterval(interval);
      interval = 0;
      orb.remove();
    } else if (pause === true){
      return;
    } else {
      location += orbSpeed;
      orb.style.left = `${location}%`;
    }
  },1000/150)
}

/// game loop

let counter = 5000;
let frequency = 4000;
let counterInterval = setInterval(() => {
  if (pause === true){
    return;
  } else if (counter <= 0){
    counter = 20000;
    return;
  } else {
    counter -= 1000;
  }
    // console.log(counter)
  if (counter <= 0){
    clearInterval(debreeLoop);
    debreeLoop = 0;
    if (frequency != 500){
      frequency -= 500;
    }
    debreeLoop = setInterval(function(){
       if (pause === true){
        return
      } else if (pause === false){
        objectMovement()
      }
      // console.log(`frequency: ${frequency}`)
    }, frequency)
  }
},1000)


let debreeLoop = setInterval(function(){
  // console.log(counter)
   if (pause === true){
    return
  } else if (pause === false){
    objectMovement()
  }
}, frequency)

let orbLoop = setInterval(function(){
  // console.log(counter)
   if (pause === true){
    return
  } else if (pause === false){
    orbMovement()
  }
}, 3000)

let characterLoop = setInterval(function(){
  if (pause === true){
    // clearInterval(characterLoop);
    return
  } else if (pause === false){
    detectCharacterMovement();
    setTravelDistance();
  }
}, 1000/150);


let idleScreen = document.getElementById('idle-screen');
let pauseButton = document.getElementById('pause-button');
let idlePauseButton = document.getElementById('idle-pause-button');
idleScreen.style.display = 'none';

pauseButton.addEventListener('click', (()=>{
  idleScreen.style.display = 'flex';
  pause = true;
  console.log('pause')
}));

idlePauseButton.addEventListener('click', (()=>{
  idleScreen.style.display = 'none';
  pause = false;
  // characterLoop()
  // debreeLoop();
}));

/////// player movement ////////
