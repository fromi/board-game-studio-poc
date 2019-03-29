import React from 'react'
import Typography from '@material-ui/core/Typography'

const NotAloneUI = ({game, player}) => (
  <div className="game-area">
    <Typography variant="h2" gutterBottom>Any content for {player ? player : 'some spectator'}</Typography>
    <pre>{JSON.stringify(game, null, 2)}</pre>
  </div>
)

export default NotAloneUI