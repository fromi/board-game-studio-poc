import React from 'react'
import {IconButton, Popover, Tooltip} from '@material-ui/core'
import {History as HistoryIcon, PlayCircleOutline} from '@material-ui/icons'
import './history.scss'
import PastMove from './PastMove'
import {useTranslation} from 'react-i18next'

export default function History(props) {
  const {t} = useTranslation()
  const {moveHistory, replay} = props
  const [isOpen, setOpen] = React.useState(false)

  const replayFrom = moveIndex => {
    setOpen(false)
    replay(moveIndex)
  }

  return (
    <React.Fragment>
      <IconButton className="history-button" onClick={() => setOpen(true)}>
        <HistoryIcon/>
      </IconButton>
      <Popover className="history" open={isOpen} onClose={() => setOpen(false)}>
        <ol>
          <li>
            <Tooltip title={t('Replay from this move')}>
              <IconButton disabled={moveHistory.length === 0} onClick={() => replayFrom(0)}>
                <PlayCircleOutline/>
              </IconButton>
            </Tooltip>
            {t('The game begins!')}
          </li>
          {moveHistory.map((move, index) => <PastMove key={index} index={index} move={move} {...props}/>)}
        </ol>
      </Popover>
    </React.Fragment>
  )
}