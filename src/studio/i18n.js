import i18n from "i18next"
import {initReactI18next} from "react-i18next"

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      translation: {
        "The Lair": "L’Antre",
        "The Jungle": "La Jungle",
        "The River": "La Rivière",
        "The Beach": "La Plage",
        "The Rover": "Le Rover",
        "The Swamp": "Le Marais",
        "The Shelter": "L’Abri",
        "The Wreck": "L’Épave",
        "The Source": "La Source",
        "The Artefact": "L’Artefact"
      }
    }
  },
  lng: "fr",
  fallbackLng: false,
  debug: true,
  nsSeparator: false,
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});
