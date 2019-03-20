import Move from "./Move"

export default class RandomMove extends Move {
  prepareAction() {
    throw new Error('You have to implement the method prepareAction for a RandomMove!')
  }

  execute(game, action) {

  }
}