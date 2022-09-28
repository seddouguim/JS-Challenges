function splitShippingBoxes(arr) {
  const packages = [...arr];
  const numberOfPackages = packages.shift();

  let returnValue = {
    message: "",
    boxA: [],
    boxB: [],
    boxAWeight: 0,
    boxBWeight: 0,
  };

  //Sort boxes in descending order
  packages.sort((a, b) => b - a);

  const indexesOfHeavyPackages = [];
  let iterator = 0;
  while (packages[iterator] > 50) {
    indexesOfHeavyPackages.push(iterator);
    iterator++;
  }

  if (indexesOfHeavyPackages.length > 0) {
    returnValue.message =
      "One or more boxes are too heavy. Remove them and try again.";
    return returnValue;
  }

  let boxA = [packages[0]];
  let boxB = packages.slice(1);

  let boxAWeight = packages[0];
  let boxBWeight = boxB.reduce((a, b) => a + b, 0);

  returnValue.boxA = boxA;
  returnValue.boxB = boxB;

  while (boxBWeight >= boxAWeight) {
    const difference = boxBWeight - boxAWeight;
    const closestWeight = boxB.reduce((a, b) => {
      if (Math.abs(b - difference) < Math.abs(a - difference)) {
        return b;
      } else {
        return a;
      }
    });

    boxA.push(closestWeight);
    boxB = boxB.filter((item) => item !== closestWeight);

    boxAWeight = boxA.reduce((a, b) => a + b, 0);

    boxBWeight = boxB.reduce((a, b) => a + b, 0);
  }

  returnValue.boxA = boxA;
  returnValue.boxB = boxB;

  returnValue.boxAWeight = boxAWeight;
  returnValue.boxBWeight = boxBWeight;

  return returnValue;
}

// console.log(
//   splitShippingBoxes([14, 50, 30, 40, 1, 1, 1, 1, 4, 5, 6, 7, 8, 9, 10])
// );

console.log(splitShippingBoxes([6, 5, 3, 2, 4, 1, 2]));
