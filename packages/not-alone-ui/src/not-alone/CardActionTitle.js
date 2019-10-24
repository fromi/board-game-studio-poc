import {Trans, useTranslation} from 'react-i18next'
import React from 'react'
import {couldCreaturePlayHuntCard, CREATURE, getHunted, getLegalMoves, getPlayerIds, SURVIVAL_CARD} from '@bga/not-alone'
import {pass, PASS} from '@bga/not-alone/moves/Pass'
import {Button} from '@material-ui/core'
import {PLAY_HUNT_CARD} from '@bga/not-alone/moves/PlayHuntCard'
import {huntCardTexts} from './material/hunt-cards/HuntCard'
import {survivalCardTexts} from './material/survival-cards/SurvivalCard'

export default function CardActionTitle(props) {
  const {t} = useTranslation()
  const {game, playerId, playersMap} = props
  const ownMoves = getLegalMoves(game, playerId)
  if (ownMoves.some(move => move.type === PASS)) {
    const moveType = playerId === CREATURE ? PLAY_HUNT_CARD : SURVIVAL_CARD
    const eligibleCards = ownMoves.filter(move => move.type === moveType).map(move => move.card)
    if (eligibleCards.length === 0) {
      if (playerId === CREATURE) {
        return <Trans>You cannot play your Hunt cards, you must <Pass {...props}>Pass</Pass></Trans>
      } else {
        return <Trans defaults="You cannot play your Survival {cards, plural, one{card} other{cards}}, you must <0>Pass</0>"
                      values={{cards: getHunted(game, playerId).handSurvivalCards.length}}
                      components={[<Pass {...props}>Pass</Pass>]}/>
      }
    } else if (eligibleCards.length === 1) {
      const cardTexts = playerId === CREATURE ? huntCardTexts : survivalCardTexts
      return <Trans defaults="You must play {card} or <0>Pass</0>"
                    values={{card: cardTexts[eligibleCards[0]].name(t)}}
                    components={[<Pass {...props}>Pass</Pass>]}/>
    } else if (eligibleCards.length === 2) {
      const cardTexts = playerId === CREATURE ? huntCardTexts : survivalCardTexts
      return <Trans defaults="You must play {card1} or {card2} or <0>Pass</0>"
                    values={{card1: cardTexts[eligibleCards[0]].name(t), card2: cardTexts[eligibleCards[1]].name(t)}}
                    components={[<Pass {...props}>Pass</Pass>]}/>
    } else {
      if (playerId === CREATURE) {
        return <Trans>You must play a Hunt card or <Pass {...props}>Pass</Pass></Trans>
      } else {
        return <Trans>You must play a Survival card or <Pass {...props}>Pass</Pass></Trans>
      }
    }
  }
  const awaitedPlayers = getPlayerIds(game).filter(playerId => getLegalMoves(game, playerId).some(move => move.type === PASS))
  const creatureCouldPlayHuntCard = awaitedPlayers.includes(CREATURE) && couldCreaturePlayHuntCard(game)
  if (awaitedPlayers.length === 1) {
    if (creatureCouldPlayHuntCard) {
      return t('{player} must play a Hunt card or pass', {player: playersMap[CREATURE].name})
    } else {
      return t('{player} must play a Survival card or pass', {player: playersMap[awaitedPlayers[0]].name})
    }
  } else if (creatureCouldPlayHuntCard) {
    return t('Some players may play a Hunt card or a Survival card')
  } else {
    return t('Some Hunted may play a Survival card')
  }
}

const Pass = ({children, playerId, play}) => <Button color="primary" onClick={() => play(pass(playerId))}>{children}</Button>