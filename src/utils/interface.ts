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

export interface AddBench {
  note: number;
  lieu: number;
  environnement: number;
  commentaire: string;
  base64Photo: string;
  latitude: number;
  longitude: number;
  username: string;
  date: Date;
}

export const defaultBenchDetails = {
  note: 0,
  lieu: -1,
  environnement: -1,
  commentaire: "",
  base64Photo: "",
  latitude: 0,
  longitude: 0,
  username: "",
  date: new Date(),
};
