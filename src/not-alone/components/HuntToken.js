import React, {useEffect} from "react"
import {Tooltip} from "@material-ui/core"
import creatureToken from "../img/creature-token.png"
import artemiaToken from "../img/artemia-token.png"
import targetToken from "../img/target-token.png"
import "./hunt-token.scss"
import {ARTEMIA_TOKEN, CREATURE, CREATURE_TOKEN, getHuntedNumber, getLegalMoves, TARGET_TOKEN} from "../NotAlone";
import {useTranslation} from "react-i18next";
import {numberOfHuntedAndHuntedPositionToTableSeats, SEAT_CENTER} from "./OtherPlayers";
import {PLACE_HUNT_TOKEN} from "../moves/PlaceHuntToken";
import {useDrag, useDragLayer} from "react-dnd";
import {getEmptyImage} from "react-dnd-html5-backend";

export const HUNT_TOKEN = 'Hunt token'

const HuntToken = ({token, locations, playerId, game}) => {
  const {t} = useTranslation()
  const classes = ['hunt-token', tokensDisplay[token].className]
  const availableForPlacement = playerId === CREATURE && getLegalMoves(game, playerId).some((move) => move.type === PLACE_HUNT_TOKEN && move.token === token);
  const canChangePlacement = locations.length && playerId === CREATURE && game.phase === 2

  if (locations.length) {
    classes.push('placed', 'place-' + locations.join('-'))
  } else if (playerId !== CREATURE) {
    if (playerId) {
      const huntedNumber = getHuntedNumber(playerId)
      const tableSeats = numberOfHuntedAndHuntedPositionToTableSeats[game.hunted.length][huntedNumber]
      classes.push(...tableSeats[0])
    } else {
      classes.push(SEAT_CENTER)
    }
  }

  if (availableForPlacement) {
    classes.push('available')
  }

  let [{isDragging}, drag, preview] = useDrag({
    item: {type: HUNT_TOKEN, token},
    canDrag: availableForPlacement || canChangePlacement,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })
  useEffect(() => {
    preview(getEmptyImage())
  }, [])
  const {dragOffsetDiff} = useDragLayer(monitor => ({
    dragOffsetDiff: monitor.getDifferenceFromInitialOffset()
  }))

  if (isDragging) {
    classes.push('dragging')
  }

  const x = isDragging && dragOffsetDiff ? dragOffsetDiff.x : 0
  const y = isDragging && dragOffsetDiff ? dragOffsetDiff.y : 0

  return (
    <Tooltip title={tokensDisplay[token].description(t)}>
      <div className={classes.join(' ')} ref={drag} style={{left: x * 2 + 'px', top: y + 'px'}}>
        <Image token={token}/>
      </div>
    </Tooltip>
  )
}

const Image = React.memo(({token}) => {
  const {t} = useTranslation()
  return (<img src={tokensDisplay[token].image} alt={tokensDisplay[token].description(t)} draggable={false}/>)
})

const tokensDisplay = {
  [CREATURE_TOKEN]: {className: 'creature-token', image: creatureToken, description: (t) => t('The Creature token')},
  [ARTEMIA_TOKEN]: {className: 'artemia-token', image: artemiaToken, description: (t) => t('The Artemia token')},
  [TARGET_TOKEN]: {className: 'target-token', image: targetToken, description: (t) => t('The Target token')}
}

export default HuntToken