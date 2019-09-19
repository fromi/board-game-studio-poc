import {Tooltip} from "@material-ui/core";
import markerCounter from "../img/marker-counter.png";
import React from "react";
import "./marker-counter.scss"
import {useTranslation} from "react-i18next";
import {getLegalMoves, HUNTED_PREFIX} from "@bga/not-alone";
import {PUT_MARKER_ON_BEACH} from "@bga/not-alone/moves/PutMarkerOnBeach";
import {REMOVE_MARKER_FROM_BEACH} from "@bga/not-alone/moves/RemoveMarkerFromBeach";
import Draggable from "../../util/Draggable";

const MARKER_COUNTER = 'Marker counter';

const MarkerCounter = ({game, playerId}) => {
  const {t} = useTranslation()
  const huntedLegalMoves = playerId.startsWith(HUNTED_PREFIX) ? getLegalMoves(game, playerId) : [];
  const canPutOnBeach = !game.markerCounterOnBeach && huntedLegalMoves.some((move) => move.type === PUT_MARKER_ON_BEACH);
  const canRemoveFromBeach = game.markerCounterOnBeach && huntedLegalMoves.some((move) => move.type === REMOVE_MARKER_FROM_BEACH);
  const canMove = canPutOnBeach || canRemoveFromBeach
  const classes = ['marker-counter']
  if (game.markerCounterOnBeach) {
    classes.push('on-beach')
  }
  return (
    <Tooltip title={t('Marker counter (see "The Beach")')} enterTouchDelay={0}>
      <div className={classes.join(' ')}>
        <Draggable draggable={canMove} item={{type: MARKER_COUNTER}}>
          <Counter/>
        </Draggable>
      </div>
    </Tooltip>
  )
}

const Counter = () => {
  const {t} = useTranslation()
  return (
    <img src={markerCounter} alt={t('A round yellow piece')} draggable={false}/>
  )
}

export default MarkerCounter