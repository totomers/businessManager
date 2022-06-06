import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { respondToSignIn, signIn } from "../access-control/accountSlice";

export interface ErrorState {
  error: { message: string; code: string };
}

const initialState: ErrorState = {
  error: { message: "", code: "" },
};

export const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setError: (
      state,
      action: PayloadAction<{ message: string; code: string }>
    ) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.rejected, (state, action) => {
        state.error = {
          message: action.error.message!,
          code: action.error.code!,
        };
      })
      .addCase(respondToSignIn.rejected, (state, action) => {
        state.error = {
          message: action.error.message!,
          code: action.error.code!,
        };

        //here we also locally save the refresh token somewhere..
      })
      .addCase(respondToSignIn.fulfilled, (state, action) => {
        if (!("tokens" in action.payload))
          state.error = {
            message: "Incorrect Confirmation Code",
            code: "CodeMismatchException",
          };
      });
  },
});

export const selectError = (state: RootState) => state.errors.error;
export const { setError } = errorsSlice.actions;
export default errorsSlice.reducer;
