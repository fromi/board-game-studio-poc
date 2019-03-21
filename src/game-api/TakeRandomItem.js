import RandomMove from "./RandomMove"

export default class TakeRandomItem extends RandomMove {
  takeRandomItemFrom(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}