import {THE_BEACH, THE_WRECK} from '../PlaceCards'

export const Interference = {
  phase: 2,

  isPlaceIneffective: place => place === THE_BEACH || place === THE_WRECK
}
