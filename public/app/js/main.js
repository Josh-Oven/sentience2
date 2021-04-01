import * as positionTracker from './position-tracker.js';
import * as createElement from './create-element.js';
import * as starBackground from './star-background.js';
import * as groundWork from './groundwork.js'
import * as characterMovement from './character-movement.js'
let detectCharacterMovement = characterMovement.detectCharacterMovement;
// let cooldownActivate = characterMovement.cooldownActivate;
let debreeOne = groundWork.debreeOne;
let debreeTwo = groundWork.debreeTwo;
let debreeThree = groundWork.debreeThree;
let debreeFour = groundWork.debreeFour;
let appendSpaceDebree = createElement.appendSpaceDebree;
let playArea = groundWork.playArea;
let spaceship = groundWork.spaceship;
let windowHeight = groundWork.windowHeight;
let windowWidth = groundWork.windowWidth;
let pause = groundWork.pause;
let relativityStatus = groundWork.relativityStatus;
let cooldownBlock = document.getElementById('cooldown-block');

starBackground.starPopulate();

////// screen bounds ///////

let setBoundaries = (height, width) => {
  let playAreaHeight = height;
  let playAreaWidth = width;
  playArea.style.height = `${height}px`;
  playArea.style.width = `${width}px`;
0}

setBoundaries(windowHeight, windowWidth)

let objectMovement = () => {
  let location = -50;
  let debreeSpeed = 5;
  let debree = appendSpaceDebree(relativityStatus)
  let distance = windowWidth;
  let distanceTraveled = 0;
  let interval = setInterval(function(){
    if(location > distance && pause === false){
      clearInterval(interval);
      interval = 0;
      debree.remove();
      // console.log(debree)
    } else if (pause === true){
      return;
    } else {
      location += debreeSpeed;
      debree.style.left = `${location}px`;
      // console.log(debree.style.left)
    }
  },1000/150)
}

/// game loop

let counter = 20000;
let frequency = 5000;
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
let newDebreeLoop = debreeLoop;

let characterLoop = setInterval(function(){
  if (pause === true){
    // clearInterval(characterLoop);
    return
  } else if (pause === false){
    detectCharacterMovement();
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
