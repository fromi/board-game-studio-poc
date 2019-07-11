import {CREATURE} from "../NotAlone"

// eslint-disable-next-line import/no-webpack-loader-syntax
const style = require('sass-extract-loader!../variables.scss');

export const DrawHuntCardDisplay = {
  othersPreAnimationDelay: () => style.global['$other-player-draw-card-pre-animation'].value,
  animationDelay: (move, playerId) => {
    if (playerId === CREATURE) {
      return style.global['$draw-card-animation'].value
    } else {
      return style.global['$other-player-draw-card-animation'].value
    }
  },

  animatingInformation: (t, move, playerId, playersMap) => {
    if (playerId === CREATURE) {
      return t('You draw 3 Hunt cards')
    } else {
      return t('{{player}} draws 3 Hunt cards', {player: playersMap[CREATURE].name, context: playersMap[CREATURE].gender})
    }
  }
}