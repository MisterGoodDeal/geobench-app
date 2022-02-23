import * as RNLocalize from "react-native-localize";

export const availableLanguages = [
  { label: "Français (France)", value: "fr" },
  { label: "English (UK and US)", value: "en" },
];

const locales = {
  fr: {
    chooseLanguage: "Choisissez votre langue",
    lang: {
      cantSee: "Vous ne pouvez pas voir cette langue ?",
      help: "Aidez-nous à traduire",
    },
    community: {
      hello: "Salut ",
      exclamation: "!",
      subtext: "Bienvenue dans la communauté de Geobench !",
      photo_by: "Photo par",
      error: {
        title: "Zut alors ! 😢",
        message:
          "Une erreur est survenue durant la récupération des informations de la communauté, veuillez réessayer plus tard.",
      },
      your_stat: "Vos statistiques",
      community: "La communauté",
      rating:
        "Quand vous ajoutez un banc, vous lui attribuez en moyenne la note de",
      bench: {
        community: "Bancs",
        user: "Bancs que vous avez ajouté",
      },
      photo: {
        community: "Photos",
        user: "Photos que vous avez prises",
      },
      user: "Utilisateurs",
    },
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
      reset_filters: "Supprimer les filtres",
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
      filters: {
        title: "Filtres",
        ph_lieu: "Filtrer par lieux...",
        ph_photo: "Filtrer par photos...",
        filtre_photo: [
          { label: "Bancs avec photos", value: "1" },
          { label: "Bancs sans photos", value: "2" },
        ],
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
      button_delete: "Supprimer mon compte",
      popup_delete: {
        title: "Supprimer mon compte",
        content:
          "Voulez vous vraiment supprimer votre compte?\nLes bancs que vous avez ajouté ne seront pas supprimés, mais votre pseudo sera modifié.",
        yes: "Oui",
        no: "Non",
      },
      darkMode: {
        on: "Mode sombre activé",
        off: "Mode clair activé",
      },
      toastMessages: {
        success: {
          title: "Tout est ok 👌",
          message: "Vos informations ont été mise à jour avec succès !",
        },
        error: {
          title: "Mince ! ☹️",
          message:
            "Un problème est survenu durant la modification de vos informations, veuillez réessayer !",
        },
      },
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
      titleAlt: "Besoin de changer de mot de passe ?",
      pickup: "Aucun soucis, il suffit de le réinitialiser !",
      ph_email: "Adresse email...",
      button: "Réinitialiser",
      mail_title: "Email envoyé !",
      mail_text:
        "Un email vous a été envoyé ! Vous y trouverez un code à 6 chiffres vous permettant de réinitialiser votre mot de passe.",
      email_disclaimer:
        "Si vous ne trouvez pas le mail, vérifiez vos spam ou cherchez ❝geobench@turtletv.fr❞",
      ph_code: "••••••",
      code_hint: "Code OTP reçu par mail",
      popupMessages: {
        password_weak:
          "Votre mot de passe doit contenir au moins une minuscule, majuscule, chiffre et un caractère spécial avec une longueur minimum de 8 caractères.",
        password_missmatch: "Vos mots de passe ne se correcspondent pas.",
      },
      checkAndChange: {
        success: {
          title: "Super !",
          message: "Ton mot de passe a été changé avec succès !",
        },
        error: {
          title: "Oups !",
          message:
            "On dirait que le code à 6 chiffres saisi est incorrect, vérifiez et rééssayez!",
        },
      },
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
      messages: {
        error: {
          user: {
            title: "Oh non 😕",
            message: "Ce nom d'utilisateur est déjà pris !",
          },
          email: {
            title: "Oh non 😕",
            message: "Cette adresse email est déjà prise !",
          },
          both: {
            title: "Oh non 😕",
            message:
              "Cette adresse email et ce nom d'utilisateur sont déjà pris !",
          },
        },
        success: {
          title: "Super ! 😀",
          message:
            "Votre compte a été créé avec succès, vous pouvez désormais vous connecter.",
        },
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
    chooseLanguage: "Choose your language",
    lang: {
      cantSee: "Vous ne pouvez pas voir cette langue ?",
      help: "Aidez-nous à traduire",
    },
    community: {
      hello: "Hello ",
      exclamation: "!",
      subtext: "Welcome to the Geobench's community!",
      photo_by: "Picture by",
      error: {
        title: "Oh no! 😢",
        message:
          "An error occurred while fetching the community informations. Please try again later",
      },
      your_stat: "Your stats",
      community: "The community",
      rating: "When you add a bench, you give it an average rating of",
      bench: {
        community: "Benches",
        user: "Benches you added",
      },
      photo: {
        community: "Pictures",
        user: "Picture you took",
      },
      user: "Users",
    },
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
      reset_filters: "Reset filters",
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
      filters: {
        title: "Filters",
        ph_lieu: "Filter by locations...",
        ph_photo: "Filter by pictures...",
        filtre_photo: [
          { label: "Benches with pictures", value: "1" },
          { label: "Benches without pictures", value: "2" },
        ],
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
      button_delete: "Delete account",
      popup_delete: {
        title: "Delete account",
        content:
          "Do you want to delete your account?\nBenches you added won't be deleted, but your username will be obfuscated.",
        yes: "Yes",
        no: "No",
      },
      darkMode: {
        on: "Dark mode activated",
        off: "Light mode activated",
      },
      button_logout: "Logout",
      toastMessages: {
        success: {
          title: "Everything is okay 👌",
          message: "Your informations has been changed successfully!",
        },
        error: {
          title: "Oh no! ☹️",
          message: "An error occurred during the process, please try again!",
        },
      },
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
      titleAlt: "Wanna change your password?",
      pickup: "No problem, just reset it!",
      ph_email: "Email address...",
      button: "Reset",
      mail_title: "Email sent!",
      mail_text:
        "An email has been sent to your inbox! You'll recieve a 6-digits code that you will need to provide in odrder to reset your password.",
      email_disclaimer:
        "If you can't find the mail, please check in your spam or search for ❝geobench@turtletv.fr❞",
      ph_code: "••••••",
      code_hint: "OTP code recieved by email",
      popupMessages: {
        password_weak:
          "Your password must contain at least one lower case, upper case, number and one special character with a minimum length of 8 characters.",
        password_missmatch: "Password missmatch.",
      },
      checkAndChange: {
        success: {
          title: "Yeah!",
          message: "You password has been changed successfully!",
        },
        error: {
          title: "Oops!",
          message:
            "It seems that the 6-digits code you provided is incorrect, check it again!",
        },
      },
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
      messages: {
        error: {
          user: {
            title: "Oh no 😕",
            message: "This username is already used!",
          },
          email: {
            title: "Oh no 😕",
            message: "This email address is already used!",
          },
          both: {
            title: "Oh no 😕",
            message: "This email address and username are already used!",
          },
        },
        success: {
          title: "Super ! 😀",
          message:
            "Votre compte a été créé avec succès, vous pouvez désormais vous connecter.",
        },
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
