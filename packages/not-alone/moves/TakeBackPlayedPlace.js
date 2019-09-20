export const TAKE_BACK_PLAYED_PLACE = 'TakeBackPlayedPlace'
export const takeBackPlayedPlace = (huntedId, place) => ({type: TAKE_BACK_PLAYED_PLACE, huntedId, place})

export const TakeBackPlayedPlace = {
  execute: () => console.log('TODO')
}