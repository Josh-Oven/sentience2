export {
  spaceship,
  SpaceDebree,
  relativity,
  blackToll,
  Orb,
  pointOrb,
  fuelOrb,
  healthOrb,
  asteroid,
  salvage,
  healthBar,
  fuelBar,
  laser,
  boost
}

import * as groundWork from './groundwork.js';
let objectScale = groundWork.objectScale;

let shipRect = groundWork.spaceship.getBoundingClientRect();

const spaceship = {
  currentBuffs: [],
  currentDebuffs: [],
  availableBuffs: [],
  availableDebuffs: [],
  speed: 300,
    speedBoost(){

    },
  condition: 'oof',
  css: ''
}

const healthBar = {
  totalSegments: 10,
  currentSegments: 10,
  html: document.getElementById('health-slider'),
  addHealth: function(){
    if (this.currentSegments === this.totalSegments){
      return;
    } else {
      this.currentSegments += 1;
      let healthPercentage = this.currentSegments * 10;
      this.html.style.left = `${healthPercentage - 100}%`
    }
  },
  removeHealth: function(){
    if (this.currentSegments === 0){
      return;
    } else {
      this.currentSegments -= 1;
      let healthPercentage = this.currentSegments * 10;
      this.html.style.left = `${healthPercentage - 100}%`
    }
  }
}
const fuelBar = {
  totalSegments: 20,
  currentSegments: 0,
  html: document.getElementById('fuel-slider'),
  addFuel: function(){
    if (this.currentSegments === this.totalSegments){
      return;
    } else {
      this.currentSegments += 1;
      let fuelPercentage = this.currentSegments * 5;
      this.html.style.left = `${fuelPercentage - 100}%`
    }
  },
  removeFuel: function(){
    if (this.currentSegments === 0){
      return;
    } else {
      this.currentSegments -= 1;
      let fuelPercentage = this.currentSegments * 5;
      this.html.style.left = `${fuelPercentage - 100}%`
    }
  }
}

// class Collectables {
//   constructor(css) {
//     this._css = function(){
//       let template = document.createElement('div')
//       let style = template.style;
//       let size = this.size()
//       style.backgroundPosition = 'center center';
//       style.backgroundRepeat = 'no-repeat';
//       style.backgroundImage = `url(${this.image[Math.floor(Math.random() * this.image.length)]})`;
//       style.backgroundSize = 'cover';
//       style.position = 'fixed';
//       style.height = `${size}px`;
//       style.width = `${size}px`;
//       style.left = `-${size}px`;
//       return template;
//     }
//   }
// }

class SpaceDebree {
  constructor(size, speed, css){
    this._size = size;
    this._speed = speed;
    this._css = css;
  }
}

const asteroid = {
  size: function(){
    return Math.floor(Math.random() * (objectScale/1.5 - (objectScale/2)) + (objectScale/2));
  },
  speed: 5,
  image: ['../assets/images/space-debree/asteroid4.png', '../assets/images/space-debree/asteroid1_150.png', '../assets/images/space-debree/asteroid2_150.png'],
  css: function(){
    let template = document.createElement('div')
    let style = template.style;
    let size = this.size()
    style.backgroundPosition = 'center center';
    style.backgroundRepeat = 'no-repeat';
    style.backgroundImage = `url(${this.image[Math.floor(Math.random() * this.image.length)]})`;
    style.backgroundSize = 'cover';
    style.position = 'fixed';
    style.height = `${size}px`;
    style.width = `${size}px`;
    style.left = `-${10}%`;
    return template;
  }
}

const salvage = {
  size: function(){
    return Math.floor(Math.random() * (objectScale/1 - (objectScale/2)) + (objectScale/2));
  },
  speed: 3,
  image: ['../assets/images/space-debree/metal-salvage1.gif', '../assets/images/space-debree/metal-salvage2.png'],
  css: function(){
    let template = document.createElement('div')
    let style = template.style;
    let size = this.size()
    style.backgroundPosition = 'center center';
    style.backgroundRepeat = 'no-repeat';
    style.backgroundImage = `url(${this.image[Math.floor(Math.random() * this.image.length)]})`;
    style.backgroundSize = 'cover';
    style.position = 'fixed';
    style.height = `${size}px`;
    style.width = `${size}px`;
    style.left = `-${10}%`;
    return template;
  }
}

