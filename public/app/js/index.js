const playArea = document.getElementById('play-area');

let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

let setBoundaries = (height, width) => {
  playArea.style.height = `${height}px`;
  playArea.style.width = `${width}px`;
}

setBoundaries(windowHeight, windowWidth)
console.log(`new height: ${playArea.style.height}`, `new width: ${playArea.style.width}`)
