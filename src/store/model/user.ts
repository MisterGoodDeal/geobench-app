interface Community {
  global: {
    usersCount: number;
    benchCount: number;
    photosCount: number;
    pictures: { photo: string }[];
  };
  user: {
    benchCount: number;
    photosCount: number;
    pictures: { photo: string }[];
    avgBench: {
      full: number;
      floor: number;
      text: string;
    };
  };
  background: {
    user: string;
    url: string;
  };
}

export interface User {
  userInfo: any;
  community: Community | null;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: {
    title: string;
    message: string;
  } | null;
  darkMode: boolean;
}
