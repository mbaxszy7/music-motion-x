import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import home from "./pages/Home/reducer"

export const rootSlice = createSlice({
  name: "root",
  initialState: {
    isShowPageBack: false,
  },
  reducers: {
    setShowPageBack: (state, action: PayloadAction<boolean>) => {
      state.isShowPageBack = action.payload
    },
  },
})

const rootReducer = {
  home,
  root: rootSlice.reducer,
}

const getReduxStore = (defaultState: { [x: string]: any }) => {
  return configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: true,
    preloadedState: defaultState,
  })
}

const initialState = getReduxStore({}).getState

export type RootState = ReturnType<typeof initialState>

export default getReduxStore
