import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Type for our state
export interface ITrackingState {
  trackingId: BigInt;
  key: string;
  url: string;
  rank: number;
}

// Initial state
const initialState: { data: ITrackingState[] } = {
  data: [],
};

// Actual Slice
export const trackingSlice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {
    addTracking(state, {payload}: PayloadAction<ITrackingState[]>) {
      for(let item of payload){
        state.data.push(item)
      }
    },
    removeTracking(state, {payload}: PayloadAction<BigInt[]>){
      state.data = state.data.filter(i => !payload.includes(i.trackingId));
    },
    setTracking(state, {payload}: PayloadAction<ITrackingState[]>){
      state.data = [...payload];
    }
  },

});

export const {addTracking, removeTracking, setTracking} = trackingSlice.actions;

export const selectTrackingState = (state: RootState) => state.tracking;

export default trackingSlice.reducer;