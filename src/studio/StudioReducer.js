import produce from 'immer'
import NotAlone from "../not-alone/NotAlone"
import MoveRegistry from "../game-api/MoveRegistry"

export default function (state, action) {
  if (!state) {
    const game = new NotAlone()
    game.setup({numberOfPlayers: 3})
    return {game, player: game.getPlayers()[0]}
  }
  return produce(state, draft => {
    draft.game = Object.assign(new NotAlone(), draft.game)
    MoveRegistry.execute(draft.game, action)
    return draft
  })
}