import React from "react";
import PlaceCard, {places} from "./PlaceCard";
import "./place-card-played.scss"
import {getHunted, getLegalMoves} from "@bga/not-alone";
import {REVEAL_PLACE_CARDS} from "@bga/not-alone/moves/RevealPlaceCard";
import {useTranslation} from "react-i18next";
import {Tooltip} from "@material-ui/core";
import {MOVE_PLAYED} from "../../studio/reducers/ServerReducer";
import {PLAY_PLACE_CARD} from "@bga/not-alone/moves/PlayPlaceCard";
import {TAKE_BACK_PLAYED_PLACE, takeBackPlayedPlace} from "@bga/not-alone/moves/TakeBackPlayedPlace";

const PlaceCardPlayed = ({place, game, playerId, animation, play, undo}) => {
  const {t} = useTranslation()
  const hunted = getHunted(game, playerId)
  const isBeingPlayed = animation && animation.type === MOVE_PLAYED && animation.move.type === PLAY_PLACE_CARD && animation.move.huntedId === playerId
  const isBeingRevealed = animation && animation.move.type === REVEAL_PLACE_CARDS && animation.move.huntedId === playerId
  const canTakeBack = game.phase === 1 || getLegalMoves(game, playerId).some(move => move.type === TAKE_BACK_PLAYED_PLACE && move.place === place)

  const classes = ['place-card-played']
  if (isBeingPlayed) {
    classes.push('playing')
  } else if (isBeingRevealed) {
    classes.push('revealing')
  } else if (hunted.playedPlaceCardsRevealed) {
    classes.push('revealed')
  }

  if (canTakeBack) {
    classes.push('can-take-back')
  }

  const takeBack = () => {
    if (game.phase === 1) {
      undo({type: PLAY_PLACE_CARD, place, huntedId: playerId})
    } else {
      play(takeBackPlayedPlace(playerId, place))
    }
  }

  return (
    <Tooltip title={t('You played {place}', {place: t(places[place].name)})} enterTouchDelay={0}>
      <div className={classes.join(' ')} onClick={takeBack}>
        <PlaceCard place={place}/>
      </div>
    </Tooltip>
  )
}

export default PlaceCardPlayed