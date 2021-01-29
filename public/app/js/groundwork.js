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
