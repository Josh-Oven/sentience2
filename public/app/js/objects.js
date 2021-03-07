export {
  spaceship,
  SpaceDebree
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

const asteroid = {
  currentBuffs: [],
  currentDebuffs: [],
  availableBuffs: [],
  availableDebuffs: []
}

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

class Debuff {
  constructor(name, desc, img, family, type){
    this.name = name;
    this.desc = desc;
    this.img = img;
    this.family = family;
    this.type = type;
  }
}

let asteroidCss = '';
