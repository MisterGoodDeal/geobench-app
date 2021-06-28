import { mapSlice } from "./slices/mapSlice";
import { templateSlice } from "./slices/templateSlice";
import { userSlice } from "./slices/userSlice";

export const reducers = {
  [templateSlice.name]: templateSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [mapSlice.name]: mapSlice.reducer,
};
