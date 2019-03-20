import RandomMove from "./RandomMove"

export default {
  moves: {},

  registerMove(type, moveClass) {
    if (this.moves.hasOwnProperty(type)) {
      console.error('This type of move has already been registered: ' + type)
    }
    this.moves[type] = moveClass
  },

  createAction(game, type, data) {
    if (this.moves[type].prototype instanceof RandomMove) {
      let move = new this.moves[type](data)
      data = move.prepareAction(game)
    }
    // TODO remove randomness from random moves
    if (typeof data === "object") {
      return Object.assign({type}, data)
    } else {
      return {type, data}
    }
  },

  execute(game, action) {
    let move = new this.moves[action.type](action.data) // Try to pass data by constructor (when data was not an object)
    move = Object.assign(move, action) // Assign move data when it was an object
    move.execute(game, action) // Pass the action so that random data, already generated during action creation, is available
  }
}