class Orb {
  constructor(type, size, points, health, fuel, css){
    this._type = type;
    this._size = size;
    this._points = points;
    this._health = health;
    this._fuel = fuel;
    this._css = css;
  }
}

const pointOrb = {
  type: 'pointOrb',
  size: objectScale/1.5,
  image: `../assets/images/orbs/point-orb-v2.png`,
  points: 50,
  health: 0,
  fuel: 0,
  css: function(){
    let template = document.createElement('div')
    let style = template.style;
    style.backgroundPosition = 'center center';
    style.backgroundRepeat = 'no-repeat';
    style.backgroundImage = `url(${this.image})`;
    style.backgroundSize = 'cover';
    style.position = 'fixed';
    style.height = `${this.size}px`;
    style.width = `${this.size}px`;
    style.left = `-${this.size}%`;
    return template;
  }
}

const fuelOrb = {
  type: 'fuelOrb',
  size: objectScale/1.5,
  image: `../assets/images/orbs/fuel-orb-v2.png`,
  points: 0,
  health: 0,
  fuel: 10,
  css: function(){
    let template = document.createElement('div')
    let style = template.style;
    style.backgroundPosition = 'center center';
    style.backgroundRepeat = 'no-repeat';
    style.backgroundImage = `url(${this.image})`;
    style.backgroundSize = 'cover';
    style.position = 'fixed';
    style.height = `${this.size}px`;
    style.width = `${this.size}px`;
    style.left = `-${this.size}%`;
    return template;
  }
}

const healthOrb = {
  type: 'healthOrb',
  size: objectScale/1.5,
  image: `../assets/images/orbs/health-orb-v2.png`,
  points: 0,
  health: 20,
  fuel: 0,
  css: function(){
    let template = document.createElement('div');
    let style = template.style;
    style.backgroundPosition = 'center center';
    style.backgroundRepeat = 'no-repeat';
    style.backgroundImage = `url(${this.image})`;
    style.backgroundSize = 'cover';
    style.position = 'fixed';
    style.height = `${this.size}px`;
    style.width = `${this.size}px`;
    style.left = `-${this.size}%`;
    return template;
  }
}

///////////// abilities /////////////
const relativity = {
  thumbnail: '../assets/images/abilities/relativity_thumb.png',
  cooldown: 20000,
  html: document.getElementById('relativity'),
  css: function(){
    let template = document.createElement('div');
    let style = template.style;
    style.position = 'aboslute';
    style.width = `${objectScale*3.5}px`;
    style.height = `${objectScale*3.5}px`;
    style.left = `50%`;
    style.transform = 'translate(-35%, -60%)';
    style.borderRadius = `50%`;
    style.border = '1px solid yellow';
    return template;
  },
  debreeCss: function (){
    let template = document.createElement('div');
    let style = template.style;
    style.backgroundPosition = 'center center';
    style.backgroundRepeat = 'no-repeat';
    style.backgroundSize = 'cover';
    style.position =  'fixed';
    style.width = `${15}%`;
    style.height = `${15}%`;
    style.border = '1px solid white';
    return template;
  },
  debree1: {
    status: false,
    position: function(template){
      template.style.left = '50%';
      template.style.transform = 'translate(-50%)';
      return template;
    }
  },
  debree2: {
    status: false,
    position: function(template){
      template.style.top = '85%';
      template.style.left = '50%';
      template.style.transform = 'translate(-50%)';
      return template;
    }
  },
  debree3: {
    status: false,
    position: function(template){
      template.style.top = '42.5%';
      template.style.right = 0;
      return template;
    }
  },
  debree4: {
    status: false,
    position: function(template){
      template.style.top = '42.5%';
      template.style.left = 0;
      return template;
    }
  },
  debree5: {
    status: false,
    position: function(template){
      template.style.top = '15%';
      template.style.right = '15%';
      return template;
    }
  },
  debree6: {
    status: false,
    position: function(template){
      template.style.left = '15%';
      template.style.bottom = '15%';
      return template;
    }
  },
  debree7: {
    status: false,
    position: function(template){
      template.style.top = '15%';
      template.style.left = '15%';
      return template;
    }
  },
  debree8: {
    status: false,
    position: function(template){
      template.style.right = '15%';
      template.style.bottom = '15%';
      return template;
    }
  }
}

