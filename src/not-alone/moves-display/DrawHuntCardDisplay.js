import {CREATURE} from "../NotAlone"

// eslint-disable-next-line import/no-webpack-loader-syntax
const style = require('sass-extract-loader!../variables.scss');

export const DrawHuntCardDisplay = {
  preAnimationDelay: (animation, {playerId}) => playerId !== CREATURE ? style.global['$other-player-draw-card-pre-animation'].value : 0,

  animationDelay: (animation, {playerId}) => playerId === CREATURE ?
    style.global['$draw-card-animation'].value :
    style.global['$other-player-draw-card-animation'].value,

  animatingInformation: (t, {playerId}, playersMap) => playerId === CREATURE ?
    t('You draw 3 Hunt cards') :
    t('{player} draws 3 Hunt cards', {player: playersMap[CREATURE].name, gender: playersMap[CREATURE].gender})
}