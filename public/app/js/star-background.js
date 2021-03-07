export {
  starPopulate
}
  let starRow = document.getElementById('star-row');
  let starContainer = document.getElementById('star-container');

  class Star {
    constructor(color, size, brightness){
      this.size = size;
      this.color = color;
      this.brightness = brightness
    }
  }

  let createStar = () => {
    let colors = ['white', 'white']
    let sizes = ['5px', '10px', '15px']
    let color = colors[Math.floor(Math.random() * 2)]
    let size = sizes[Math.floor(Math.random() * 3)]
    let brightness = `.${Math.floor(Math.random() * 10)}`

    let currentStar = new Star(color, size, brightness)
    return currentStar;
  }

  let starNum = 0;
  let left = 10;
  //////////////////////////////
  let appendStar = () => {
    let template = createStar();
    let newStar = document.createElement('div')
    newStar.id = `newStar${starNum}`;
    let starStyle = newStar.style;


    starStyle.backgroundColor = template.color;
    starStyle.height = template.size;
    starStyle.width = template.size;
    starStyle.opacity = template.brightness;
    starStyle.borderRadius = '50%';
    starStyle.marginTop = `${left}px`;
    starStyle.marginLeft = `${left}px`;

    starContainer.appendChild(newStar)
    starNum++;
    left = Math.floor(Math.random() * 100);
  }

let starPopulate = () => {
  for(let i = 0; i < 300; i++){
    appendStar();
  }
}
