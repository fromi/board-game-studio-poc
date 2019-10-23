import {phases} from '../NotAloneUI'

export const StartPhaseUI = {
  pastInformation: (t, move) => {
    return t(phases[move.phase])
  }
}