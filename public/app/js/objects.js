export {
  spaceship,
  SpaceDebree,
  relativity,
  blackToll
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
  constructor(type, size, speed, image){
    this._type = type;
    this._size = size;
    this._speed = speed;
    this._image = image;
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
