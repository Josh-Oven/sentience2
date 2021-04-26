export {
  positionTracker,
  asteroidCollision,
  spaceshipCollision,
  newScore
}

import * as abilities from './abilities.js';
import * as characterMovement from './character-movement.js';
import * as groundWork from './groundwork.js';
import * as objects from './objects.js';
let relativityObject = objects.relativity;
let score = groundWork.score;
let windowWidth = groundWork.windowWidth
let debreeOne = groundWork.debreeOne;
let debreeTwo = groundWork.debreeTwo;
let debreeThree = groundWork.debreeThree;
let debreeFour = groundWork.debreeFour;
let returnRelativityStatus = characterMovement.returnRelativityStatus;
let returnBlackTollStatus = characterMovement.returnBlackTollStatus;
let returnLaserStatus = characterMovement.returnLaserStatus;
let returnBoostStatus = characterMovement.returnBoostStatus;
let relativity = abilities.relativity;
let relativityDebree = abilities.relativityDebree;
let objectScale = groundWork.objectScale;

// console.log(objects.laser.html)

let positionTracker = (item1, item2, relativityStatus) => {
  // console.log('position', relativityStatus)

  let interval = setInterval(function(){
    let relativityStatus = returnRelativityStatus();
    let blackTollStatus = returnBlackTollStatus();
    let laserStatus = returnLaserStatus();

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

    let rightBorder = windowWidth;
    let distance = distanceFinder(item1Rect, item2);
    let collision;

    if(item1.id === 'spaceDebree'|| item2.id === 'spaceDebree'){
      if(oneR > windowWidth){
        // console.log('border')
        clearInterval(interval)
        interval = 0;
      }
      if(twoR > windowWidth){
        // console.log('border')
        clearInterval(interval)
        interval = 0;
      }
    }

    if (distance < item1Rect.width - item2Rect.width && twoR > oneL) {
      if (twoB > oneT && twoT < oneB) {
        collision = true;
        clearInterval(interval);
        interval = 0;
        // console.log(interval)
      }
       else {
        return;
      }
    }

    if (distance < item1Rect.width - item2Rect.width && twoL > oneR) {
      if (twoT < oneB && twoB > oneT) {
        collision = true;
        clearInterval(interval);
        interval = 0;
        console.log(interval)
      }
       else {
        return;
      }
    }

    if (item2 === document.getElementById('blackhole-test-container') && oneR > twoL && distance < objectScale*5.5) {
      collision = true;
    }

    // asteroid collision //
    if (item2.id === 'spaceDebree' && collision === true) {
      asteroidCollision(item2, item1, interval, relativityStatus)
      // clearInterval(interval);
    }

    // spaceship collision //
    if (item1 === spaceship && collision === true)  {
      spaceshipCollision(item1, item2, interval, relativityStatus)
      // clearInterval(interval);
    }


    collision = false;
  },1000/75)
}

///////////////////// collisions //////////////////

/// asteroid collision
let asteroidCollision = (asteroid, item1, interval, relativityStatus) => {
  let boostStatus = returnBoostStatus();
  if (item1 === spaceship) {
    console.log('spaceship hit')
  }

  if (item1.id === 'relativityDebree0' || item1.id === 'relativityDebree1' || item1.id === 'relativityDebree2' || item1.id === 'relativityDebree3' || item1.id === 'relativityDebree4' || item1.id === 'relativityDebree5' || item1.id === 'relativityDebree6' || item1.id === 'relativityDebree7') {
    console.log('relativityDebree collision')
    relativityObject.debree1.status = false;
    item1.remove();
  }

  if (boostStatus === false){
    asteroid.remove()
  }
}
///////////////////////

/// spaceship collision
let newScore = 0;
let spaceshipCollision = (spaceship, item1, interval, relativityStatus) => {
  let boostStatus = returnBoostStatus();

  if(item1 === document.getElementById('blackhole-test-container')){
    if(boostStatus == true){
      return;
    }else {
      console.log('biggy')
      objects.healthBar.removeHealth();
    }

  }else if(boostStatus === true && item1.id != 'pointOrb' && item1.id != 'fuelOrb' && item1.id != 'healthOrb'){
    console.log('too slow')
    return;
  }else if (item1.id === 'spaceDebree' && relativityStatus === true){
    relativityDebree(item1);
  }else if (item1.id === 'spaceDebree' && relativityStatus === false) {
    objects.healthBar.removeHealth();
  }else if (item1.id === 'pointOrb' || item1.id === 'fuelOrb' || item1.id === 'healthOrb'){

    if (item1.id === 'pointOrb') {
      newScore += 10;
      score.innerHTML = newScore;
    } else if (item1.id === 'healthOrb'){
      if (objects.healthBar.currentSegments == 10){
        newScore += 5;
        score.innerHTML = newScore;
      }
      objects.healthBar.addHealth();
    } else if (item1.id === 'fuelOrb'){
      if(objects.fuelBar.currnetSegments == 20){
        newScore += 5;
        score.innerHTML = newScore;
      }
      objects.fuelBar.addFuel();
    }
    // console.log(item1.id)
    item1.remove()
  }
}
///////////////////////

///////////////////////////////////////////////////
