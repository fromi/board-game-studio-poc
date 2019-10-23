import {getAutomaticMove} from '@bga/not-alone'
import {START_PHASE} from '@bga/not-alone/moves/StartPhase'
import {places} from '../material/place-cards/PlaceCard'

// eslint-disable-next-line import/no-webpack-loader-syntax
const style = require('sass-extract-loader!../variables.scss');

export const PlayPlaceCardUI = {
  animationDelay: (animation, playerId) => animation.move.huntedId === playerId ? style.global['$playing-place-card-animation'].value : 0,

  animationInformation: (t, {game}) => {
    const automaticMove = getAutomaticMove(game);
    if (automaticMove && automaticMove.type === START_PHASE) {
      return t('All the Hunted have selected a Place to explore')
    }
  },

  pastInformation: (t, move, playerId) => {
    if (playerId === move.huntedId) {
      return t('You played {place}', {place: t(places[move.place].name)})
    }
  }
}