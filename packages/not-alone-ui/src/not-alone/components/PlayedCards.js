import React from "react"
import {CREATURE, getHunted} from "@bga/not-alone"
import PlaceCard, {places} from "./PlaceCard"
import {PLAY_PLACE_CARD} from "@bga/not-alone/moves/PlayPlaceCard"
import "./played-cards.scss"
import {useTranslation} from "react-i18next"
import {Tooltip} from "@material-ui/core"
import {MOVE_PLAYED} from "../../studio/reducers/ServerReducer";
import {REVEAL_PLACE_CARDS} from "@bga/not-alone/moves/RevealPlaceCard";

const PlayedCards = ({game, playerId, animation, undo}) => {
  if (playerId === CREATURE) {
    return null
  } else {
    const {t} = useTranslation()
    const hunted = getHunted(game, playerId)
    const isRevealingPlaceCards = animation && animation.move.type === REVEAL_PLACE_CARDS && animation.move.huntedId === playerId
    const classes = ['played-cards']
    if (isRevealingPlaceCards) {
      classes.push('revealing')
    } else if (hunted.playedPlaceCardsRevealed) {
      classes.push('revealed')
    }
    let tooltip = ''
    if (hunted.playedPlaceCards.length === 1) {
      tooltip = t('You played {place}', {place: t(places[hunted.playedPlaceCards[0]].name)})
    }
    const isPlayingPlaceCard = animation && animation.type === MOVE_PLAYED && animation.move.type === PLAY_PLACE_CARD && animation.move.huntedId === playerId
    return (
      <Tooltip title={tooltip} enterTouchDelay={0}>
        <div className={classes.join(' ')}>
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