export interface Banc {
  id: number;
  longitude: number;
  latitude: number;
  note: number;
  lieu: string;
  environnement: string;
  user: string;
  commetaire: string;
  nom_photo: string;
  date: string;
}

export interface Map {
  bancs: Banc[];
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
}
