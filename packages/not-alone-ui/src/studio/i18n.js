import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import ICU from 'i18next-icu'

i18n.use(ICU).use(initReactI18next).init({
  resources: {
    fr: {
      translation: {
        'Phase 1: Exploration': 'Phase 1 : Exploration',
        'Phase 2: Hunting': 'Phase 2 : Traque',
        'Phase 3: Reckoning': 'Phase 3 : Résolution',
        'Phase 4: End-of-turn actions': 'Phase 4 : Maintenance',

        'Rescue counter': 'Pion Secours',
        'A cylindrical blue counter representing the Rescue counter': 'Un pion bleu cylindrique représentant le pion Secours',
        'Assimilation counter': 'Pion Assimilation',
        'A cylindrical purple counter representing the Assimilation counter': 'Un pion violet cylindrique représentant le pion Assimilation',

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
          'Avancez le pion Secours de 1 case.',
        'The Hunted of your choice (you or another player) regains 1 Will OR you draw 1 Survival card.':
          'Le Traqué de votre choix (vous ou un autre joueur) récupère 1 Volonté OU piochez 1 carte Survie.',
        'Next turn, play 2 Place cards. Resolve both places.':
          'Au prochain tour, jouez 2 cartes Lieu. Résolvez les 2 lieux.',
        'You may not copy the Artefact.':
          'L’Artefact ne peut être copié.',

        'Hunt cards ({count, plural, one {one card} other {{count} cards}} left)': 'Cartes Traque ({count, plural, one {une carte restante} other {{count} cartes restantes}})',

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

        'Phase {number}': 'Phase {number}',
        'Phase of the copied card': 'Phase de la carte copiée',

        'Survival cards ({count, plural, one {one card} other {{count} cards}} left)': 'Cartes Survie ({count, plural, one {une carte restante} other {{count} cartes restantes}})',

        'Adrenaline': 'Adrénaline',
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

        '{placeCards, plural, one {One Place card} other {{placeCards} Place cards}} and {survivalCards, plural, one {one Survival card} other {{survivalCards} Survival cards}}':
          '{placeCards, plural, one {Une carte} other {{placeCards} cartes}} Lieu et {survivalCards, plural, one {une carte} other {{survivalCards} cartes}} Survie',
        '{count, plural, one {One Hunt card} other {{count} Hunt cards}}': '{count, plural, one {Une carte} other {{count} cartes}} Traque',
        'A red cube representing a Will counter': 'Un cube rouge représentant un pion Volonté',
        'You have {count, plural, one {one Will counter} other {{count} Will counters}}': 'Vous avez {count, plural, one {un pion} other {{count} pions}} Volonté',
        '{count, plural, one {One Will counter} other {{count} Will counters}}': '{count, plural, one {Un pion} other {{count} pions}} Volonté',

        'You are the Creature. Please choose the board side.': 'Vous êtes la Créature ! Veuillez choisir la face du plateau.',
        '{player} is the Creature! {gender, select, ♀ {She} ♂ {He} other {They}} must choose the board side.': '{player} est la Creature! {gender, select, ♀ {Elle} ♂ {Il} other {Elle·Il}} doit choisir la face du plateau.',
        'Board side is chosen! Creating Artemia...': 'La face du plateau est choisie ! Création d’Artemia...',
        'You draw {quantity, plural, one {one Hunt card} other {{quantity} Hunt cards}}': 'Vous piochez {quantity, plural, one {une carte Traque} other {{quantity} cartes Traque}}',
        '{player} draws {quantity, plural, one {one Hunt card} other {{quantity} Hunt cards}}': '{player} pioche {quantity, plural, one {une carte Traque} other {{quantity} cartes Traque}}',
        'Hunted players must play a Place card': 'Les Traqués doivent jouer une carte Lieu',
        '{player} must play a Place card': '{player} doit jouer une carte Lieu',
        'You must play a Place card': 'Vous devez jouer une carte Lieu',
        'You must play a Place card. You may <1>Resist</1> or <3>Give up</3>.': 'Vous devez jouer une carte Lieu. Vous pouvez <1>Résister</1> ou <3>Lâcher prise</3>.',
        'You must play a Place card. You may <1>Give up</1>.': 'Vous devez jouer une carte Lieu. Vous pouvez <1>Lâcher prise</1>.',
        'You played {place}': 'Vous avez joué {place}',
        '{player} played a place card': '{player} a joué une carte Lieu',
        'You draw {quantity, plural, one {a Survival card} other {{quantity} Survival cards}}': 'Vous piochez {quantity, plural, one {une carte Survie} other {{quantity} cartes Survie}}',
        '{player} draws {quantity, plural, one {a Survival card} other {{quantity} Survival cards}}': '{player} pioche {quantity, plural, one {une carte Survie} other {{quantity} cartes Survie}}',

        'The Creature will have the Artemia token when Rescue counter is 6 spaces or less from victory.':
          'La Créature pourra placer le jeton Artemia lorsque le jeton Secours sera à 6 cases ou moins de la victoire.',
        'The Creature will have the Artemia token when Rescue counter is 1, 3, 5, 7, 9 or 11 spaces away from victory.':
          'La Créature pourra placer le jeton Artemia lorsque le jeton Secours sera à 1, 3, 5, 7, 9 or 11 cases de la victoire.',

        'Play {place}': 'Jouer {place}',
        '{player} played {count, plural, one {one Place card} other {{count} Place cards}}, not revealed yet': '{player} a joué {count, plural, one {une carte} other {{count} cartes}} Lieu, pas encore révélée',
        'All the Hunted have selected a Place to explore': 'Tous les traqués ont choisi un Lieu à explorer',

        'Reserve: there is {count, plural, one {one copy} other {{count} copies}} left to take using The Rover':
          'Réserve : il reste {count, plural, one {un exemplaire} other {{count} exemplaires}} à prendre avec Le Rover',

        'Creature token': 'Jeton Créature',
        'Artemia token': 'Jeton Artemia',
        'Target token': 'Jeton Cible',

        'You may place the Creature token on Artemia': 'Vous pouvez placer le jeton Creature sur Artemia',
        'You may place the Artemia token on Artemia': 'Vous pouvez placer le jeton Artemia sur Artemia',
        'You may place the Target token on Artemia': 'Vous pouvez placer le jeton Cible sur Artemia',
        'You may place the Creature and Artemia tokens on Artemia': 'Vous pouvez placer les jetons Creature et Artemia sur Artemia',
        'You may place the Creature and Target tokens on Artemia': 'Vous pouvez placer les jetons Creature et Cible sur Artemia',
        'You may place the Artemia and Target tokens on Artemia': 'Vous pouvez placer les jetons Artemia et Cible sur Artemia',
        'You may place all the Hunt tokens on Artemia!': 'Vous pouvez placer tous les jetons Traque sur Artemia !',
        '{player} may place Hunt tokens on Artemia': '{player} peut placer des jetons Traque sur Artemia',
        'You place the {huntToken} on {place}': 'Vous placez le {huntToken} sur {place}',
        'You place the {huntToken} on {place1} and {place2}': 'Vous placez le {huntToken} sur {place1} et {place2}',
        '{player} places the {huntToken} on {place}': '{player} place le {huntToken} sur {place}',
        '{player} places the {huntToken} on {place1} and {place2}': '{player} place le {huntToken} sur {place1} et {place2}',

        'Pass': 'Passer',
        'Pass to end your turn': 'Passez pour terminer votre tour',
        'You cannot play your Hunt cards, you must pass': 'Vous ne pouvez pas jouer vos cartes Traque, vous devez passer',
        'You cannot play your Hunt cards, you must <1>Pass</1>': 'Vous ne pouvez pas jouer vos cartes Traque, vous devez <1>Passer</1>',
        'You cannot play your Survival {cards, plural, one{card} other{cards}}, you must pass': 'Vous ne pouvez pas jouer {cards, plural, one{votre carte} other{vos cartes}} Survie, vous devez passer',
        'You cannot play your Survival {cards, plural, one{card} other{cards}}, you must <0>Pass</0>': 'Vous ne pouvez pas jouer {cards, plural, one{votre carte} other{vos cartes}} Survie, vous devez <0>Passer</0>',
        'You must play {card} or <0>Pass</0>': 'Vous devez jouer {card} ou <0>Passer</0>',
        'You must play {card1} or {card2} or <0>Pass</0>': 'Vous devez jouer {card1} ou {card2} ou <0>Passer</0>',
        'You must play a Hunt card or <1>Pass</1>': 'Vous devez jouer une carte Traque ou <1>Passer</1>',
        'You must play a Survival card or <1>Pass</1>': 'Vous devez jouer une carte Survie ou <1>Passer</1>',
        'I don’t play any Hunt card': 'Je ne joue pas de carte Traque',
        'I pass': 'Je passe',

        '{player} must play a Hunt card or pass': '{player} doit jouer une carte Traque ou passer',
        '{player} must play a Survival card or pass': '{player} doit jouer une carte Survie ou passer',
        'Some players may play a Hunt card or a Survival card': 'Certains joueurs peuvent jouer une carte Traque ou une carte Survie',
        'Some Hunted may play a Survival card': 'Certains Traqués peuvent jouer une carte Survie',

        'You reveal {place}': 'Vous révélez {place}',
        'You reveal {place1} and {place2}': 'Vous révélez {place1} et {place2}',
        '{player} reveals {place}': '{player} revèle {place}',
        '{player} reveals {place1} and {place2}': '{player} révèle {place1} et {place2}',
        '{player} played {place}': '{player} a joué {place}',

        'Marker counter (see "The Beach")': 'Pion Balise (voir "La Plage")',
        'A round yellow piece': 'Un pion jaune et rond',
        'You may use the power of {place}': 'Vous pouvez utiliser le pouvoir de {place}',
        '{player} may use the power of {place}': '{player} peut utiliser le pouvoir de {place}',

        '{place} is in your discard': '{place} est dans votre défausse',
        '{place} is in {player}’s discard': '{place} est dans la défausse de {player}',

        'Undo': 'Annuler',
        'The game begins!': 'La partie commence !',
        'Replay from this move': 'Revoir depuis ce coup',

        'You use the power of {place}': 'Vous utilisez le pouvoir de {place}',
        '{player} uses the power of {place}': '{player} utilise le pouvoir de {place}',
        'You take back {place} to your hand': 'Vous reprenez {place} en main',
        '{player} takes back {place} to {gender, select, ♀ {her} ♂ {his} other {their}}': '{player} reprend {place} en main'
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
})
