import React from 'react'
import HuntedPlayer from "./HuntedPlayer"
import {CREATURE, getHuntedNumber, HUNTED_PREFIX} from "@bga/not-alone"
import CreaturePlayer from "./CreaturePlayer"
import "./other-player.scss"

const OtherPlayers = (props) => {
  const {playerId, game, animation, playersMap} = props
  if (playerId && playerId !== CREATURE) {
    const huntedNumber = getHuntedNumber(playerId)
    const tableSeats = numberOfHuntedAndHuntedPositionToTableSeats[game.hunted.length][huntedNumber]
    return (
      <React.Fragment>
        {game.hunted.filter((hunted, index) => index + 1 !== huntedNumber).map((hunted, index) => {
          const otherHuntedNumber = index + 1 < huntedNumber ? index + 1 : index + 2
          if (otherHuntedNumber !== huntedNumber) {
            return <HuntedPlayer hunted={hunted} huntedId={HUNTED_PREFIX + otherHuntedNumber} classes={[...tableSeats[index + 1]]} key={index} {...props}/>
          } else {
            return null
          }
        })}
        <CreaturePlayer classes={[...tableSeats[0]]} creature={game.creature} animation={animation} playersMap={playersMap}/>
      </React.Fragment>
    )
  } else {
    const tableSeats = numberOfHuntedToTableSeatsForCreature[game.hunted.length]
    return (
      <React.Fragment>
        {game.hunted.map((hunted, index) =>
          <HuntedPlayer hunted={hunted} huntedId={HUNTED_PREFIX + (index + 1)} classes={[...tableSeats[index]]} key={index} {...props}/>
        )}
        {!playerId && <CreaturePlayer classes={[SEAT_CENTER]} creature={game.creature} animation={animation} playersMap={playersMap}/>}
      </React.Fragment>
    )
  }
}

const SEAT_LEFT = 'seat-left'
const SEAT_RIGHT = 'seat-right'
const SEAT_TOP = 'seat-top'
const SEAT_MIDDLE = 'seat-middle'
const SEAT_BOTTOM = 'seat-bottom'
export const SEAT_CENTER = 'seat-center'

const TOP_LEFT = [SEAT_TOP, SEAT_LEFT]
const TOP_RIGHT = [SEAT_TOP, SEAT_RIGHT]
const MIDDLE_LEFT = [SEAT_MIDDLE, SEAT_LEFT]
const MIDDLE_RIGHT = [SEAT_MIDDLE, SEAT_RIGHT]
const BOTTOM_LEFT = [SEAT_BOTTOM, SEAT_LEFT]
const BOTTOM_RIGHT = [SEAT_BOTTOM, SEAT_RIGHT]

export const numberOfHuntedToTableSeatsForCreature = {
  1: [TOP_LEFT],
  2: [TOP_LEFT, TOP_RIGHT],
  3: [MIDDLE_LEFT, TOP_LEFT, TOP_RIGHT],
  4: [MIDDLE_LEFT, TOP_LEFT, TOP_RIGHT, MIDDLE_RIGHT],
  5: [BOTTOM_LEFT, MIDDLE_LEFT, TOP_LEFT, TOP_RIGHT, MIDDLE_RIGHT],
  6: [BOTTOM_LEFT, MIDDLE_LEFT, TOP_LEFT, TOP_RIGHT, MIDDLE_RIGHT, BOTTOM_RIGHT]
}

export const numberOfHuntedAndHuntedPositionToTableSeats = {
  1: {
    1: [TOP_RIGHT]
  },
  2: {
    1: [TOP_RIGHT, BOTTOM_LEFT],
    2: [TOP_LEFT, BOTTOM_RIGHT]
  },
  3: {
    1: [TOP_RIGHT, BOTTOM_LEFT, MIDDLE_LEFT],
    2: [TOP_RIGHT, BOTTOM_RIGHT, BOTTOM_LEFT],
    3: [TOP_LEFT, MIDDLE_RIGHT, BOTTOM_RIGHT]
  },
  4: {
    1: [TOP_RIGHT, BOTTOM_LEFT, MIDDLE_LEFT, TOP_LEFT],
    2: [TOP_RIGHT, BOTTOM_RIGHT, BOTTOM_LEFT, MIDDLE_LEFT],
    3: [TOP_LEFT, MIDDLE_RIGHT, BOTTOM_RIGHT, BOTTOM_LEFT],
    4: [TOP_LEFT, TOP_RIGHT, MIDDLE_RIGHT, BOTTOM_RIGHT]
  },
  5: {
    1: [BOTTOM_RIGHT, BOTTOM_LEFT, MIDDLE_LEFT, TOP_LEFT, TOP_RIGHT],
    2: [TOP_RIGHT, BOTTOM_RIGHT, BOTTOM_LEFT, MIDDLE_LEFT, TOP_LEFT],
    3: [TOP_RIGHT, MIDDLE_RIGHT, BOTTOM_RIGHT, BOTTOM_LEFT, MIDDLE_LEFT],
    4: [TOP_LEFT, TOP_RIGHT, MIDDLE_RIGHT, BOTTOM_RIGHT, BOTTOM_LEFT],
    5: [BOTTOM_LEFT, TOP_LEFT, TOP_RIGHT, MIDDLE_RIGHT, BOTTOM_RIGHT]
  },
  6: {
    1: [BOTTOM_RIGHT, BOTTOM_LEFT, MIDDLE_LEFT, TOP_LEFT, TOP_RIGHT, MIDDLE_RIGHT],
    2: [MIDDLE_RIGHT, BOTTOM_RIGHT, BOTTOM_LEFT, MIDDLE_LEFT, TOP_LEFT, TOP_RIGHT],
    3: [TOP_RIGHT, MIDDLE_RIGHT, BOTTOM_RIGHT, BOTTOM_LEFT, MIDDLE_LEFT, TOP_LEFT],
    4: [TOP_LEFT, TOP_RIGHT, MIDDLE_RIGHT, BOTTOM_RIGHT, BOTTOM_LEFT, MIDDLE_LEFT],
    5: [MIDDLE_LEFT, TOP_LEFT, TOP_RIGHT, MIDDLE_RIGHT, BOTTOM_RIGHT, BOTTOM_LEFT],
    6: [BOTTOM_LEFT, MIDDLE_LEFT, TOP_LEFT, TOP_RIGHT, MIDDLE_RIGHT, BOTTOM_RIGHT]
  }
}

export default OtherPlayers