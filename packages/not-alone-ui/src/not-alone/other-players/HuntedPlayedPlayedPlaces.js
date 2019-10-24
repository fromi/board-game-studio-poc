import React from 'react'
import PlaceCard, {placeTexts} from '../material/place-cards/PlaceCard'
import Tooltip from '@material-ui/core/Tooltip'
import {REVEAL_PLACE_CARDS} from '@bga/not-alone/moves/RevealPlaceCard'
import {useTranslation} from 'react-i18next'
import './hunted-player-played-places.scss'

export default function HuntedPlayedPlayedPlaces(props) {
  const {hunted, huntedId, playersMap, animation} = props
  const {t} = useTranslation()

  const isRevealingPlaceCards = animation && animation.move.type === REVEAL_PLACE_CARDS && animation.move.huntedId === huntedId

  const playedPlacesClasses = ['hunted-player-played-places']
  if (isRevealingPlaceCards) {
    playedPlacesClasses.push('revealing')
  }

  return (
    <div className={playedPlacesClasses.join(' ')}>
      {hunted.playedPlaceCards.map((place, index) => {
        const tooltip = isNaN(place) ?
          t('{player} played {count, plural, one {one Place card} other {{count} Place cards}}, not revealed yet', {
            player: playersMap[huntedId].name,
            count: hunted.playedPlaceCards.length
          }) :
          t('{player} played {place}', {player: playersMap[huntedId].name, place: placeTexts[place].name(t)})
        return (
          <Tooltip title={tooltip} enterTouchDelay={0} key={isNaN(place) ? index : place}>
            <div>
              <PlaceCard place={place}/>
            </div>
          </Tooltip>
        )
      })}
    </div>
  )
}