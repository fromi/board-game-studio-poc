// eslint-disable-next-line import/no-webpack-loader-syntax
const style = require('sass-extract-loader!../variables.scss');

export const DrawSurvivalCardDisplay = {
  othersPreAnimationDelay: () => style.global['$other-player-draw-card-pre-animation'].value,
  playerAnimationDelay: () => style.global['$draw-card-animation'].value,
  othersAnimationDelay: () => style.global['$other-player-draw-card-animation'].value,

  playerAnimatingInformation: (t) => t('You draw a Survival card'),
  othersAnimatingInformation: (t, move, playerId, playersMap) => t('{player} draws a Survival card', {player: playersMap[move.playerId].name, gender: playersMap[move.playerId].gender})
}