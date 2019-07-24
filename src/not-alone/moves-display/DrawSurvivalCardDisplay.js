// eslint-disable-next-line import/no-webpack-loader-syntax
const style = require('sass-extract-loader!../variables.scss');

export const DrawSurvivalCardDisplay = {
  preAnimationDelay: (animation, {playerId}) => playerId !== animation.move.huntedId ? style.global['$other-player-draw-card-pre-animation'].value : 0,

  animationDelay: (animation, {playerId}) => playerId === animation.move.huntedId ?
    style.global['$draw-card-animation'].value :
    style.global['$other-player-draw-card-animation'].value,

  animatingInformation: (t, {playerId, animation}, playersMap) => playerId === animation.move.huntedId ?
    t('You draw a Survival card') :
    t('{player} draws a Survival card', {player: playersMap[animation.move.huntedId].name, gender: playersMap[animation.move.huntedId].gender})
}