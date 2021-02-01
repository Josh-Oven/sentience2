let playArea = document.getElementById('play-area');
let starRow = document.getElementById('star-row');
let starContainer = document.getElementById('star-container');

let idleScreen = document.getElementById('idle-screen');
let pauseButton = document.getElementById('pause-button');
let idlePauseButton = document.getElementById('idle-pause-button');
idleScreen.style.display = 'none';

pauseButton.addEventListener('click', (()=>{
  idleScreen.style.display = 'flex'
  pause = true;
}))

idlePauseButton.addEventListener('click', (()=>{
  idleScreen.style.display = 'none';
  pause = false;
}))

let Star = {
  constructor(color, size, brightness){
    this.size = size;
    this.color = color;
    this.brightness = brightness;
  }
}

let createStar = () => {
  let colors = ['white', 'white']
  let sizes = ['5px', '10px', '15px']
  let color = colors[Math.floor(Math.random() * 2)]
  let size = sizes[Math.floor(Math.random() * 3)]
  let brightness = `.${Math.floor(Math.random() * 10)}`

  let currentStar = new Star.constructor(color, size, brightness)
  return currentStar;
}
// createStar();

let starNum = 0;
let left = 10;
//////////////////////////////
let populateBackground = () => {
  let template = createStar();
  let newStar = document.createElement('div')
  newStar.id = `newStar${starNum}`;
  let starStyle = newStar.style;


  starStyle.backgroundColor = template.color;
  starStyle.height = template.size;
  starStyle.width = template.size;
  starStyle.opacity = template.brightness;
  // starStyle.border = '1px solid white';
  starStyle.borderRadius = '50%';
  starStyle.marginTop = `${left}px`;
  starStyle.marginLeft = `${left}px`;

  // console.log('backgroundcolor', starStyle.backgroundColor)
  // console.log('height', starStyle.height)
  // console.log('width', starStyle.width)
  // console.log('opacity', starStyle.opacity)
  // console.log(newStar.id)

  starContainer.appendChild(newStar)
  starNum++;
  left = Math.floor(Math.random() * 100);
  // top = Math.floor(Math.random() * 6);
}

for(let i = 0; i < 300; i++){
  populateBackground();
}

populateBackground();
