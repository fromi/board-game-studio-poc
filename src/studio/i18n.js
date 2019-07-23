import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import ICU from 'i18next-icu'

i18n.use(ICU).use(initReactI18next).init({
  resources: {
    fr: {
      translation: {
        'The Lair': 'L’Antre',
        'The Jungle': 'La Jungle',
        'The River': 'La Rivière',
        'The Beach': 'La Plage',
        'The Rover': 'Le Rover',
        'The Swamp': 'Le Marais',
        'The Shelter': 'L’Abri',
        'The Wreck': 'L’Épave',
        'The Source': 'La Source',
        'The Artefact': 'L’Artefact',

        'Take back to your hand the Place cards from your discard pile OR copy the power of the place with the Creature token.':
          'Reprenez en main les cartes Lieu de votre défausse OU copiez le pouvoir du lieu avec le jeton Créature.',
        'Lose 1 extra Will if caught by the Creature token.':
          'Perdez 1 Volonté supplémentaire si le jeton Créature vous attrape.',
        'Take back to your hand this Place card and 1 Place card from your discard pile.':
          'Reprenez en main cette carte Lieu et 1 carte Lieu de votre défausse.',
        'Next turn, play 2 Place cards. Before revealing, choose one and return the second to your hand.':
          'Au prochain tour, jouez 2 cartes Lieu. Avant de révéler, choisissez-en une et reprenez l’autre en main.',
        'Place the Marker counter on the Beach OR remove it to move the Rescue counter forward 1 space.':
          'Placez le pion Balise sur la Plage OU retirez-le pour avancer le pion Secours de 1 case.',
        '(max 1x/turn)': '(max 1x/tour)',
        'Take from the reserve 1 Place card you do not own and add it to your hand.':
          'Prenez de la réserve 1 carte Lieu que vous ne possédez pas et ajoutez-la à votre main.',
        'Take back to your hand this Place card and 2 Place cards from your discard pile.':
          'Reprenez en main cette carte Lieu et 2 cartes Lieu de votre défausse.',
        'Draw 2 Survival cards, choose one and discard the second.':
          'Piochez 2 cartes Survie, gardez-en une et défaussez l’autre.',
        'Move the Rescue counter forward 1 space.':
          'Avancez le pion Secours de 1 case. (max 1x/tour)',
        'The Hunted of your choice (you or another player) regains 1 Will OR you draw 1 Survival card.':
          'Le Traqué de votre choix (vous ou un autre joueur) récupère 1 Volonté OU piochez 1 carte Survie.',
        'Next turn, play 2 Place cards. Resolve both places.':
          'Au prochain tour, jouez 2 cartes Lieu. Résolvez les 2 lieux.',
        'You may not copy the Artefact.':
          'L’Artefact ne peut être copié.',

        'Hunt cards ({count} {count, plural, one {card} other {cards}} left)': 'Cartes Traque ({count} {count, plural, one {carte restante} other {cartes restantes}})',

        'Despair': 'Désespoir',
        'Force Field': 'Champ de Force',
        'Anticipation': 'Anticipation',
        'Ascendancy': 'Emprise',
        'Fierceness': 'Acharnement',
        'Forbidden Zone': 'Zone Interdite',
        'Interference': 'Interférences',
        'Persecution': 'Harcèlement',
        'Mutation': 'Mutation',
        'Phobia': 'Psychose',
        'Virus': 'Virus',
        'Clone': 'Clone',
        'Mirage': 'Mirage',
        'Scream': 'Hurlements',
        'Toxin': 'Toxine',
        'Cataclysm': 'Cataclysme',
        'Detour': 'Détour',
        'Stasis': 'Stase',
        'Tracking': 'Repérage',
        'Flashback': 'Flashback',

        'No Survival cards may be played or drawn for the remainder of the turn.':
          'Aucune carte Survie ne peut être jouée ou piochée pour le reste du tour.',
        'Before the Hunted play, target 2 adjacent places. Neither may be played this turn.':
          'Avant que les Traqués ne jouent, ciblez 2 lieux adjacents. Ces lieux sont inaccessibles pour le tour.',
        'Choose one Hunted. If you catch him with the Creature token, move the Assimilation counter forward 1 extra space.':
          'Désignez un Traqué. Si vous l’attrapez avec le jeton Créature, le pion Assimilation avance de 1 case supplémentaire.',
        'Force one Hunted to discard all but 2 Place cards from his hand.':
          'Le Traqué de votre choix défausse toutes les cartes Lieu de sa main sauf 2.',
        'Hunted caught by the Creature token lose 1 extra Will.':
          'Le jeton Créature fait perdre 1 Volonté supplémentaire.',
        'All Hunted discard 1 Place card simultaneously.':
          'Les Traqués défaussent simultanément 1 carte Lieu.',
        'The powers of the Beach and the Wreck are ineffective.':
          'Les pouvoirs de la Plage et de l’Epave sont inutilisables.',
        'Each Hunted may only take back 1 Place card when using the power of a Place card.':
          'Chaque Traqué ne peut récupérer que 1 seule carte Lieu quand il utilise le pouvoir d’un lieu.',
        'In addition to its effects, the Artemia token inflicts the loss of 1 Will.':
          'En plus de ses effets, le jeton Artemia fait perdre 1 Volonté.',
        'Force one Hunted to show you all but 2 Place cards from his hand.':
          'Le Traqué de votre choix vous révèle toutes les cartes Lieu de sa main sauf 2.',
        'Target 2 adjacent places. Apply the effects of the Artemia token on both places.':
          'Ciblez 2 lieux adjacents. Les effets du jeton Artemia s’appliquent sur ces 2 lieux.',
        'Consider the Target token as a second Creature token.':
          'Considérez le jeton Cible comme un second jeton Créature.',
        'Target 2 adjacent places. Both are ineffective.':
          'Ciblez 2 lieux adjacents. Leurs pouvoirs sont inutilisables.',
        'Each Hunted on the targeted place must discard 2 Place cards or lose 1 Will.':
          'Chaque Traqué présent sur le lieu ciblé doit défausser 2 cartes Lieu ou perdre 1 Volonté.',
        'Each Hunted on the targeted place discards 1 Survival card. The power of the place is ineffective.':
          'Chaque Traqué présent sur le lieu ciblé défausse 1 carte Survie. Le pouvoir du lieu est inutilisable.',
        'The place’s power of your choice is ineffective.':
          'Le pouvoir du lieu de votre choix est inutilisable.',
        'After the Hunted reveal their Place cards, move one Hunted to an adjacent place.':
          'Avant de résoudre les lieux, déplacez 1 Traqué vers un lieu adjacent.',
        'Prevent the Rescue counter moving forward during this phase.':
          'Le pion Secours n’avance pas lors de cette phase.',
        'Next turn, you may play up to 2 Hunt cards.':
          'Au prochain tour, vous pouvez jouer jusqu’à 2 cartes Traque.',
        'Copy the last Hunt card you discarded.':
          'Copiez la dernière carte Traque défaussée.',

        'Survival cards ({count} {count, plural, one {card} other {cards}} left)': 'Cartes Survie ({count} {count, plural, one {carte restante} other {cartes restantes}} left)',

        'Adrenaline': 'Adénaline',
        'Ingenuity': 'Système D',
        'Sacrifice': 'Sacrifice',
        'Sixth Sense': 'Sixième Sens',
        'Smokescreen': 'Brouillage',
        'Strike Back': 'Riposte',
        'Vortex': 'Vortex',
        'Detector': 'Détecteur',
        'Dodge': 'Esquive',
        'Drone': 'Drone',
        'Gate': 'Portail',
        'Hologram': 'Hologramme',
        'Wrong Track': 'Fausse Piste',
        'Amplifier': 'Amplificateur',
        'Double Back': 'Volte-Face',

        'Regain 1 Will.':
          'Récupérez 1 Volonté.',
        'Place the Marker counter on the Beach.':
          'Placez le pion Balise sur la Plage.',
        'Discard 1 Place card. No Hunt card may be played this turn.':
          'Défaussez 1 carte Lieu. Aucune carte Traque ne peut être jouée ce tour-ci.',
        'Take back to your hand 2 Place cards from your discard pile.':
          'Reprenez en main 2 cartes Lieu de votre défausse.',
        'All the Hunted hide their discarded Place cards until the end of the turn.':
          'Tous les Traqués cachent les cartes Lieu de leur défausse jusqu’à la fin du tour.',
        'Take 2 random Hunt cards from the Creature’s hand and put them at the bottom of the Hunt deck.':
          'Tirez 2 cartes Traque au hasard de la main de la Créature et placez-les sous la pioche Traque.',
        'Swap your played Place card for one Place card from your discard pile.':
          'Échangez votre carte Lieu jouée contre une carte Lieu de votre défausse.',
        'Avoid the effects of the Artemia token.':
          'Évitez les effets du jeton Artemia.',
        'Avoid the effects of the Creature token.':
          'Évitez les effets du jeton Créature. ',
        'Instead of using the power of your Place card, copy the power of the Rover.':
          'A la place d’utiliser le pouvoir de votre carte Lieu, copiez le pouvoir du Rover.',
        'Instead of using the power of your Place card, copy the power of an adjacent place.':
          'A la place d’utiliser le pouvoir de votre carte Lieu, copiez le pouvoir d’un lieu adjacent.',
        'Move the Artemia token to an adjacent place.':
          'Déplacez le jeton Artemia sur un lieu adjacent.',
        'Move the Creature token to an adjacent place.':
          'Déplacez le jeton Créature sur un lieu adjacent.',
        'Remove the Marker counter from the Beach to immediately move the Rescue counter forward 1 space.':
          'Retirez le pion Balise de la Plage pour avancer immédiatement le pion Secours de 1 case.',
        'Take back the Place card you just played.':
          'Reprenez en main votre carte Lieu jouée.',

        '{count} Place {count, plural, one {card} other {cards}}': '{count} {count, plural, one {carte} other {cartes}} Lieu',
        '{count} Survival {count, plural, one {card} other {cards}}': '{count} {count, plural, one {carte} other {cartes}} Survie',
        '{count} Hunt {count, plural, one {card} other {cards}}': '{count} {count, plural, one {carte} other {cartes}} Traque',
        'A Will counter': 'Un pion Volonté',
        '{count} Will {count, plural, one {counter} other {counters}}': '{count} {count, plural, one {pion} other {pions}} Volonté',

        'You are the Creature. Please choose the board side.': 'Vous êtes la Créature ! Veuillez choisir la face du plateau.',
        '{player} is the Creature! {gender, select, ♀ {She} ♂ {He} other {They}} must choose the board side.': '{player} est la Creature! {gender, select, ♀ {Elle} ♂ {Il} other {Elle·Il}} doit choisir la face du plateau.',
        'Board side is chosen! Creating Artemia...': 'La face du plateau est choisie ! Création d’Artemia...',
        'You draw 3 Hunt cards': 'Vous piochez 3 cartes Traque',
        '{player} draws 3 Hunt cards': '{player} pioche 3 cartes Traque',
        'Hunted players must play a Place card': 'Les Traqués doivent jouer une carte Lieu',
        'You must play a Place card': 'Vous devez jouer une carte lieu',
        'You played {place}': 'Vous avez joué {place}',
        'You draw a Survival card': 'Vous piochez une carte Survie',
        '{player} draws a Survival card': '{player} pioche une carte Survie',

        'The Creature will have the Artemia token when Rescue counter is 6 spaces or less from victory.':
          'La Créature pourra placer le jeton Artemia lorsque le jeton Secours sera à 6 cases ou moins de la victoire.',
        'The Creature will have the Artemia token when Rescue counter is 1, 3, 5, 7, 9 or 11 spaces away from victory.':
          'La Créature pourra placer le jeton Artemia lorsque le jeton Secours sera à 1, 3, 5, 7, 9 or 11 cases de la victoire.',
        'Reach the star with the Assimilation counter before the Rescue counter does!':
          'Atteignez l’étoile avec le jeton Assimilation avant le jeton Secours !',
        'Reach the star with the Rescue counter before the Assimilation counter does!':
          'Atteignez l’étoile avec le jeton Secours avant le jeton Assimilation !',

        'Play {place}': 'Jouer {place}',
        '{player} played {count} Place {count, plural, one {card} other {cards}}, not revealed yet': '{player} a joué {count} {count, plural, one {carte} other {cartes}} Lieu, pas encore révélée',

        '{count} {count, plural, one {copy} other {copies}} left in the reserve': '{count} {count, plural, one {exemplaire restant} other {exemplaires restants}} dans la réserve',
      }
    }
  },
  lng: 'fr',
  fallbackLng: false,
  debug: true,
  nsSeparator: false,
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});
