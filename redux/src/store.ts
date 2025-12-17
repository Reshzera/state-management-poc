import {
  type PayloadAction,
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

type AppState = {
  count: number;
  note: string;
};

const initialState: AppState = {
  count: 1,
  note: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count = Math.max(0, state.count - 1);
    },
    reset: (state) => {
      state.count = 0;
    },
    updateNote: (state, action: PayloadAction<string>) => {
      state.note = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const { increment, decrement, reset, updateNote } = appSlice.actions;
