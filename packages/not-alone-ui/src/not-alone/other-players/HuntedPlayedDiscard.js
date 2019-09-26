import React from 'react'
import {useTranslation} from 'react-i18next'
import PlaceCard, {places} from '../material/place-cards/PlaceCard'
import './hunted-player-discard.scss'
import {Tooltip} from '@material-ui/core'

const HuntedPlayedDiscard = (props) => {
  const {hunted, huntedId, playersMap} = props
  const {t} = useTranslation()

  return (
    <div className="hunted-player-discard">
      {hunted.discardedPlaceCards.map(place => {
        return (
          <Tooltip title={t('{place} is in {player}’s discard', {place: t(places[place].name), player: playersMap[huntedId].name})} key={place}>
            <div className="discarded-place">
              <PlaceCard place={place}/>
            </div>
          </Tooltip>
        )
      })}
    </div>
  )
}
export default HuntedPlayedDiscard