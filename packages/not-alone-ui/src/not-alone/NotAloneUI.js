import React from 'react'
import './not-alone.scss'
import {BOARD_SIDES, CREATURE} from '@bga/not-alone'
import Board from './material/board/Board'
import {CHOOSE_BOARD_SIDE, ChooseBoardSide} from '@bga/not-alone/moves/ChooseBoardSide'
import Artemia from './artemia/Artemia'
import HuntCardsDeck from './material/hunt-cards/HuntCardsDeck'
import {DrawHuntCard} from '@bga/not-alone/moves/DrawHuntCard'
import SurvivalCardsDeck from './material/survival-cards/SurvivalCardsDeck'
import {PlayPlaceCard} from '@bga/not-alone/moves/PlayPlaceCard'
import OtherPlayers from './other-players/OtherPlayers'
import PlayerMaterial from './player/PlayerMaterial'
import {DrawSurvivalCard} from '@bga/not-alone/moves/DrawSurvivalCard'
import {ChooseBoardSideUI} from './moves-display/ChooseBoardSideUI'
import {DrawHuntCardUI} from './moves-display/DrawHuntCardUI'
import {DrawSurvivalCardUI} from './moves-display/DrawSurvivalCardUI'
import {PlayPlaceCardUI} from './moves-display/PlayPlaceCardUI'
import {PlaceHuntToken} from '@bga/not-alone/moves/PlaceHuntToken'
import {PlaceHuntTokenUI} from './moves-display/PlaceHuntTokenUI'
import HuntToken from './material/hunt-tokens/HuntToken'
import {Pass} from '@bga/not-alone/moves/Pass'
import {PassUI} from './moves-display/PassUI'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import {lightBlue, pink} from '@material-ui/core/colors'
import {HUNT_TOKENS} from '@bga/not-alone/material/HuntTokens'
import {useTranslation} from 'react-i18next'
import {PlayHuntCardUI} from './moves-display/PlayHuntCardUI'
import {PlayHuntCard} from '@bga/not-alone/moves/PlayHuntCard'
import {PlaySurvivalCard} from '@bga/not-alone/moves/PlaySurvivalCard'
import {PlaySurvivalCardUI} from './moves-display/PlaySurvivalCardUI'
import {RevealPlaceCards} from '@bga/not-alone/moves/RevealPlaceCard'
import {RevealPlaceCardsUI} from './moves-display/RevealPlaceCardsUI'
import {UsePlacePower} from '@bga/not-alone/moves/UsePlacePower'
import {UsePlacePowerUI} from './moves-display/UsePlacePowerUI'
import HeaderContent from './HeaderContent'

const createTheme = (color) => createMuiTheme({
  palette: {
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

const phases = {
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
        <h2 className="information"><HeaderContent {...props}/></h2>
        {game.phase && <h3 className="phase">{t(phases[game.phase])}</h3>}
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
Object.assign(RevealPlaceCards, RevealPlaceCardsUI)
Object.assign(UsePlacePower, UsePlacePowerUI)
Object.assign(Pass, PassUI)

export const getInformation = (t, game, playerId, animation, playersMap) => {
  if (game.assimilationCounter === 0) {
    return t('{player} has assimilated the Hunted and wins the game!', {player: playersMap[CREATURE].name, gender: playersMap[CREATURE].gender})
  } else if (game.rescueCounter === 0) {
    return t('The Hunted escaped Artemia, they all win the game!')
  }
}