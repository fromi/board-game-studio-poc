import React from "react"
import HuntCard from "./HuntCard"
import Tooltip from '@material-ui/core/Tooltip';
import {useTranslation} from 'react-i18next';

const HuntCardsDeck = ({game}) => {
  const {t} = useTranslation()
  return (
    <Tooltip title={t('Hunt cards ({{count}} card(s) left)', {count: game.huntCardsDeck.length})} enterTouchDelay={0}>
      <div className="hunt-cards-deck">
        {game.huntCardsDeck.slice(0, 5).map((card, index) => (
          <HuntCard key={index}/>
        ))}
      </div>
    </Tooltip>
  )
}

export default HuntCardsDeck