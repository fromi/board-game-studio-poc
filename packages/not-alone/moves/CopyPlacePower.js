import {UsePlacePower} from './UsePlacePower'

export const COPY_PLACE_POWER = 'CopyPlacePower'
export const copyPlacePower = (place, huntedId) => ({type: COPY_PLACE_POWER, place, huntedId})

export const CopyPlacePower = UsePlacePower