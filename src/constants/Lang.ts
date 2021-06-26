import * as RNLocalize from "react-native-localize";

const locales = {
  fr: {
    navigation: {
      home: "Accueil",
    },
    settings: {
      hello: "Salut ",
      exclamation: " !",
      subtext: "Voici vos paramètres",
      ph_fullname: "Votre nom complet...",
      ph_email: "Votre adresse mail...",
      button_password: "Modifier mon mot de passe",
      button_logout: "Se deconnecter",
    },
    login: {
      title: "Bienvenue sur Geobench !",
      connect: "Connectez-vous dès maintenant !",
      ph_login: "Adresse mail ou pseudo...",
      ph_password: "Mot de passe...",
      button: "Se connecter",
      forgot_password: "Mot de passe oublié ?",
      no_account: {
        text: "Vous n'avez pas de compte ? ",
        link: "Incrivez-vous",
      },
      success: {
        title: "Connecté(e) !",
        message:
          "Super vous êtes connecté(e) ! Vous pouvez désormais utiliser l'application !",
        button: "C'est parti !",
      },
    },
    forgotPassword: {
      title: "Mot de passe oublié ?",
      pickup: "Aucun soucis, il suffit de le réinitialiser !",
      ph_email: "Adresse email...",
      button: "Réinitialiser",
    },
    register: {
      title: "Inscrivez-vous dès maintenant",
      pickup: "En seulement 2 minutes!",
      ph_fullname: "Votre nom complet...",
      ph_email: "Votre adresse email...",
      ph_username: "Votre nom d'utilisateur...",
      ph_pwd1: "Votre mot de passe...",
      ph_pwd2: "Retapez votre mot de passe...",
      button: "S'incrire",
      alreadyAccount: {
        text: "Vous avez déjà un compte ? ",
        link: "Connectez-vous",
      },
    },
    errors: {
      unknown_user: {
        title: "Utilisateur inconnu",
        message:
          "Nous ne trouvons pas cet utilisateur. Veuillez vérifier et réessayer.",
        button: "Ok",
      },
      wrong_credential: {
        title: "Oups...",
        message: "La combinaison identifiant/mot de passe est incorrecte.",
        button: "Ok",
      },
      internal_error: {
        title: "Oups...",
        message:
          "Une erreur interne s'est produite sur nos serveurs, veuillez réessayer. Si le problème persiste, contactez-nous.",
        button: "Ok",
      },
    },
  },
  en: {
    navigation: {
      home: "Home",
    },
    settings: {
      hello: "Hello ",
      exclamation: "!",
      subtext: "Here's your settings",
      ph_fullname: "Your fullname...",
      ph_email: "Your email address...",
      button_password: "Change my password",
      button_logout: "Logout",
    },
    login: {
      title: "Welcome to Geobench!",
      connect: "Sign in right now!",
      ph_login: "Email address or username...",
      ph_password: "Password...",
      button: "Sign In",
      forgot_password: "Forgot password?",
      no_account: {
        text: "You don't have an account? ",
        link: "Sign up",
      },
      success: {
        title: "Logged in!",
        message: "Nice you're logged in! You can start using the application!",
        button: "Let's go!",
      },
    },
    forgotPassword: {
      title: "Forgot password?",
      pickup: "No problem, just reset it!",
      ph_email: "Email address...",
      button: "Reset",
    },
    register: {
      title: "Register right now",
      pickup: "Within 2 minutes!",
      ph_fullname: "Enter your fullname...",
      ph_email: "Enter your email...",
      ph_username: "Enter your username...",
      ph_pwd1: "Choose a password...",
      ph_pwd2: "Retype your password...",
      button: "Sign Up",
      alreadyAccount: {
        text: "Already have an account? ",
        link: "Sign in",
      },
    },
    errors: {
      unknown_user: {
        title: "Unknown user",
        message: "We can't find this user, please check and retry.",
        button: "Okay",
      },
      wrong_credential: {
        title: "Oops...",
        message: "The username/password combination is incorrect.",
        button: "Okay",
      },
      internal_error: {
        title: "Oops...",
        message:
          "There was an error on our servers, please try again. If the problem persist, contact us",
        button: "Okay",
      },
    },
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
