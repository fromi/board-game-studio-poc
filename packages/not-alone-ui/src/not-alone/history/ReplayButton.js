import {IconButton, Tooltip} from '@material-ui/core'
import {PlayCircleOutline} from '@material-ui/icons'
import React from 'react'
import {useTranslation} from 'react-i18next'

export default function ReplayButton({onClick}) {
  const {t} = useTranslation()
  return (
    <Tooltip title={t('Replay from this move')}>
      <IconButton onClick={onClick}>
        <PlayCircleOutline/>
      </IconButton>
    </Tooltip>
  )
}