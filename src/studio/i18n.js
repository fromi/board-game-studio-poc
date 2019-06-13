import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

i18n.use(initReactI18next).init({
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

        'Hunt cards ({{count}} card(s) left)': 'Cartes Traque ({{count}} carte restante)',
        'Hunt cards ({{count}} card(s) left)_plural': 'Cartes Traque ({{count}} cartes restantes)'
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
