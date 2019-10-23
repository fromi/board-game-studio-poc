// eslint-disable-next-line import/no-webpack-loader-syntax
const style = require('sass-extract-loader!../variables.scss');

export const ChooseBoardSideUI = {
  animationDelay: () => style.global['$board-side-chosen-animation'].value + style.global['$setup-animation'].value,

  animationInformation: (t) => t('Board side is chosen! Creating Artemia...')
}