import React from 'react'
import "./not-alone.scss"
import {BOARD_SIDES, CREATURE} from "./NotAlone"
import Board from "./components/Board"
import {CHOOSE_BOARD_SIDE} from "./moves/ChooseBoardSide"
import Artemia from "./components/Artemia"
import HuntCardsDeck from "./components/HuntCardsDeck"
import {DRAW_HUNT_CARD} from "./moves/DrawHuntCard"
import SurvivalCardsDeck from "./components/SurvivalCardsDeck"
import {PLAY_PLACE_CARD} from "./moves/PlayPlaceCard"
import OtherPlayers from "./components/OtherPlayers"
import PlayerMaterial from "./components/PlayerMaterial"
import {DRAW_SURVIVAL_CARD} from "./moves/DrawSurvivalCard"
import {ChooseBoardSideDisplay} from "./moves-display/ChooseBoardSideDisplay"
import {DrawHuntCardDisplay} from "./moves-display/DrawHuntCardDisplay"
import {DrawSurvivalCardDisplay} from "./moves-display/DrawSurvivalCardDisplay"
import {PlayPlaceCardDisplay} from "./moves-display/PlayPlaceCardDisplay"
import {PLACE_HUNT_TOKEN} from "./moves/PlaceHuntToken";
import {PlaceHuntTokenDisplay} from "./moves-display/PlaceHuntTokenDisplay";

export const Interface = (props) => {
  const {playerId, game, animation, information} = props

  const classes = ['not-alone']
  if (!playerId) {
    classes.push('spectator')
  } else if (playerId === CREATURE) {
    classes.push('creature')
  } else {
    classes.push('hunted')
  }
  const boardSideAnimation = animation && animation.move.type === CHOOSE_BOARD_SIDE
  if (!game.boardSide || (boardSideAnimation)) {
    classes.push('setup')
    if (!animation) {
      classes.push('board-side-choice')
    } else if (!game.boardSide) {
      classes.push('board-side-animation')
    }
  }

  return (
    <div className={classes.join(' ')}>
      <h2 className="information">{information}</h2>
      {BOARD_SIDES.map(side =>
        <Board side={side} key={side} {...props}/>
      )}
      <Artemia {...props}/>
      <OtherPlayers {...props}/>
      <HuntCardsDeck {...props}/>
      <SurvivalCardsDeck {...props}/>
      {playerId && <PlayerMaterial {...props}/>}
    </div>
  )
}

export const movesDisplay = {
  [CHOOSE_BOARD_SIDE]: ChooseBoardSideDisplay,
  [DRAW_HUNT_CARD]: DrawHuntCardDisplay,
  [DRAW_SURVIVAL_CARD]: DrawSurvivalCardDisplay,
  [PLAY_PLACE_CARD]: PlayPlaceCardDisplay,
  [PLACE_HUNT_TOKEN]: PlaceHuntTokenDisplay
}

export const getInformation = (t, game, playerId, animation, playersMap) => {
  if (game.assimilationCounter === 0) {
    return t('{{player}} has assimilated the Hunted and wins the game!', {player: playersMap[CREATURE].name, context: playersMap[CREATURE].gender})
  } else if (game.rescueCounter === 0) {
    return t('The Hunted escaped Artemia, they all win the game!')
  }
}