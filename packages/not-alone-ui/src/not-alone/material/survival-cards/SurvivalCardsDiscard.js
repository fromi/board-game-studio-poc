import React from 'react'
import SurvivalCard, {survivalCardTexts} from './SurvivalCard'
import {useTranslation} from 'react-i18next'
import './survival-cards-discard.scss'
import {useDrop} from 'react-dnd'
import {SURVIVAL_CARD} from '@bga/not-alone'
import {DISCARD_SURVIVAL_CARD, discardSurvivalCard} from '@bga/not-alone/moves/DiscardSurvivalCard'
import {MOVE_PLAYED} from '../../../studio/reducers/ServerReducer'

export default function SurvivalCardsDiscard({game, playerId, animation, play}) {
  const {t} = useTranslation()

  const [{draggedCard, isOver}, drop] = useDrop({
    accept: SURVIVAL_CARD,
    collect: (monitor) => ({
      draggedCard: monitor.getItem() ? monitor.getItem().card : undefined,
      isOver: monitor.isOver()
    }),
    drop: item => play(discardSurvivalCard(playerId, item.card))
  })
  const dropInfoClasses = ['drop-info']
  if (isOver) {
    dropInfoClasses.push('item-over')
  }

  const isBeingDiscarded = card => animation && animation.type === MOVE_PLAYED && animation.move.type === DISCARD_SURVIVAL_CARD && animation.move.card === card

  return (
      <div className="survival-cards-discard" ref={drop}>
        {game.survivalCardsDiscard.filter(card => !isBeingDiscarded(card)).map((card) => <SurvivalCard card={card} key={card}/>)}
        {draggedCard && <div className={dropInfoClasses.join(' ')}><p>{t('Discard {card}', {card: survivalCardTexts[draggedCard].name(t)})}</p></div>}
      </div>
  )
}