export {
  relativity,
  blackToll,
  laser,
  blackHoleMovement,
  boost,
  relativityDebree
}

import * as tracker from './position-tracker.js'
import * as groundwork from './groundwork.js'
let spaceship = groundwork.spaceship
import * as objects from './objects.js'
let objectSpeed = objects.objectSpeed;
let blackTollObject = objects.blackToll
let laserObject = objects.laser
let boostObject = objects.boost
let fuelBar = objects.fuelBar;
let relativityObject = objects.relativity;
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
let returnPauseStatus = characterMovement.returnPauseStatus;
let shipRect = spaceship.getBoundingClientRect()
let boostStatus = groundWork.boostStatus;

//////////////////// RELATIVITY ////////////////////////
let debree1 = relativityObject.debree1
let debree2 = relativityObject.debree2
let debree3 = relativityObject.debree3
let debree4 = relativityObject.debree4
let debree5 = relativityObject.debree5
let debree6 = relativityObject.debree6
let debree7 = relativityObject.debree7
let debree8 = relativityObject.debree8
let debreeArray = [debree1, debree2, debree3, debree4, debree5, debree6, debree7, debree8]
let newDebreeArray = [];

let relativity = () => {

  let debreeTemplate = relativityObject.debreeCss;
  let relativityElement = relativityObject.css();
  relativityElement.id = 'relativity';
  spaceship.appendChild(relativityElement)

  for (let i = 0; i < debreeArray.length; i++){
    let debree = debreeArray[i].position(debreeTemplate());
    debree.id = `relativityDebree${i}`
    relativityElement.innerHTML += debree.outerHTML;
  }

  setTimeout(()=>{
    // relativityElement.remove();
  },6000)

  return relativityElement
}

let relativityDebree = (spaceDebree) => {
  let container = document.getElementById('relativity')
  let image = spaceDebree.style.backgroundImage;

  if (debree1.status == false){
    debree1.status = true;
    let container = document.getElementById('relativityDebree0')
    container.style.backgroundImage = image;
    newDebreeArray.push(container)
  }
  else if (debree2.status == false && debree1.status == true){
    debree2.status = true;
    let container = document.getElementById('relativityDebree1')
    container.style.backgroundImage = image;
    newDebreeArray.push(container)
  }
  else if (debree3.status == false && debree2.status == true){
    debree3.status = true;
    let container = document.getElementById('relativityDebree2')
    container.style.backgroundImage = image;
    newDebreeArray.push(container)
  }
  else if (debree4.status == false && debree3.status == true){
    debree4.status = true;
    let container = document.getElementById('relativityDebree3')
    container.style.backgroundImage = image;
    newDebreeArray.push(container)
  }
  else if (debree5.status == false && debree4.status == true){
    debree5.status = true;
    let container = document.getElementById('relativityDebree4')
    container.style.backgroundImage = image;
    newDebreeArray.push(container)
  }
  else if (debree6.status == false && debree5.status == true){
    debree6.status = true;
    let container = document.getElementById('relativityDebree5')
    container.style.backgroundImage = image;
    newDebreeArray.push(container)
  }
  else if (debree7.status == false && debree6.status == true){
    debree7.status = true;
    let container = document.getElementById('relativityDebree6')
    container.style.backgroundImage = image;
    newDebreeArray.push(container)
  }
  else if (debree8.status == false && debree7.status == true){
    debree8.status = true;
    let container = document.getElementById('relativityDebree7')
    container.style.backgroundImage = image;
    newDebreeArray.push(container)
  }

  let container1 = document.getElementById('relativityDebree0');
  let container2 = document.getElementById('relativityDebree4');
  let container3 = document.getElementById('relativityDebree2');
  let container4 = document.getElementById('relativityDebree7');
  let container5 = document.getElementById('relativityDebree1');
  let container6 = document.getElementById('relativityDebree5');
  let container7 = document.getElementById('relativityDebree3');
  let container8 = document.getElementById('relativityDebree6');
  let interval = setInterval(()=>{

    if (returnRelativityStatus() === false){
      container1.style.backgroundImage = newDebreeArray[7].style.backgroundImage;
      container2.style.backgroundImage = newDebreeArray[0].style.backgroundImage;
      container3.style.backgroundImage = newDebreeArray[1].style.backgroundImage;
      container4.style.backgroundImage = newDebreeArray[2].style.backgroundImage;
      container5.style.backgroundImage = newDebreeArray[3].style.backgroundImage;
      container6.style.backgroundImage = newDebreeArray[4].style.backgroundImage;
      container7.style.backgroundImage = newDebreeArray[5].style.backgroundImage;
      container8.style.backgroundImage = newDebreeArray[6].style.backgroundImage;
    }

  },1000)
}
//////////////////////////////////////////////////////

//////////////////// BLACKTOLL ////////////////////////
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
  debreeFinder(blackHole);

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
//////////////////////////////////////////////////////

//////////////////// LASER ////////////////////////
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
  debreeFinder(laserContainer);
  return laserContainer;
}

let removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
////////////////////////////////////////////////////

//////////////////// BOOST ////////////////////////
let boost = () => {
  boostStatus = true;
  returnBoostStatus();
  // console.log('fuel', fuelBar.currentSegments)
  let fuel = fuelBar.currentSegments * 500;
  let shipRect = spaceship.getBoundingClientRect();
  let boost = boostObject.css();
  boost.id = 'boost'
  spaceship.appendChild(boost)
  debreeFinder(boost);

  let interval = setInterval(()=>{
    console.log(fuelBar.currentSegments)
    if (fuelBar.currentSegments === 0) {
      clearInterval(interval);
      interval = 0;
      // console.log('interval, done')
    } else {
      fuelBar.removeFuel();
    }
  },500)

    setTimeout(()=>{
      boostStatus = false;
      returnBoostStatus();
      boost.remove();
      // console.log('timoute, done')
    },fuel+1000)
  return boost
}
////////////////////////////////////////////////////

//////////////////// BIG BLACK HOLE ////////////////////////
let counter = 150;
let blackHole = (element, rect) => {
  returnBoostStatus();
  if (boostStatus === false){
    counter -= .015;
    element.style.right = `${-counter}vh`
  } else if (boostStatus === true){
    counter += .15;
    element.style.right = `${-counter}vh`
  }
}

let blackHoleElement = document.getElementById('blackhole-test-container')
setInterval(()=>{
  let pause = returnPauseStatus();
  if (pause === true){
    return;
  } else {
    let blackHoleRect = blackHoleElement.getBoundingClientRect();
    blackHole(blackHoleElement, blackHoleRect)
  }
},1000/75)
////////////////////////////////////////////////////

///////////////////// debreeFinder ///////////////

let debreeFinder = (ability) => {
  let group = document.getElementsByClassName('spaceDebree')
  for (let i = 0; i < group.length; i++) {
    console.log(group[i])
      tracker.positionTracker(ability, group[i])
  }
}
