export {
  positionTracker,
  asteroidCollision,
  spaceshipCollision
}

import * as abilities from './abilities.js';
import * as characterMovement from './character-movement.js';
import * as groundWork from './groundwork.js';
let debreeOne = groundWork.debreeOne;
let debreeTwo = groundWork.debreeTwo;
let debreeThree = groundWork.debreeThree;
let debreeFour = groundWork.debreeFour;
let returnRelativityStatus = characterMovement.returnRelativityStatus;
let relativity = abilities.relativity;

let positionTracker = (item1, item2, relativityStatus) => {
  // console.log('position', relativityStatus)

  let interval = setInterval(function(){
    let relativityStatus = returnRelativityStatus();

    // console.log(interval)
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
        // clearInterval(interval);
        // console.log('collision')
      }
       else {
        return;
      }
    }

    if (distance < item1Rect.width + item2Rect.width && twoL > oneR) {
      if (twoT < oneB && twoB > oneT) {
        collision = true;
        // clearInterval(interval);
        // console.log('collision')
      }
       else {
        return;
      }
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
  },1000/150)
}

///////////////////// collisions //////////////////

/// asteroid collision
let asteroidCollision = (asteroid, item1, interval, relativityStatus) => {
  // relativityStatus;
  if (item1 === spaceship) {
    console.log('spaceship hit')
  }

  if (relativityStatus != true && item1 === debreeOne || item1 === debreeTwo || item1 === debreeThree || item1 === debreeFour) {
    item1.style.backgroundImage = '';
    console.log('blocked!')
  }
  asteroid.remove()
  clearInterval(interval)
}
///////////////////////

/// spaceship collision
let spaceshipCollision = (spaceship, item1, interval, relativityStatus) => {

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
