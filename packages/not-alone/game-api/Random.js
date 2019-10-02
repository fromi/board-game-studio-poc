export function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    const newIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[newIndex]] = [array[newIndex], array[index]];
  }
  return array;
}

export function getRandom(array, quantity = 1) {
  let left = array.length
  const result = new Array(quantity),
    taken = new Array(left)
  if (quantity > left)
    throw new RangeError("getRandom: more elements taken than available");
  while (quantity--) {
    const randomIndex = Math.floor(Math.random() * left);
    result[quantity] = array[randomIndex in taken ? taken[randomIndex] : randomIndex];
    taken[randomIndex] = --left;
  }
  return result;
}