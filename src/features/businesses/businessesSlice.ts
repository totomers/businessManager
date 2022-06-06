import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { IBusinessSimple } from "../../interfaces/businessSimple.interface";
import {
  approveBusinessServer,
  declineBusinessServer,
  getBusinessesFromServer,
  markBusinessAsPendingVerificationServer,
} from "./businessesApi";
// import { fetchCount } from './counterAPI';

export interface BusinessesState {
  businesses: IBusinessSimple[];
  businessesInTable: IBusinessSimple[];
}

const initialState: BusinessesState = {
  businesses: [],
  businessesInTable: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(getBusinesses(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getBusinesses = createAsyncThunk("businesses/getAll", async () => {
  const response = await getBusinessesFromServer();
  console.log("all businesses:", response);

  return response;
});

export const approveBusiness = createAsyncThunk(
  "businesses/approve",
  async (props: { _id: string; email: string; merchantId: string }) => {
    const response = await approveBusinessServer(props);
    return response;
  }
);

export const declineBusiness = createAsyncThunk(
  "businesses/decline",
  async (props: { _id: string; email: string }) => {
    const response = await declineBusinessServer(props);
    return response;
  }
);
export const markAsPendingVerification = createAsyncThunk(
  "businesses/updateStatus",
  async (props: { _id: string }) => {
    const response = await markBusinessAsPendingVerificationServer(props);
    return response;
  }
);

export const businessesSlice = createSlice({
  name: "businesses",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    filterTableByStatus: (state, action: PayloadAction<string>) => {
      state.businessesInTable = state.businesses.filter(
        (b) => b.status === action.payload
      );
    },

    setTableToAll: (state) => {
      state.businessesInTable = state.businesses;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder

      .addCase(getBusinesses.fulfilled, (state, action) => {
        state.businesses = action.payload;
        state.businessesInTable = action.payload;
      })

      .addCase(approveBusiness.fulfilled, (state, action) => {
        const updatedBusinessIndex = state.businesses.findIndex(
          (b) => b._id === action.payload._id
        );
        const businesses = state.businesses;
        businesses.splice(updatedBusinessIndex, 1, action.payload);
        state.businessesInTable = state.businessesInTable.filter(
          (b) => b._id !== action.payload._id
        );
        state.businesses = businesses;
      })
      .addCase(declineBusiness.fulfilled, (state, action) => {
        const updatedBusinessIndex = state.businesses.findIndex(
          (b) => b._id === action.payload._id
        );
        const businesses = state.businesses;
        businesses.splice(updatedBusinessIndex, 1, action.payload);
        state.businessesInTable = state.businessesInTable.filter(
          (b) => b._id !== action.payload._id
        );
        state.businesses = businesses;
      })
      .addCase(markAsPendingVerification.fulfilled, (state, action) => {
        const updatedBusinessIndex = state.businesses.findIndex(
          (b) => b._id === action.payload._id
        );
        const businesses = state.businesses;
        businesses.splice(updatedBusinessIndex, 1, action.payload);
        state.businessesInTable = state.businessesInTable.filter(
          (b) => b._id !== action.payload._id
        );
        state.businesses = businesses;
      });
  },
});

// export const { getBusinesses } = businessesSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectBusinesses = (state: RootState) =>
  state.businesses.businesses;
export const selectBusinessesInTable = (state: RootState) =>
  state.businesses.businessesInTable;

export const selectBusinessesPendingAction = (state: RootState) => {
  return state.businesses.businesses.filter(
    (b) => b.status === "pendingAction"
  );
};
export const selectBusinessesPendingVerification = (state: RootState) => {
  return state.businesses.businesses.filter(
    (b) => b.status === "pendingVerification"
  );
};
export const selectBusinessesVerified = (state: RootState) => {
  return state.businesses.businesses.filter((b) => b.status === "verified");
};
export const selectBusinessesUnverified = (state: RootState) => {
  return state.businesses.businesses.filter((b) => b.status === "unverified");
};
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

export const { filterTableByStatus, setTableToAll } = businessesSlice.actions;

export default businessesSlice.reducer;