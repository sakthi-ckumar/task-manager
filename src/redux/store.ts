import { configureStore } from "@reduxjs/toolkit";
import taskSLice from "./taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskSLice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
