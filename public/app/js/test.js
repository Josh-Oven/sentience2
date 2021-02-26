// let positionTracker = (item1, item2) => {
//   let item2Id = item2.id;
//   let windowWidth = window.innerWidth;
//
//   let interval = setInterval(function(){
//
//     let item1Rect = item1Rect.getBoundingClientRect();
//     let oneT = item1Rect.top
//     let oneR = item1Rect.right
//     let oneB = item1Rect.bottom
//     let oneL = item1Rect.left
//     let oneY = item1Rect.top + item1Rect.height / 2;
//     let oneX = item1Rect.left + item1Rect.width / 2;
//
//     let item2Rect = item2.getBoundingClientRect()
//     let twoT = item2Rect.top
//     let twoR = item2Rect.right
//     let twoB = item2Rect.bottom
//     let twoL = item2Rect.left
//     let twoY = item2Rect.top + item2Rect.height / 2;
//     let twoX = item2Rect.left + item2Rect.width / 2;
//
//     let distanceFinder = () => {
//       let distance = Math.sqrt(
//         Math.pow(oneX - twoX, 2) + Math.pow(oneY - twoY, 2)
//       )
//       return distance
//     }
//
//     let distance = distanceFinder(item1Rect, item2);
//
//     if (distance < item1Rect.width - item2Rect.width && twoR > oneL) {
//       if (twoB > oneT && twoT < oneB && relativityStatus === false) {
//         clearInterval(interval);
//         item2.remove();
//         // console.log('ouch')
//         item1.style.border = '1px solid red';
//         setTimeout(function(){
//           item1.style.border = 'none';
//         }, 1000)
//       } else if (twoB > oneT && twoT < oneB && relativityStatus === true) {
//         relativity(item2)
//         item2.remove();
//       } else {
//         return;
//       }
//     }
//   },1000/150)
// }
