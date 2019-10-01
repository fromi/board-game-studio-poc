import {THE_BEACH, THE_WRECK} from '../PlaceCards'
import {HUNTING} from '../../NotAlone'

export const Interference = {
  phase: HUNTING,

  isPlaceIneffective: place => place === THE_BEACH || place === THE_WRECK
}
