import React from "react"
import {CREATURE, getHunted} from "../NotAlone"
import PlaceCard, {places} from "./PlaceCard"
import {PLAY_PLACE_CARD} from "../moves/PlayPlaceCard"
import "./played-cards.scss"
import {useTranslation} from "react-i18next"
import {Tooltip} from "@material-ui/core"
import {MOVE_PLAYED} from "../../studio/reducers/ServerReducer";

const PlayedCards = ({game, playerId, animation, undo}) => {
  const {t} = useTranslation()
  if (playerId === CREATURE) {
    return null
  } else {
    const hunted = getHunted(game, playerId)
    let tooltip = ''
    if (hunted.playedPlaceCards.length === 1) {
      tooltip = t('You played {place}', {place: t(places[hunted.playedPlaceCards[0]].name)})
    }
    const isPlayingPlaceCard = animation && animation.type === MOVE_PLAYED && animation.move.type === PLAY_PLACE_CARD && animation.move.huntedId === playerId
    return (
      <Tooltip title={tooltip} enterTouchDelay={0}>
        <div className="played-cards">
          {hunted.playedPlaceCards.map(place => {
            if (isPlayingPlaceCard && animation.move.place === place) {
              return null
            } else {
              return <PlaceCard place={place} key={place} onClick={() => undo({type: PLAY_PLACE_CARD, place, huntedId: playerId})}/>
            }
          })}
        </div>
      </Tooltip>
    )
  }
}

export default PlayedCards