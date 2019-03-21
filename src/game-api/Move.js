export default class Move {
  prepareAction() {
    return this
  }

  execute(game, action) {
    throw new Error('You have to implement the method execute for each Move!')
  }
}