const blackToll = {
  thumbnail: '../assets/images/abilities/black-toll-thumb.png',
  image: '../assets/images/abilities/black-toll-light-big.gif',
  cooldown: 20000,
  html: document.getElementById('black-toll'),
  css: function(){
    let shipRect = groundWork.spaceship.getBoundingClientRect();
    let template = document.createElement('div')
    let style = template.style;
    style.backgroundPosition = 'center center';
    style.backgroundRepeat = 'no-repeat';
    style.backgroundImage = `url(${this.image})`;
    style.backgroundSize = 'cover';
    style.position = 'absolute';
    style.height = `${objectScale*8}px`;
    style.width = `${objectScale*8}px`;
    // style.left = `${shipRect.left-(objectScale*8)}px`;
    style.top = `${shipRect.bottom-(objectScale*4.5)}px`;
    return template;
  }
}

const laser = {
  thumbnail: '../assets/images/abilities/laser2-mid.gif',
  image: ['../assets/images/abilities/laser2-end.gif', '../assets/images/abilities/laser2-mid-white.gif', '../assets/images/abilities/laser2.gif'],
  cooldown: 30000,
  html: document.getElementById('laser-container'),
  css: function(){
    let template = document.createElement('div')
    let style = template.style;
    // style.backgroundColor = 'white';
    style.position = 'absolute';
    style.height = `${objectScale}px`;
    style.width = '200vw';
    style.right = '110%';
    style.top = `-${objectScale - objectScale}px`;
    style.display = 'flex';
    style.justifyContent = 'flex-end';
    style.alignItems = 'center';
    style.overFlow = 'hidden';
    style.paddingRight = `${objectScale}px`
    return template;
  },
  leftCss: function(){
    let template = document.createElement('div')
    let style = template.style;
    style.height = `${objectScale}px`;
    style.width = `${objectScale}px`;
    style.backgroundPosition = 'center center';
    style.backgroundRepeat = 'no-repeat';
    style.backgroundImage = `url(${this.image[0]})`;
    style.backgroundSize = 'cover';
    style.left = 0;
    return template;
  },
  midCss: function(){
    let template = document.createElement('div')
    let style = template.style;
    style.height = `${objectScale}px`;
    style.width = `${objectScale}px`;
    style.backgroundPosition = 'center center';
    style.backgroundRepeat = 'no-repeat';
    style.backgroundImage = `url(${this.image[1]})`;
    style.backgroundSize = 'cover';
    style.position = 'absolute';
    style.right = 0;
    return template;
  },
  rightCss: function(){
    let template = document.createElement('div')
    let style = template.style;
    style.height = `${objectScale}px`;
    style.width = `${objectScale}px`;
    style.backgroundPosition = 'center center';
    style.backgroundRepeat = 'no-repeat';
    style.backgroundImage = `url(${this.image[2]})`;
    style.backgroundSize = 'cover';
    style.right = 0;
    style.position = 'absolute';
    return template;
  }
}

const boost = {
  thumbnail: '../assets/images/abilities/boost.gif',
  image: '../assets/images/abilities/boost.gif',
  cooldown: 20000,
  html: document.getElementById('boost-container'),
  css: function(){
    let shipRect = groundWork.spaceship.getBoundingClientRect();
    let template = document.createElement('div')
    let style = template.style;
    style.backgroundPosition = 'center center';
    style.backgroundRepeat = 'no-repeat';
    style.backgroundImage = `url(${this.image})`;
    style.backgroundSize = 'cover';
    style.position = 'absolute';
    style.height = `${objectScale}px`;
    style.width = `${objectScale*2}px`;
    style.left = `${shipRect.width + (objectScale/2)}px`;
    style.top = `-${objectScale-objectScale}px`;
    return template;
  }
}



// const asteroid = {
//   currentBuffs: [],
//   currentDebuffs: [],
//   availableBuffs: [],
//   availableDebuffs: []
// }

// const debuff = {
//     name: 'Shield Sabotage',
//     desc: `Stops target shields from recharging for ${this.duration}.`,
//     img: 'img',
//     family: 'family',
//     type: 'type',
//     duration: 10 + ' seconds'
// }

// console.log(typeof(10 + 'seconds'))
// console.log(debuff.desc)

// class Debuff {
//   constructor(name, desc, img, family, type){
//     this.name = name;
//     this.desc = desc;
//     this.img = img;
//     this.family = family;
//     this.type = type;
//   }
// }
//
// let asteroidCss = '';
