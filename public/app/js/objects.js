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
  salvage
}

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

class SpaceDebree {
  constructor(size, speed, css){
    this._size = size;
    this._speed = speed;
    this._css = css;
  }
}

const asteroid = {
  size: function(){
    return Math.floor(Math.random() * (75 - 30) + 30);
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
    style.left = `-${size}px`;
    return template;
  }
}

const salvage = {
  size: function(){
    return Math.floor(Math.random() * (75 - 30) + 30);
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
    style.left = `-${size}px`;
    return template;
  }
}

class Orb {
  constructor(size, image, points, health, fuel){
    this._size = size;
    this._image = image;
    this._points = points;
    this._health = health;
    this._fuel = fuel;
  }
}

const pointOrb = {
  size: `50px`,
  image: ``,
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
    style.position = 'absolute';
    style.height = this.size;
    style.width = this.size;
    style.left = this.size;
    return template;
  }
}

const fuelOrb = {
  size: `50px`,
  image: ``,
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
    style.position = 'absolute';
    style.height = this.size;
    style.width = this.size;
    style.left = this.size;
    return template;
  }
}

const healthOrb = {
  size: `50px`,
  image: ``,
  points: 0,
  health: 20,
  fuel: 0,
  css: function(){
    let template = document.createElement('div')
    let style = template.style;
    style.backgroundPosition = 'center center';
    style.backgroundRepeat = 'no-repeat';
    style.backgroundImage = `url(${this.image})`;
    style.backgroundSize = 'cover';
    style.position = 'absolute';
    style.height = this.size;
    style.width = this.size;
    style.left = this.size;
    return template;
  }
}

///////////// abilities /////////////
// let relativityHtml = document.getElementById('relativity');
const relativity = {
  thumbnail: '../assets/images/abilities/relativity_thumb.png',
  cooldown: 20000,
  html: document.getElementById('relativity')
}

const blackToll = {
  thumbnail: '../assets/images/abilities/black-toll-thumb.png',
  image: '../assets/images/abilities/black-toll-light-animation.gif',
  cooldown: 20000,
  html: document.getElementById('black-toll'),
  css: function(){
    let template = document.createElement('div')
    let style = template.style;
    style.backgroundPosition = 'center center';
    style.backgroundRepeat = 'no-repeat';
    style.backgroundImage = `url(${this.image})`;
    style.backgroundSize = 'cover';
    style.position = 'absolute';
    style.height = '150px';
    style.width = '150px';
    style.left = '-125%';
    style.top = '-50%';
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
