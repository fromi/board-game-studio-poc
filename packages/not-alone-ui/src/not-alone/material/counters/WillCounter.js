import React from 'react'
import {useTranslation} from 'react-i18next'
import willCounter from './will-counter.png'
import './will-counter.scss'

const WillCounter = () => {
  const {t} = useTranslation()
  return <img className="will-counter" src={willCounter} alt={t('A red cube representing a Will counter')}/>
}
export default WillCounter