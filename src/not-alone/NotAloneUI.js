import React from 'react'
import "./not-alone.scss"
import {BOARD_SIDES, CREATURE, getLegalMoves, HUNT_TOKENS} from "./NotAlone"
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
import HuntToken from "./components/HuntToken";
import {PASS} from "./moves/Pass";
import {PassDisplay} from "./moves-display/PassDisplay";
import Button from "@material-ui/core/Button";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {lightBlue, pink} from "@material-ui/core/colors";

const createTheme = (color) => createMuiTheme({
  palette: {
    primary: color
  },
  typography: {
    useNextVariants: true,
  }
});

export const Interface = (props) => {
  const {playerId, game, animation, information, play} = props

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
    <MuiThemeProvider theme={playerId === CREATURE ? createTheme(pink) : createTheme(lightBlue)}>
      <div className={classes.join(' ')}>
        <h2 className="information">{information}</h2>
        {playerId && getLegalMoves(game, playerId).some(move => move.type === PASS) &&
        <Button variant="contained" color="primary" size="large" className="pass-button" onClick={() => play({type: PASS, playerId})}>Pass</Button>}
        {BOARD_SIDES.map(side =>
          <Board side={side} key={side} {...props}/>
        )}
        <Artemia {...props}/>
        <OtherPlayers {...props}/>
        <HuntCardsDeck {...props}/>
        <SurvivalCardsDeck {...props}/>
        {playerId && <PlayerMaterial {...props}/>}
        {HUNT_TOKENS.map(token => <HuntToken token={token} locations={game.huntTokensLocations[token]} playerId={playerId} game={game} key={token}/>)}
      </div>
    </MuiThemeProvider>
  )
}

export const movesDisplay = {
  [CHOOSE_BOARD_SIDE]: ChooseBoardSideDisplay,
  [DRAW_HUNT_CARD]: DrawHuntCardDisplay,
  [DRAW_SURVIVAL_CARD]: DrawSurvivalCardDisplay,
  [PLAY_PLACE_CARD]: PlayPlaceCardDisplay,
  [PLACE_HUNT_TOKEN]: PlaceHuntTokenDisplay,
  [PASS]: PassDisplay
}

export const getInformation = (t, game, playerId, animation, playersMap) => {
  if (game.assimilationCounter === 0) {
    return t('{player} has assimilated the Hunted and wins the game!', {player: playersMap[CREATURE].name, gender: playersMap[CREATURE].gender})
  } else if (game.rescueCounter === 0) {
    return t('The Hunted escaped Artemia, they all win the game!')
  }
}