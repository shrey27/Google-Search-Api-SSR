import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk'
import { combineReducers , createStore, applyMiddleware } from "redux";

export const fetchData = createAsyncThunk("hotels/fetchData", (input) => {
  if(input) return axios.post("https://hotels-api.shrey27.repl.co/hotels", { input }).then(res => res.data)
});

const hotelslice = createSlice({
  name: "hotels",
  initialState: {
    isFetching: false,
    locations:[],
    hotels: [],
    hotel : null,
    error: ""
  },
 reducers:{
  getHotel : (state,action) => {
    const id = action.payload
    state.hotel = state.hotels.find(item => item.hotelID === id)
    state.locations = []
    state.hotels = []
  },
  clearData : (state) => {
    state.locations = []
    state.hotels = []
  }
 },
 extraReducers:{
  [fetchData.pending] : (state) => {
    state.isFetching = true
  },
  [fetchData.fulfilled] : (state, action) => {
    state.isFetching = false
    console.log(action.payload)
    state.locations = action.payload.locations
    state.hotels = action.payload.hotels
  },
  [fetchData.rejected] : (state) => {
    state.isFetching = false
    state.error = 'Cannot fetch Data'
  }
 }
});

const rootReducer = combineReducers({
  hotels : hotelslice.reducer
});

export const { getHotel ,clearData } = hotelslice.actions

export default function createStoreFromState(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware
    )
  )
}
