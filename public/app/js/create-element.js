export {
  appendSpaceDebree,
  appendOrb
}

import * as abilities from './abilities.js'
import * as objects from './objects.js';
import * as tracker from './position-tracker.js';
import * as groundWork from './groundwork.js'
import * as characterMovement from './character-movement.js'
let returnRelativityStatus = characterMovement.returnRelativityStatus;
let returnBlackTollStatus = characterMovement.returnBlackTollStatus;
let returnLaserStatus = characterMovement.returnLaserStatus;
let returnBoostStatus = characterMovement.returnBoostStatus;

let Orb = objects.Orb;
let pointOrb = objects.pointOrb;
let fuelOrb = objects.fuelOrb;
let healthOrb = objects.healthOrb;

let positionTracker = tracker.positionTracker;
let SpaceDebree = objects.SpaceDebree;
let asteroid = objects.asteroid;
let salvage = objects.salvage;
let debreeOne = groundWork.debreeOne;
let debreeTwo = groundWork.debreeTwo;
let debreeThree = groundWork.debreeThree;
let debreeFour = groundWork.debreeFour;
let windowHeight = groundWork.windowHeight;
let windowWidth = groundWork.windowWidth;
let playArea = groundWork.playArea;
//////////////////////////////////////////////////////////

let debreeArray = [asteroid, salvage];
let createSpaceDebreeTemplate = () => {
  let debreeType = debreeArray[Math.floor(Math.random() * 2)]
  let size = debreeType.size();
  let speed = debreeType.speed;
  let css = debreeType.css();

  let spaceDebree = new SpaceDebree(size, speed, css);
  return spaceDebree;
}

let orbArray = [pointOrb, fuelOrb, healthOrb]
let createOrbTemplate = () => {
  let orbType = orbArray[Math.floor(Math.random() * 3)];
  let type = orbType.type;
  let size = orbType.size;
  let points = orbType.points;
  let health = orbType.health;
  let fuel = orbType.fuel;
  let css = orbType.css();

  let orb = new Orb(type, size, points, health, fuel, css);
  return orb;
}
// createOrbTemplate();

////////////////////////////////////////////////////////

let appendSpaceDebree = () => {
  let template = createSpaceDebreeTemplate();
  let blackTollStatus = returnBlackTollStatus();
  let relativityStatus = returnRelativityStatus();
  let boostStatus =  returnBoostStatus();
  let laserStatus = returnLaserStatus();
  let spaceDebree = document.createElement('div');
  spaceDebree = template._css;
  spaceDebree.id = `spaceDebree`;
  spaceDebree.style.transform = `rotate(${Math.floor(Math.random() * 361)}deg)`
  spaceDebree.style.top = `${Math.floor(Math.random() * (windowHeight - (template._size/2)))}px`;

    if (blackTollStatus === true) {
      positionTracker(document.getElementById('black-toll'), spaceDebree)
    }

    if (laserStatus === true) {
      positionTracker(document.getElementById('laser-container'), spaceDebree)
    }

    if (debreeOne.style.backgroundImage != '') {
      positionTracker(debreeOne, spaceDebree, relativityStatus)
    }

    if (debreeTwo.style.backgroundImage != '') {
      positionTracker(debreeTwo, spaceDebree, relativityStatus)
    }

    if (debreeThree.style.backgroundImage != '') {
      positionTracker(debreeThree, spaceDebree, relativityStatus)
    }

    if (debreeFour.style.backgroundImage != '') {
      positionTracker(debreeFour, spaceDebree, relativityStatus)
    }

    playArea.appendChild(spaceDebree)
    positionTracker(spaceship, spaceDebree, relativityStatus)
  return spaceDebree
}

let appendOrb = () => {
  let orbTemplate = createOrbTemplate();
  let orb = document.createElement('div');
  orb = orbTemplate._css;
  orb.id = orbTemplate._type;
  orb.style.top = `${Math.floor(Math.random() * (windowHeight - (orbTemplate._size/2)))}px`;

  playArea.appendChild(orb)
  positionTracker(spaceship, orb)
return orb;
}
