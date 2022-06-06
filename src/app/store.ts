import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
import counterReducer from "../features/counter/counterSlice";
import businessesReducer from "../features/businesses/businessesSlice";
import accountReducer from "../features/access-control/accountSlice";
import errorsReducer from "../features/errors/errorsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    account: accountReducer,
    businesses: businessesReducer,
    errors: errorsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
// setupListeners(store.dispatch);
