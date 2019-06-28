import React from "react"
import SurvivalCard from "./SurvivalCard"
import Tooltip from '@material-ui/core/Tooltip';
import {useTranslation} from 'react-i18next';

const SurvivalCardsDeck = ({game}) => {
  const {t} = useTranslation()
  return (
    <Tooltip title={t('Survival cards ({{count}} card(s) left)', {count: game.survivalCardsDeck.length})} enterTouchDelay={0}>
      <div className="survival-cards-deck">
        {game.survivalCardsDeck.slice(0, 8).map((card, index) => (
          <SurvivalCard key={index}/>
        ))}
      </div>
    </Tooltip>
  )
}

export default SurvivalCardsDeck