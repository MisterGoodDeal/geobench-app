import * as RNLocalize from "react-native-localize";

const locales = {
  fr: {
    navigation: {
      home: "Accueil",
    },
    exampleText: "Ceci est un texte d'exemple",
  },
  en: {
    navigation: {
      home: "Home",
    },
    exampleText: "This is a text example",
  },
};

const getLang = (languageCode: string) => {
  switch (languageCode) {
    case "fr":
      return locales.fr;
      break;
    case "en":
      return locales.en;
      break;

    default:
      return locales.en;
      break;
  }
};

export const Lang = getLang(RNLocalize.getLocales()[0].languageCode);
