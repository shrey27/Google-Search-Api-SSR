import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk'
import { combineReducers , createStore, applyMiddleware } from "redux";

export const fetchHotels = createAsyncThunk("hotels/fetchHotels", () => {
  return axios.get("https://hotels-api.shrey27.repl.co/hotels").then(res => res.data)
});

const hotelslice = createSlice({
  name: "hotels",
  initialState: {
    isFetching: false,
    hotelsList: [],
    error: ""
  },
  extraReducers: {
    [fetchHotels.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchHotels.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.hotelsList = action.payload;
    },
    [fetchHotels.rejected]: (state) => {
      state.isFetching = false;
      state.error = "Cannot fetch hotels";
    }
  }
});

const rootReducer = combineReducers({
  hotels : hotelslice.reducer
});

export default function createStoreFromState(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware
    )
  )
}
