export interface Template {
  arg1: string,
  arg2: number,
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
}
