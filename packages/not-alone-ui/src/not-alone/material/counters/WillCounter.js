import React from 'react'
import {useTranslation} from 'react-i18next'
import willCounter from './will-counter.png'
import './will-counter.scss'

export default function WillCounter({className = ''}) {
  const {t} = useTranslation()
  return <img className={"will-counter " + className} src={willCounter} alt={t('A red cube representing a Will counter')}/>
}