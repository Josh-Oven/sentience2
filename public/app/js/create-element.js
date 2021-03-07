export {
  appendSpaceDebree
}

import * as objects from './objects.js';
import * as tracker from './position-tracker.js';
import * as groundWork from './groundwork.js'
import * as characterMovement from './character-movement.js'
let returnRelativityStatus = characterMovement.returnRelativityStatus;


let positionTracker = tracker.positionTracker;
let SpaceDebree = objects.SpaceDebree;
let debreeOne = groundWork.debreeOne;
let debreeTwo = groundWork.debreeTwo;
let debreeThree = groundWork.debreeThree;
let debreeFour = groundWork.debreeFour;
let windowHeight = groundWork.windowHeight;
let windowWidth = groundWork.windowWidth;
let playArea = groundWork.playArea;
//////////////////////////////////////////////////////////

let debreeTypes = ['asteroid', 'metal salvage']
let asteroidImages = ['url(../assets/images/space-debree/asteroid4.png)', 'url(../assets/images/space-debree/asteroid1_150.png)']
let metalImages = ['url(../assets/images/space-debree/metal-salvage1.gif)', 'url(../assets/images/space-debree/metal-salvage2.png)']

let createSpaceDebreeTemplate = () => {
  let speed;
  let image;
  let type = debreeTypes[Math.floor(Math.random() * 2)]
  let size = Math.floor(Math.random() * (75 - 30) + 30);

  if (type === 'asteroid'){
    speed = 3
    image = asteroidImages[Math.floor(Math.random() * 2)]
  } else if (type == 'metal salvage'){
    speed = 2
    image = metalImages[Math.floor(Math.random() * 2)]
  }

  let spaceDebree = new SpaceDebree(type, size, speed, image);
  return spaceDebree;
}

////////////////////////////////////////////////////////

let appendSpaceDebree = () => {
  let relativityStatus = returnRelativityStatus();
  let template = createSpaceDebreeTemplate();
  // console.log(template._size)
  let spaceDebree = document.createElement('div');
  spaceDebree.id = `spaceDebree`;
  let debreeStyle = spaceDebree.style;

  debreeStyle.transform = `rotate(${Math.floor(Math.random() * 361)}deg)`
  debreeStyle.backgroundImage = template._image;
  debreeStyle.backgroundSize = 'cover';
  debreeStyle.backgroundRepeat = 'no-repeat';
  debreeStyle.backgroundPosition = 'center center';
  debreeStyle.position = 'fixed';
  debreeStyle.height = `${template._size}px`;
  debreeStyle.width = `${template._size}px`;
  debreeStyle.left = `-${template._size}px`;
  debreeStyle.top = `${Math.floor(Math.random() * (windowHeight - (template._size/2)))}px`;

  playArea.appendChild(spaceDebree)
  positionTracker(spaceship, spaceDebree, relativityStatus)

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

  return spaceDebree
}
