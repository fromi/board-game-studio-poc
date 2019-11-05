import React from 'react'
import SurvivalCard, {survivalCardTexts} from './SurvivalCard'
import {useTranslation} from 'react-i18next'
import './survival-cards-discard.scss'
import {useDrop} from 'react-dnd'
import {SURVIVAL_CARD} from '@bga/not-alone'
import {discardSurvivalCard} from '@bga/not-alone/moves/DiscardSurvivalCard'

export default function SurvivalCardsDiscard({game, playerId, play}) {
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

  return (
      <div className="survival-cards-discard" ref={drop}>
        {game.survivalCardsDiscard.map((card) => <SurvivalCard card={card} key={card}/>)}
        {draggedCard && <div className={dropInfoClasses.join(' ')}><p>{t('Discard {card}', {card: survivalCardTexts[draggedCard].name(t)})}</p></div>}
      </div>
  )
}