import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState, AppThunk, store } from "../../app/store";
import { setError } from "../errors/errorsSlice";
import {
  logoutServer,
  refreshTokenSignInServer,
  respondToSignInServer,
  signInServer,
} from "./accountAPI";
// import { getBusinessesFromServer } from "./businessesApi";
// import { fetchCount } from './counterAPI';

export interface accountState {
  idToken: string;
  sessionToken?: string;

  status: "idle" | "loading" | "failed";
}

const initialState: accountState = {
  idToken: "",
  sessionToken: "",
  status: "idle",
};

export const signIn = createAsyncThunk(
  "account/signIn",
  async (props: { email: string; password: string }) => {
    const response = await signInServer(props);
    return response.session;
  }
);
export const respondToSignIn = createAsyncThunk(
  "account/respondToSignIn",
  async (props: {
    session: string;
    confirmationCode: string;
    username: string;
  }) => {
    const response = await respondToSignInServer(props);
    if ("tokens" in response)
      window.localStorage.setItem("refreshToken", response.tokens.refreshToken);
    return response;
  }
);

export const refreshTokenSignIn = createAsyncThunk(
  "account/refreshTokenSignIn",
  async (props: { refreshToken: string }) => {
    const response = await refreshTokenSignInServer(props);
    // The value we return becomes the `fulfilled` action payload

    return response.idToken;
  }
);
export const logout = createAsyncThunk("account/logout", async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  console.log("refreshToken", refreshToken);

  if (!refreshToken) return;
  const response = await logoutServer({ refreshToken });
  localStorage.removeItem("refreshToken");
  return response;
});

export const accountSlice = createSlice({
  name: "accountSlice",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        console.log("action", action);

        state.status = "idle";
        state.sessionToken = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        console.log("action", action);
        if (action.error.message && action.error.code) state.status = "failed";
      })
      .addCase(respondToSignIn.fulfilled, (state, action) => {
        if ("tokens" in action.payload)
          state.idToken = action.payload.tokens.idToken;
        if ("session" in action.payload)
          state.sessionToken = action.payload.session;
        //here we also locally save the refresh token somewhere..
      })
      .addCase(respondToSignIn.rejected, (state) => {
        state.sessionToken = "";
        //here we also locally save the refresh token somewhere..
      })
      .addCase(refreshTokenSignIn.fulfilled, (state, action) => {
        state.idToken = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.idToken = "";
        state.sessionToken = "";
        //here we also destroy the refresh token locally..
      });
  },
});

// export const { getBusinesses } = businessesSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectIdToken = (state: RootState) => state.account.idToken;
export const selectSessionToken = (state: RootState) =>
  state.account.sessionToken;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default accountSlice.reducer;
