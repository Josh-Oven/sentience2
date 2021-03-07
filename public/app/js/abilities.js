export {
  relativity
}

import * as groundWork from './groundwork.js';
let debreeOne = groundWork.debreeOne;
let debreeTwo = groundWork.debreeTwo;
let debreeThree = groundWork.debreeThree;
let debreeFour = groundWork.debreeFour;

let relativity = (debree) => {

  if (debreeOne.style.backgroundImage === '') {
    debreeOne.style.backgroundImage = debree.style.backgroundImage;
    debreeOne.style.backgroundSize = debree.style.backgroundSize;
    debreeOne.style.backgroundRepeat = debree.style.backgroundRepeat;
    debreeOne.style.backgroundPosition = debree.style.backgroundPosition;
  }
  else if (debreeOne.style.backgroundImage != '' && debreeTwo.style.backgroundImage === '') {
    debreeTwo.style.backgroundImage = debree.style.backgroundImage;
    debreeTwo.style.backgroundSize = debree.style.backgroundSize;
    debreeTwo.style.backgroundRepeat = debree.style.backgroundRepeat;
    debreeTwo.style.backgroundPosition = debree.style.backgroundPosition;
  }
  else if (debreeOne.style.backgroundImage != '' && debreeTwo.style.backgroundImage != '' && debreeThree.style.backgroundImage === '') {
    debreeThree.style.backgroundImage = debree.style.backgroundImage;
    debreeThree.style.backgroundSize = debree.style.backgroundSize;
    debreeThree.style.backgroundRepeat = debree.style.backgroundRepeat;
    debreeThree.style.backgroundPosition = debree.style.backgroundPosition;
  }
  else if (debreeOne.style.backgroundImage != '' && debreeTwo.style.backgroundImage != '' && debreeThree.style.backgroundImage != '') {
    debreeFour.style.backgroundImage = debree.style.backgroundImage;
    debreeFour.style.backgroundSize = debree.style.backgroundSize;
    debreeFour.style.backgroundRepeat = debree.style.backgroundRepeat;
    debreeFour.style.backgroundPosition = debree.style.backgroundPosition;
  }
}
