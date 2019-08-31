import {getLegalMoves, getPlayerIds} from "../NotAlone";
import {PLAY_PLACE_CARD} from "../moves/PlayPlaceCard";

// eslint-disable-next-line import/no-webpack-loader-syntax
const style = require('sass-extract-loader!../variables.scss');

export const PlayPlaceCardUI = {
  playerInformation: (t) => t('You must play a Place card'),

  defaultInformation: (t, game, playersMap) => {
    const playerIds = getPlayerIds(game).filter(playerId => getLegalMoves(game, playerId).some(move => move.type === PLAY_PLACE_CARD));
    if (playerIds.length === 1) {
      return t('{player} must play a Place card', {player: playersMap[playerIds[0]].name})
    } else {
      return t('Hunted players must play a Place card')
    }
  },

  animationDelay: (animation, playerId) => animation.move.huntedId === playerId ? style.global['$playing-place-card-animation'].value : 0
}