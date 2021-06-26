export interface UserLocal {
  id?: number;
  is_ads?: number;
  is_banned?: number;
  is_deleted?: number;
  prenom: string;
  nom: string;
  mail: string;
  pseudo: string;
  favoris: string;
  reset_key: string;
}

export interface Popup {
  visible: boolean;
  title: string;
  content: string;
  image?: "success" | "error";
  validText: string;
  valid: () => void;
  notValidText?: string;
  notValid?: () => void;
}
