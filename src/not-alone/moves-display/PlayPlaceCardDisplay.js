// eslint-disable-next-line import/no-webpack-loader-syntax
const style = require('sass-extract-loader!../variables.scss');

export const PlayPlaceCardDisplay = {
  playerInformation: (t) => t('You must play a Place card'),
  othersInformation: (t) => t('Hunted players must play a Place card'),

  playerPreAnimationDelay: () => style.global['$playing-place-card-animation'].value
}