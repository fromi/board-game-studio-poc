import React from 'react'
import {IconButton, Popover} from '@material-ui/core'
import {History as HistoryIcon, PlayCircleOutline, Undo} from '@material-ui/icons'
import './history.scss'

export default function History({moveHistory}) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  return (
    <React.Fragment>
      <IconButton className="history-button" onClick={event => setAnchorEl(event.currentTarget)}>
        <HistoryIcon/>
      </IconButton>
      <Popover className="history" open={anchorEl != null} onClose={() => setAnchorEl(null)}>
        <ol>
          {moveHistory.map((move, index) => <li key={index}><Undo/><PlayCircleOutline/>{JSON.stringify(move)}</li>)}
        </ol>
      </Popover>
    </React.Fragment>
  )
}