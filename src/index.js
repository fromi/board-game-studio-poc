import React from 'react'
import {render} from 'react-dom'
import Studio from './studio/Studio'
import Game from "./not-alone/NotAlone"
import GameUI from "./not-alone/NotAloneUI"
import './index.css'

render(<Studio game={Game} ui={GameUI}/>, document.getElementById('studio'))