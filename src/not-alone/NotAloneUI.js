import React from 'react'
import "./not-alone.scss"
import {BOARD_SIDES, CREATURE, getLegalMoves} from "./NotAlone"
import Board from "./components/Board"
import {CHOOSE_BOARD_SIDE, ChooseBoardSide} from "./moves/ChooseBoardSide"
import Artemia from "./components/Artemia"
import HuntCardsDeck from "./components/HuntCardsDeck"
import {DrawHuntCard} from "./moves/DrawHuntCard"
import SurvivalCardsDeck from "./components/SurvivalCardsDeck"
import {PlayPlaceCard} from "./moves/PlayPlaceCard"
import OtherPlayers from "./components/OtherPlayers"
import PlayerMaterial from "./components/PlayerMaterial"
import {DrawSurvivalCard} from "./moves/DrawSurvivalCard"
import {ChooseBoardSideUI} from "./moves-display/ChooseBoardSideUI"
import {DrawHuntCardUI} from "./moves-display/DrawHuntCardUI"
import {DrawSurvivalCardUI} from "./moves-display/DrawSurvivalCardUI"
import {PlayPlaceCardUI} from "./moves-display/PlayPlaceCardUI"
import {PlaceHuntToken} from "./moves/PlaceHuntToken";
import {PlaceHuntTokenUI} from "./moves-display/PlaceHuntTokenUI";
import HuntToken from "./components/HuntToken";
import {Pass, PASS} from "./moves/Pass";
import {PassUI} from "./moves-display/PassUI";
import Button from "@material-ui/core/Button";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {lightBlue, pink} from "@material-ui/core/colors";
import {HUNT_TOKENS} from "./material/HuntTokens";
import {useTranslation} from "react-i18next";
import {PlayHuntCardUI} from "./moves-display/PlayHuntCardUI";
import {PlayHuntCard} from "./moves/PlayHuntCard";
import {PlaySurvivalCard} from "./moves/PlaySurvivalCard";
import {PlaySurvivalCardUI} from "./moves-display/PlaySurvivalCardUI";

const createTheme = (color) => createMuiTheme({
  palette: {
    primary: color
  },
  typography: {
    useNextVariants: true,
  }
});

const phases = {
  1: 'Phase 1: Exploration',
  2: 'Phase 2: Hunting',
  3: 'Phase 3: Reckoning',
  4: 'Phase 4: End-of-turn actions'
}

export const Interface = (props) => {
  const {playerId, game, animation, information, play} = props
  const {t} = useTranslation()

  const classes = ['not-alone']
  if (!playerId) {
    classes.push('spectator')
  } else if (playerId === CREATURE) {
    classes.push('creature')
  } else {
    classes.push('hunted')
  }
  const boardSideAnimation = animation && animation.move.type === CHOOSE_BOARD_SIDE
  if (!game.boardSide || boardSideAnimation) {
    classes.push('setup')
    if (animation) {
      classes.push('board-side-chosen')
    }
  }

  return (
    <MuiThemeProvider theme={playerId === CREATURE ? createTheme(pink) : createTheme(lightBlue)}>
      <div className={classes.join(' ')}>
        <h2 className="information">{information}</h2>
        <h3 className="phase">{t(phases[game.phase])}</h3>
        {playerId && getLegalMoves(game, playerId).some(move => move.type === PASS) &&
        <Button variant="contained" color="primary" size="large" className="pass-button" onClick={() => play({type: PASS, playerId})}>{t('Pass')}</Button>}
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

Object.assign(ChooseBoardSide, ChooseBoardSideUI)
Object.assign(DrawHuntCard, DrawHuntCardUI)
Object.assign(DrawSurvivalCard, DrawSurvivalCardUI)
Object.assign(PlayPlaceCard, PlayPlaceCardUI)
Object.assign(PlaceHuntToken, PlaceHuntTokenUI)
Object.assign(PlayHuntCard, PlayHuntCardUI)
Object.assign(PlaySurvivalCard, PlaySurvivalCardUI)
Object.assign(Pass, PassUI)

export const getInformation = (t, game, playerId, animation, playersMap) => {
  if (game.assimilationCounter === 0) {
    return t('{player} has assimilated the Hunted and wins the game!', {player: playersMap[CREATURE].name, gender: playersMap[CREATURE].gender})
  } else if (game.rescueCounter === 0) {
    return t('The Hunted escaped Artemia, they all win the game!')
  }
}