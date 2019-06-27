import React from 'react'
import HuntedPlayer from "./HuntedPlayer"
import {CREATURE, getHuntedNumber, HUNTED_PREFIX} from "../NotAlone"
import CreaturePlayer from "./CreaturePlayer"
import "./other-player.scss"

const OtherPlayers = (props) => {
  const {playerId, game} = props
  if (playerId && playerId !== CREATURE) {
    const huntedNumber = getHuntedNumber(playerId)
    const tablePosition = numberOfHuntedAndHuntedPositionToTablePositions[game.hunted.length][huntedNumber]
    return (
      <React.Fragment>
        {game.hunted.filter((hunted, index) => index + 1 !== huntedNumber).map((hunted, index) => {
          const otherHuntedNumber = index + 1 < huntedNumber ? index + 1 : index + 2
          if (otherHuntedNumber !== huntedNumber) {
            return <HuntedPlayer hunted={hunted} huntedId={HUNTED_PREFIX + otherHuntedNumber} position={tablePosition[index + 1]} key={index} {...props}/>
          } else {
            return null
          }
        })}
        <CreaturePlayer position={tablePosition[0]} {...props}/>
      </React.Fragment>
    )
  } else {
    const tablePosition = numberOfHuntedToTablePositionsForCreature[game.hunted.length]
    return (
      <React.Fragment>
        {game.hunted.map((hunted, index) =>
          <HuntedPlayer hunted={hunted} huntedId={HUNTED_PREFIX + (index + 1)} position={tablePosition[index]} key={index} {...props}/>
        )}
        {!playerId && <CreaturePlayer position={BOTTOM} {...props}/>}
      </React.Fragment>
    )
  }
}

const FRONT_MIDDLE = 'front-middle'
const FRONT_LEFT = 'front-left'
const FRONT_RIGHT = 'front-right'
const LEFT_MIDDLE = 'left-middle'
const LEFT_BOTTOM = 'left-bottom'
const LEFT_TOP = 'left-top'
const RIGHT_MIDDLE = 'right-middle'
const RIGHT_BOTTOM = 'right-bottom'
const RIGHT_TOP = 'right-top'
const BOTTOM = 'bottom'

const numberOfHuntedToTablePositionsForCreature = {
  1: [FRONT_MIDDLE],
  2: [FRONT_LEFT, FRONT_RIGHT],
  3: [LEFT_TOP, FRONT_MIDDLE, RIGHT_TOP],
  4: [LEFT_MIDDLE, FRONT_LEFT, FRONT_RIGHT, RIGHT_MIDDLE],
  5: [LEFT_BOTTOM, LEFT_TOP, FRONT_MIDDLE, RIGHT_TOP, RIGHT_BOTTOM],
  6: [LEFT_BOTTOM, LEFT_TOP, FRONT_LEFT, FRONT_RIGHT, RIGHT_TOP, RIGHT_BOTTOM]
}

const numberOfHuntedAndHuntedPositionToTablePositions = {
  1: {
    1: [FRONT_MIDDLE]
  },
  2: {
    1: [FRONT_MIDDLE, LEFT_MIDDLE],
    2: [FRONT_MIDDLE, RIGHT_MIDDLE]
  },
  3: {
    1: [RIGHT_MIDDLE, LEFT_MIDDLE, FRONT_MIDDLE],
    2: [FRONT_MIDDLE, RIGHT_MIDDLE, LEFT_MIDDLE],
    3: [LEFT_MIDDLE, FRONT_MIDDLE, RIGHT_MIDDLE]
  },
  4: {
    1: [RIGHT_MIDDLE, LEFT_BOTTOM, LEFT_TOP, FRONT_MIDDLE],
    2: [FRONT_MIDDLE, RIGHT_MIDDLE, LEFT_BOTTOM, LEFT_TOP],
    3: [FRONT_MIDDLE, RIGHT_TOP, RIGHT_BOTTOM, LEFT_MIDDLE],
    4: [LEFT_MIDDLE, FRONT_MIDDLE, RIGHT_TOP, RIGHT_BOTTOM]
  },
  5: {
    1: [RIGHT_MIDDLE, LEFT_BOTTOM, LEFT_TOP, FRONT_LEFT, FRONT_RIGHT],
    2: [FRONT_RIGHT, RIGHT_MIDDLE, LEFT_BOTTOM, LEFT_TOP, FRONT_LEFT],
    3: [FRONT_MIDDLE, RIGHT_TOP, RIGHT_BOTTOM, LEFT_BOTTOM, LEFT_TOP],
    4: [FRONT_LEFT, FRONT_RIGHT, RIGHT_TOP, RIGHT_BOTTOM, LEFT_MIDDLE],
    5: [LEFT_MIDDLE, FRONT_LEFT, FRONT_RIGHT, RIGHT_TOP, RIGHT_BOTTOM]
  },
  6: {
    1: [RIGHT_BOTTOM, LEFT_BOTTOM, LEFT_TOP, FRONT_LEFT, FRONT_RIGHT, RIGHT_TOP],
    2: [RIGHT_TOP, RIGHT_BOTTOM, LEFT_BOTTOM, LEFT_TOP, FRONT_LEFT, FRONT_RIGHT],
    3: [FRONT_RIGHT, RIGHT_TOP, RIGHT_BOTTOM, LEFT_BOTTOM, LEFT_TOP, FRONT_LEFT],
    4: [FRONT_LEFT, FRONT_RIGHT, RIGHT_TOP, RIGHT_BOTTOM, LEFT_BOTTOM, LEFT_TOP],
    5: [LEFT_TOP, FRONT_LEFT, FRONT_RIGHT, RIGHT_TOP, RIGHT_BOTTOM, LEFT_BOTTOM],
    6: [LEFT_BOTTOM, LEFT_TOP, FRONT_LEFT, FRONT_RIGHT, RIGHT_TOP, RIGHT_BOTTOM]
  }
}

export default OtherPlayers