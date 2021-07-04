import { mapSlice } from "./slices/mapSlice";
import { userSlice } from "./slices/userSlice";

export const reducers = {
  [userSlice.name]: userSlice.reducer,
  [mapSlice.name]: mapSlice.reducer,
};
