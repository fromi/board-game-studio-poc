// eslint-disable-next-line import/no-webpack-loader-syntax
const style = require('sass-extract-loader!../variables.scss');

export const DrawSurvivalCardUI = {
  animationDelay: (animation, playerId) => playerId === animation.move.huntedId ?
    style.global['$draw-card-animation'].value :
    style.global['$other-player-draw-card-animation'].value - 0.1,

  animationInformation: (t, {playerId, animation, playersMap}) => playerId === animation.move.huntedId ?
    t('You draw a Survival card') :
    t('{player} draws a Survival card', {player: playersMap[animation.move.huntedId].name, gender: playersMap[animation.move.huntedId].gender})
}