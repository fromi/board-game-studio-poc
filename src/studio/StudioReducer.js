import produce from 'immer'
import NotAlone from "../not-alone/NotAlone"

export default function (state, action) {
  if (!state) {
    const game = new NotAlone()
    game.setup({numberOfPlayers: 3})
    return {game, player: game.getPlayerIds()[0]}
  }
  return {...state, game: produce(state.game, draft => {
      draft = Object.assign(new NotAlone(), draft)
      draft.executeAction(action)
      return draft
    })}
}