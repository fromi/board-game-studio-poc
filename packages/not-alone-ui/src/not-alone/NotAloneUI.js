import React from 'react'
import {useTranslation} from 'react-i18next'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import {lightBlue, pink} from '@material-ui/core/colors'
import {HUNT_TOKENS} from '@bga/not-alone/material/HuntTokens'
import {RevealPlaceCards} from '@bga/not-alone/moves/RevealPlaceCard'
import {CHOOSE_BOARD_SIDE, ChooseBoardSide} from '@bga/not-alone/moves/ChooseBoardSide'
import {BOARD_SIDES, CREATURE} from '@bga/not-alone'
import {DrawHuntCard} from '@bga/not-alone/moves/DrawHuntCard'
import {PlayPlaceCard} from '@bga/not-alone/moves/PlayPlaceCard'
import {DrawSurvivalCard} from '@bga/not-alone/moves/DrawSurvivalCard'
import {Pass} from '@bga/not-alone/moves/Pass'
import Board from './material/board/Board'
import Artemia from './artemia/Artemia'
import HuntCardsDeck from './material/hunt-cards/HuntCardsDeck'
import SurvivalCardsDeck from './material/survival-cards/SurvivalCardsDeck'
import OtherPlayers from './other-players/OtherPlayers'
import PlayerMaterial from './player/PlayerMaterial'
import {ChooseBoardSideUI} from './moves-display/ChooseBoardSideUI'
import {DrawHuntCardUI} from './moves-display/DrawHuntCardUI'
import {DrawSurvivalCardUI} from './moves-display/DrawSurvivalCardUI'
import {PlayPlaceCardUI} from './moves-display/PlayPlaceCardUI'
import HuntToken from './material/hunt-tokens/HuntToken'
import {PassUI} from './moves-display/PassUI'
import {RevealPlaceCardsUI} from './moves-display/RevealPlaceCardsUI'
import Title from './Title'
import './not-alone.scss'
import History from './History'
import {StartPhase} from '@bga/not-alone/moves/StartPhase'
import {StartPhaseUI} from './moves-display/StartPhaseUI'

const createTheme = (color) => createMuiTheme({
  palette: {
    type: 'dark',
    primary: color
  },
  typography: {
    useNextVariants: true,
    button: {
      fontSize: '4vh',
      lineHeight: '1',
      border: '0.2vh solid',
      textTransform: 'none'
    }
  }
})

export const phases = {
  1: 'Phase 1: Exploration',
  2: 'Phase 2: Hunting',
  3: 'Phase 3: Reckoning',
  4: 'Phase 4: End-of-turn actions'
}

export const Interface = (props) => {
  const {playerId, game, animation} = props
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
        <header>
          <History {...props}/>
          <h1><Title {...props}/></h1>
        </header>
        {game.phase && <h3 className="phase">{t(phases[game.phase])}</h3>}
        {BOARD_SIDES.map(side =>
          <Board side={side} key={side} {...props}/>
        )}
        <HuntCardsDeck {...props}/>
        <SurvivalCardsDeck {...props}/>
        <Artemia {...props}/>
        <OtherPlayers {...props}/>
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
Object.assign(RevealPlaceCards, RevealPlaceCardsUI)
Object.assign(Pass, PassUI)
Object.assign(StartPhase, StartPhaseUI)
