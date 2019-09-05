import {CREATURE} from "@bga/not-alone"

// eslint-disable-next-line import/no-webpack-loader-syntax
const style = require('sass-extract-loader!../variables.scss');

export const ChooseBoardSideUI = {
  playerInformation: (t) => t('You are the Creature. Please choose the board side.'),
  defaultInformation: (t, game, playersMap) => t('{player} is the Creature! {gender, select, ♀ {She} ♂ {He} other {They}} must choose the board side.', {player: playersMap[CREATURE].name, gender: playersMap[CREATURE].gender}),

  animationDelay: () => style.global['$board-side-chosen-animation'].value + style.global['$setup-animation'].value,

  animationInformation: (t) => t('Board side is chosen! Creating Artemia...')
}