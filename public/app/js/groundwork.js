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
  travelDistance,
  objectScale,
  boostStatus
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
let abilityBar = document.getElementById('ability-bar');
let relativityThumb = document.getElementById('relativity');
let blackTollThumb = document.getElementById('blacktoll-icon');
let laserThumb = document.getElementById('laser-icon');
let boostThumb = document.getElementById('boost-icon');
let healthText = document.getElementById('health-text')
let fuelText = document.getElementById('fuel-text')
let distanceText = document.getElementById('distance-text')
let distanceText2 = document.getElementById('distance-text2')
let scoreText = document.getElementById('score-text')
let scoreNum = document.getElementById('score')
let distanceNum = document.getElementById('distance-num')
let pauseText = document.getElementById('pause-button-text')
let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;
let relativityStatus = false;
let blackTollStatus = false;
let laserStatus = false;
let boostStatus = false;

let getPercentage = (num, per) => {
  return (num/100)*per;
}
let objectScale = getPercentage(windowHeight, 8);
console.log(objectScale)

let uiFontSize = objectScale/5;
pauseText.style.fontSize = `${uiFontSize}px`
healthText.style.fontSize = `${uiFontSize}px`
fuelText.style.fontSize = `${uiFontSize}px`
distanceText.style.fontSize = `${uiFontSize}px`
distanceText2.style.fontSize = `${uiFontSize}px`
distanceNum.style.fontSize = `${uiFontSize}px`
scoreNum.style.fontSize = `${uiFontSize}px`
scoreText.style.fontSize = `${uiFontSize}px`

abilityBar.style.height=`${objectScale}px`;
relativityThumb.style.width=`${objectScale}px`;
blackTollThumb.style.width=`${objectScale}px`;
laserThumb.style.width=`${objectScale}px`;
boostThumb.style.width=`${objectScale}px`;
