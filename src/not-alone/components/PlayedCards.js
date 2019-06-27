import React from "react"
import {CREATURE, getHunted} from "../NotAlone"
import PlaceCard, {places} from "./PlaceCard"
import {PLAY_PLACE_CARD} from "../moves/PlayPlaceCard"
import "./played-cards.scss"
import {useTranslation} from "react-i18next"
import {Tooltip} from "@material-ui/core"

const PlayedCards = ({game, playerId, undo}) => {
  const {t} = useTranslation()
  if (playerId === CREATURE) {
    return null
  } else {
    const hunted = getHunted(game, playerId)
    let tooltip = ''
    if (hunted.playedPlaceCards.length === 1) {
      tooltip = t('You played {{place}}', {place: t(places[hunted.playedPlaceCards[0]].name)})
    }
    return (
      <Tooltip title={tooltip} enterTouchDelay={0}>
        <div className="played-cards">
          {hunted.playedPlaceCards.map(place => (
            <PlaceCard place={place} key={place} onClick={() => undo({type: PLAY_PLACE_CARD, place})}/>
          ))}
        </div>
      </Tooltip>
    )
  }
}

export default PlayedCards