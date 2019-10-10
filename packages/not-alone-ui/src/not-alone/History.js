import React from 'react'
import {IconButton, Popover} from '@material-ui/core'
import {History as HistoryIcon} from '@material-ui/icons'
import './history.scss'
import PastMove from './PastMove'

export default function History(props) {
  const {moveHistory} = props
  const [isOpen, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <IconButton className="history-button" onClick={() => setOpen(true)}>
        <HistoryIcon/>
      </IconButton>
      <Popover className="history" open={isOpen} onClose={() => setOpen(false)}>
        <ol>
          {moveHistory.map((move, index) => <PastMove key={index} index={index} move={move} {...props}/>)}
        </ol>
      </Popover>
    </React.Fragment>
  )
}