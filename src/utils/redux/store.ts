import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./features/authSlice";
import { createWrapper } from "next-redux-wrapper";
import { trackingSlice } from '@/utils/redux/features/trackingSlice';
import { settingSlice } from '@/utils/redux/features/settingSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [trackingSlice.name]: trackingSlice.reducer,
      [settingSlice.name]: settingSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);