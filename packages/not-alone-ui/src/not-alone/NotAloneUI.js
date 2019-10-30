import React from 'react'
import {useTranslation} from 'react-i18next'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import {lightBlue, pink} from '@material-ui/core/colors'
import {HUNT_TOKENS} from '@bga/not-alone/material/HuntTokens'
import {CHOOSE_BOARD_SIDE} from '@bga/not-alone/moves/ChooseBoardSide'
import {BOARD_SIDES, CREATURE, moves} from '@bga/not-alone'
import Board from './material/board/Board'
import Artemia from './artemia/Artemia'
import HuntCardsDeck from './material/hunt-cards/HuntCardsDeck'
import SurvivalCardsDeck from './material/survival-cards/SurvivalCardsDeck'
import OtherPlayers from './other-players/OtherPlayers'
import PlayerMaterial from './player/PlayerMaterial'
import HuntToken from './material/hunt-tokens/HuntToken'
import Title from './Title'
import './not-alone.scss'
import History from './history/History'
import variables from './variables.scss'
import {END_OF_TURN_ACTIONS, EXPLORATION, HUNTING, RECKONING} from '@bga/not-alone/Phases'
import {DrawHuntCard} from '@bga/not-alone/moves/DrawHuntCard'
import {MOVE_ASSIMILATION_COUNTER} from '@bga/not-alone/moves/MoveAssimilationCounter'
import {MOVE_RESCUE_COUNTER} from '@bga/not-alone/moves/MoveRescueCounter'

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

  const counterMoving = animation && (animation.move.type === MOVE_ASSIMILATION_COUNTER || animation.move.type === MOVE_RESCUE_COUNTER)
  if (counterMoving) {
    classes.push('counter-moving')
  }


  return (
    <MuiThemeProvider theme={playerId === CREATURE ? createTheme(pink) : createTheme(lightBlue)}>
      <div className={classes.join(' ')}>
        <header>
          <History {...props}/>
          <h1><Title {...props}/></h1>
        </header>
        {game.phase && <h3 className="phase">{phaseTexts[game.phase](t)}</h3>}
        {BOARD_SIDES.map(side =>
          <Board side={side} key={side} {...props}/>
        )}
        <HuntCardsDeck {...props}/>
        <SurvivalCardsDeck {...props}/>
        <Artemia {...props}/>
        <OtherPlayers {...props}/>
        {HUNT_TOKENS.map(token => <HuntToken token={token} locations={game.huntTokensLocations[token]} key={token} {...props}/>)}
        {playerId && <PlayerMaterial {...props}/>}
      </div>
    </MuiThemeProvider>
  )
}

export const phaseTexts = {
  [EXPLORATION]: t => t('Phase 1: Exploration'),
  [HUNTING]: t => t('Phase 2: Hunting'),
  [RECKONING]: t => t('Phase 3: Reckoning'),
  [END_OF_TURN_ACTIONS]: t => t('Phase 4: End-of-turn actions')
}

const cssDurationToSecond = cssDuration => cssDuration.endsWith('ms') ? 1000 * parseInt(cssDuration.slice(0, -2)) : parseFloat(cssDuration.slice(0, -1))

for (let move in moves) {
  if (variables[move]) {
    Object.assign(moves[move], {animationDelay: () => cssDurationToSecond(variables[move])})
  }
}

const drawCardDuration = cssDurationToSecond(variables.drawCardDuration)
export const drawNextCardDelay = 0.2

Object.assign(DrawHuntCard, {animationDelay: (animation) => drawCardDuration + (animation.move.quantity - 1) * drawNextCardDelay})