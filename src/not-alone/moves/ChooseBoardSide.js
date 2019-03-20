import MoveRegistry from '../../game-api/MoveRegistry'
import Move from "../../game-api/Move"

const CHOOSE_BOARD_SIDE = 'Choose board side'

class ChooseBoardSide extends Move {
  constructor(side) {
    super()
    this.side = side
  }

  execute(game) {
    game.boardSide = this.side
  }
}

MoveRegistry.registerMove(CHOOSE_BOARD_SIDE, ChooseBoardSide)

export default CHOOSE_BOARD_SIDE
