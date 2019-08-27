import {CREATURE} from "../NotAlone"

// eslint-disable-next-line import/no-webpack-loader-syntax
const style = require('sass-extract-loader!../variables.scss');

export const ChooseBoardSideDisplay = {
  playerInformation: (t) => t('You are the Creature. Please choose the board side.'),
  defaultInformation: (t, game, playersMap) => t('{player} is the Creature! {gender, select, ♀ {She} ♂ {He} other {They}} must choose the board side.', {player: playersMap[CREATURE].name, gender: playersMap[CREATURE].gender}),

  preAnimationDelay: () => style.global['$board-side-chosen-animation'].value,
  animationDelay: () => style.global['$setup-animation'].value,

  animatingInformation: (t) => t('Board side is chosen! Creating Artemia...')
}