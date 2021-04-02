export {
  debreeOne,
  debreeTwo,
  debreeThree,
  debreeFour,
  playArea,
  spaceship,
  windowHeight,
  windowWidth,
  pause,
  relativityStatus,
  blackTollStatus,
  score,
  travelDistance
}


let pause = false;
let travelDistance = document.getElementById('distance-num')
let score = document.getElementById('score')
let debreeOne = document.getElementById('object-one');
let debreeTwo = document.getElementById('object-two');
let debreeThree = document.getElementById('object-three');
let debreeFour = document.getElementById('object-four');
let playArea = document.getElementById('play-area');
let spaceship = document.getElementById('spaceship-container');
let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;
let relativityStatus = false;
let blackTollStatus = false;
