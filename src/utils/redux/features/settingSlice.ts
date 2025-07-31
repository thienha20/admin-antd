import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Type for our state
export interface ISettingState {
  config: Record<string, any>;
}

// Initial state
const initialState: ISettingState = {
  config: {},
};

// Actual Slice
export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setSetting(state, {payload}: PayloadAction<ISettingState>) {
      state.config = payload;
    },
    setConfig(state, {payload}: PayloadAction<{ key: string, value: any }>) {
      state.config[payload['key']] = payload['value'];
    },
  },
});

export const {setSetting, setConfig} = settingSlice.actions;

export const selectSettingState = (state: RootState) => state.setting;

export default settingSlice.reducer;