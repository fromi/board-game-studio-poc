import React from 'react'
import {IconButton, Popover} from '@material-ui/core'
import {History as HistoryIcon} from '@material-ui/icons'
import './history.scss'
import PastMove from './PastMove'
import {useTranslation} from 'react-i18next'
import ReplayButton from './ReplayButton'
import Scrollbar from 'react-scrollbars-custom'

export default function History(props) {
  const {t} = useTranslation()
  const {moveHistory, replay} = props
  const [isOpen, setOpen] = React.useState(false)

  const closeAndReplay = moveIndex => {
    setOpen(false)
    replay(moveIndex)
  }

  return (
    <React.Fragment>
      <IconButton className="history-button" onClick={() => setOpen(true)}>
        <HistoryIcon/>
      </IconButton>
      <Popover className="history" open={isOpen} onClose={() => setOpen(false)}>
        <Scrollbar>
          <ol>
            <li>
              <ReplayButton onClick={() => closeAndReplay(0)}/>
              {t('The game begins!')}
            </li>
            {moveHistory.map((move, index) => <PastMove key={index} index={index} move={move} {...props} replay={closeAndReplay}/>)}
          </ol>
        </Scrollbar>
      </Popover>
    </React.Fragment>
  )
}