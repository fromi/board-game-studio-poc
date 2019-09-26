import React from 'react'
import {useTranslation} from 'react-i18next'
import './hunt-card.scss'
import {
  ANTICIPATION,
  ASCENDANCY,
  CATACLYSM,
  CLONE,
  DESPAIR,
  DETOUR,
  FIERCENESS,
  FLASHBACK,
  FORBIDDEN_ZONE,
  FORCE_FIELD,
  huntCardRule,
  INTERFERENCE,
  MIRAGE,
  MUTATION,
  PERSECUTION,
  PHOBIA,
  SCREAM,
  STASIS,
  TOXIN,
  TRACKING,
  VIRUS
} from '@bga/not-alone/material/HuntCards'
import {tokensDisplay} from '../hunt-tokens/HuntToken'

const HuntCard = ({cardName, classes = []}) => {
  const {t} = useTranslation()
  classes.push('card', 'hunt-card')
  const HuntCardRule = huntCardRule(cardName)
  return (
    <div className={classes.join(' ')}>
      {cardName && (
        <div className="face front">
          <h3 key="name">{t(cardName)}</h3>
          {HuntCardRule.token && <img src={tokensDisplay[HuntCardRule.token].image} className="hunt-token-symbol" alt={tokensDisplay[HuntCardRule.token].description(t)} draggable={false}/>}
          <div className="description" key="description">
            <p>{t(descriptions[cardName])}</p>
          </div>
          <p className="phase">{cardName === FLASHBACK ? t('Phase of the copied card') : t('Phase {number}', {number: HuntCardRule.phase})}</p>
        </div>
      )}
      <div className="face back"/>
    </div>
  )
}

const descriptions = {
  [DESPAIR]: 'No Survival cards may be played or drawn for the remainder of the turn.',
  [FORCE_FIELD]: 'Before the Hunted play, target 2 adjacent places. Neither may be played this turn.',
  [ANTICIPATION]: 'Choose one Hunted. If you catch him with the Creature token, move the Assimilation counter forward 1 extra space.',
  [ASCENDANCY]: 'Force one Hunted to discard all but 2 Place cards from his hand.',
  [FIERCENESS]: 'Hunted caught by the Creature token lose 1 extra Will.',
  [FORBIDDEN_ZONE]: 'All Hunted discard 1 Place card simultaneously.',
  [INTERFERENCE]: 'The powers of the Beach and the Wreck are ineffective.',
  [PERSECUTION]: 'Each Hunted may only take back 1 Place card when using the power of a Place card.',
  [MUTATION]: 'In addition to its effects, the Artemia token inflicts the loss of 1 Will.',
  [PHOBIA]: 'Force one Hunted to show you all but 2 Place cards from his hand.',
  [VIRUS]: 'Target 2 adjacent places. Apply the effects of the Artemia token on both places.',
  [CLONE]: 'Consider the Target token as a second Creature token.',
  [MIRAGE]: 'Target 2 adjacent places. Both are ineffective.',
  [SCREAM]: 'Each Hunted on the targeted place must discard 2 Place cards or lose 1 Will.',
  [TOXIN]: 'Each Hunted on the targeted place discards 1 Survival card. The power of the place is ineffective.',
  [CATACLYSM]: 'The place’s power of your choice is ineffective.',
  [DETOUR]: 'After the Hunted reveal their Place cards, move one Hunted to an adjacent place.',
  [STASIS]: 'Prevent the Rescue counter moving forward during this phase.',
  [TRACKING]: 'Next turn, you may play up to 2 Hunt cards.',
  [FLASHBACK]: 'Copy the last Hunt card you discarded.'
}

export default HuntCard