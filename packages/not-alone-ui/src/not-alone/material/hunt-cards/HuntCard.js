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

export default function HuntCard({card, classes = []}) {
  const {t} = useTranslation()
  classes.push('card', 'hunt-card')
  const HuntCardRule = card ? huntCardRule(card) : null
  return (
    <div className={classes.join(' ')}>
      {card && (
        <div className="face front">
          <h3 key="name">{huntCardTexts[card].name(t)}</h3>
          {HuntCardRule.token &&
          <img src={tokensDisplay[HuntCardRule.token].image} className="hunt-token-symbol" alt={tokensDisplay[HuntCardRule.token].description(t)}
               draggable={false}/>}
          <div className="description" key="description">
            <p>{huntCardTexts[card].description(t)}</p>
          </div>
          <p className="phase">{card === FLASHBACK ? t('Phase of the copied card') : t('Phase {number}', {number: HuntCardRule.phase})}</p>
        </div>
      )}
      <div className="face back"/>
    </div>
  )
}

export const huntCardTexts = {
  [DESPAIR]: {
    name: t => t('Despair'),
    description: t => t('No Survival cards may be played or drawn for the remainder of the turn.')
  },
  [FORCE_FIELD]: {
    name: t => t('Force Field'),
    description: t => t('Before the Hunted play, target 2 adjacent places. Neither may be played this turn.')
  },
  [ANTICIPATION]: {
    name: t => t('Anticipation'),
    description: t => t('Choose one Hunted. If you catch him with the Creature token, move the Assimilation counter forward 1 extra space.')
  },
  [ASCENDANCY]: {
    name: t => t('Ascendancy'),
    description: t => t('Force one Hunted to discard all but 2 Place cards from his hand.')
  },
  [FIERCENESS]: {
    name: t => t('Fierceness'),
    description: t => t('Hunted caught by the Creature token lose 1 extra Will.')
  },
  [FORBIDDEN_ZONE]: {
    name: t => t('Forbidden Zone'),
    description: t => t('All Hunted discard 1 Place card simultaneously.')
  },
  [INTERFERENCE]: {
    name: t => t('Interference'),
    description: t => t('The powers of the Beach and the Wreck are ineffective.')
  },
  [PERSECUTION]: {
    name: t => t('Persecution'),
    description: t => t('Each Hunted may only take back 1 Place card when using the power of a Place card.')
  },
  [MUTATION]: {
    name: t => t('Mutation'),
    description: t => t('In addition to its effects, the Artemia token inflicts the loss of 1 Will.')
  },
  [PHOBIA]: {
    name: t => t('Phobia'),
    description: t => t('Force one Hunted to show you all but 2 Place cards from his hand.')
  },
  [VIRUS]: {
    name: t => t('Virus'),
    description: t => t('Target 2 adjacent places. Apply the effects of the Artemia token on both places.')
  },
  [CLONE]: {
    name: t => t('Clone'),
    description: t => t('Consider the Target token as a second Creature token.')
  },
  [MIRAGE]: {
    name: t => t('Mirage'),
    description: t => t('Target 2 adjacent places. Both are ineffective.')
  },
  [SCREAM]: {
    name: t => t('Scream'),
    description: t => t('Each Hunted on the targeted place must discard 2 Place cards or lose 1 Will.')
  },
  [TOXIN]: {
    name: t => t('Toxin'),
    description: t => t('Each Hunted on the targeted place discards 1 Survival card. The power of the place is ineffective.')
  },
  [CATACLYSM]: {
    name: t => t('Cataclysm'),
    description: t => t('The place’s power of your choice is ineffective.')
  },
  [DETOUR]: {
    name: t => t('Detour'),
    description: t => t('After the Hunted reveal their Place cards, move one Hunted to an adjacent place.')
  },
  [STASIS]: {
    name: t => t('Stasis'),
    description: t => t('Prevent the Rescue counter moving forward during this phase.')
  },
  [TRACKING]: {
    name: t => t('Tracking'),
    description: t => t('Next turn, you may play up to 2 Hunt cards.')
  },
  [FLASHBACK]: {
    name: t => t('Flashback'),
    description: t => t('Copy the last Hunt card you discarded.')
  }
}