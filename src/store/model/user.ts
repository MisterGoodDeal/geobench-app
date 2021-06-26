export interface User {
  userInfo: any;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: {
    title: string;
    message: string;
  } | null;
}
