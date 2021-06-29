import * as RNLocalize from "react-native-localize";

const locales = {
  fr: {
    map: {
      position: {
        error: {
          title: "Beep beep boop 🛰",
          message:
            "Nous ne pouvons pas déterminer votre position actuellement, essayez de sortir et redémarrez l'application",
        },
        bench_error: {
          title: "Beep beep boop 🛰",
          message:
            "Nous ne pouvons pas déterminer votre position actuellement. Le banc ne peut pas être ajouté.",
        },
      },
      bench: "Banc",
      no_comment: "Aucun commentaire pour ce banc...",
      comment: "Commenter !",
      commentSuccess: {
        title: "Félicitation !",
        text: "Votre commentaire a été ajouté avec succès !",
      },
      commentFail: {
        title: "Oh non ! 😔",
        text: "Il y a eu un problème durant l'ajout de votre commentaire... Veuillez réessayer plus tard !",
      },
      community_comments: "Commentaires de la communauté :",
      ph_comment: "Commentaire... (entre 10 et 250 caractères)",
      added_by: "Banc ajouté par",
      location: {
        text: "Ce banc est situé",
        array: [
          "dans un autre type de lieu",
          "dans la rue",
          "dans un parc",
          "dans la forêt",
          "sur une place publique",
          "sur une aire de repos",
          "en bord de mer",
          "sur/près d'un parking",
        ],
      },
      environnement: {
        text: "entouré d'un",
        array: [
          "environnement calme",
          "environnement avec quelques nuisances sonores",
          "environnement bruyant",
        ],
      },
      add: {
        title: "Ajout d'un banc",
        rating: "Notez ce banc selon son état",
        ph_location: "Choisissez le lieu...",
        location: [
          { label: "Rue", value: "1" },
          { label: "Parc", value: "2" },
          { label: "Forêt", value: "3" },
          { label: "Place publique", value: "4" },
          { label: "Aire de repos", value: "5" },
          { label: "Bord de mer", value: "6" },
          { label: "Parking", value: "7" },
          { label: "Autre", value: "0" },
        ],
        ph_environment: "Sélectionnez l'envrionnement...",
        environment: [
          { label: "Environnement calme", value: "1" },
          { label: "Environnement avec quelque nuisance sonores", value: "2" },
          { label: "Environnement bruyant", value: "3" },
        ],
        comment: "Rédigez un commentaire... (optionnel)",
        photo: "Prendre une photo !",
        photoToast: {
          error: {
            title: "Oups !",
            text: "Une erreur s'est produite lors de la prise de votre photo... Veuillez réessayer !",
            textUpload:
              "Une erreur s'est produite lors de la mise en ligne de votre photo... Elle ne sera pas ajoutée !",
          },
          success: {
            title: "Cheese 📸",
            text: "Votre photo a bien été enregistrée !",
          },
          close: {
            title: "Photo annulée 😔",
            text: "Vous avez annulé, votre photo ne sera pas prise en compte !",
          },
        },
        upload: {
          success: {
            title: "Super 🥳",
            message: "Le banc a été ajouté avec succès !",
          },
          error: {
            title: "Oh non ☹️",
            message:
              "Il y a eu une erreur pendant l'ajout de votre banc, veuillez réessayer plus tard !",
          },
        },
        button: "Ajouter !",
      },
    },
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
    map: {
      position: {
        error: {
          title: "Beep beep boop 🛰",
          message:
            "We can't determine your current position, try to go outside and restart the app",
        },
        bench_error: {
          title: "Beep beep boop 🛰",
          message:
            "We can't determine your current position. The bench can't be added.",
        },
      },
      bench: "Bench",
      no_comment: "No comment for this bench...",
      comment: "Comment it!",
      commentSuccess: {
        title: "Congratulation!",
        text: "Your comment has been added successfully!",
      },
      commentFail: {
        title: "Oh no! 😔",
        text: "There was a problem... Please try again later!",
      },
      community_comments: "Community comments:",
      ph_comment: "Comment... (between 10 and 250 chars)",
      added_by: "Bench added by",
      location: {
        text: "This bench is located",
        array: [
          "in an other type of location",
          "in the street",
          "in a park",
          "in the forest",
          "on a public place",
          "on a rest area",
          "on the beach",
          "on/near a parking",
        ],
      },
      environnement: {
        text: "surrounded by",
        array: [
          "a calm environment",
          "a low noise pollution",
          "a noisy environment",
        ],
      },
      add: {
        title: "Add bench",
        rating: "Rate this bench according to its condition",
        ph_location: "Choose the location...",
        location: [
          { label: "Street", value: "1" },
          { label: "Park", value: "2" },
          { label: "Forest", value: "3" },
          { label: "Public place", value: "4" },
          { label: "Resting area", value: "5" },
          { label: "Sea side", value: "6" },
          { label: "Parking", value: "7" },
          { label: "Other", value: "0" },
        ],
        ph_environment: "Choose the envrionment...",
        environment: [
          { label: "Calm environment", value: "1" },
          { label: "Low noise pollution", value: "2" },
          { label: "Noisy environment", value: "3" },
        ],
        comment: "Write a comment... (optional)",
        photo: "Take a picture!",
        photoToast: {
          error: {
            title: "Oops !",
            text: "An error happened while taking your picture... Please try again!",
            textUpload:
              "An error happened while uploading your picture... It will not be added!",
          },
          success: {
            title: "Cheese 📸",
            text: "Your picture has been saved!",
          },
          close: {
            title: "Picture cancelled 😔",
            text: "You cancel your picture, It will not be saved!",
          },
        },
        button: "Add!",
        upload: {
          success: {
            title: "Yeay 🥳",
            message: "Your bench has been added successfully!",
          },
          error: {
            title: "Oh no ☹️",
            message:
              "There was an error while adding your bench! Please try again!",
          },
        },
      },
    },
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
