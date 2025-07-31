import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Type for our state
export interface IAuthState {
  authLogin: boolean;
  userId: number,
  email: string;
  phone: string;
  firstName: string;
  lastName?: string;
  gender?: string;
  website?: string;
  birthday?: Date | string;
}

// Initial state
const initialState: IAuthState = {
  authLogin: false,
  userId: 0,
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
  gender: 'M',
  website: '',
  birthday: '',
};

// Actual Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState: (state: IAuthState, {payload}: PayloadAction<IAuthState>) => {
      state = {...state, ...payload};
      state.authLogin = !!(payload.userId && payload.userId > 0);
      return state
    },
  },
});

export const {setAuthState} = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;