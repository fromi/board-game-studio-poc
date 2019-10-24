import React from 'react'
import {useTranslation} from 'react-i18next'
import PlaceCard, {placeTexts} from '../material/place-cards/PlaceCard'
import './hunted-player-discard.scss'
import {Tooltip} from '@material-ui/core'

export default function HuntedPlayedDiscard(props) {
  const {hunted, huntedId, playersMap} = props
  const {t} = useTranslation()

  return (
    <div className="hunted-player-discard">
      {hunted.discardedPlaceCards.map(place => {
        return (
          <Tooltip title={t('{place} is in {player}’s discard', {place: placeTexts[place].name(t), player: playersMap[huntedId].name})} key={place}>
            <div className="discarded-place">
              <PlaceCard place={place}/>
            </div>
          </Tooltip>
        )
      })}
    </div>
  )
}