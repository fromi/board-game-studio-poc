import produce from 'immer'
import NotAlone from "../not-alone/NotAlone"

export default function (state, action) {
  if (!state) {
    const game = new NotAlone()
    game.setup({numberOfPlayers: 3})
    return {game, tab: game.getPlayerIds()[0]}
  }
  switch (action.type) {
    case 'SELECT_TAB':
      return {...state, tab: action.tab}
    default:
      return {
        ...state,
        game: produce(state.game, draft => {
          draft = Object.assign(new NotAlone(), draft)
          draft.executeAction(action)
          return draft
        })
      }
  }
}