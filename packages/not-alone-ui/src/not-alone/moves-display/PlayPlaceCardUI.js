import {getAutomaticMove} from '@bga/not-alone'
import {START_PHASE} from '@bga/not-alone/moves/StartPhase'

export const PlayPlaceCardUI = {
  animationInformation: (t, {game}) => {
    const automaticMove = getAutomaticMove(game);
    if (automaticMove && automaticMove.type === START_PHASE) {
      return t('All the Hunted have selected a Place to explore')
    }
  }
}