import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import home from "./pages/Home/reducer"

const rootReducer = {
  home,
}

const getReduxStore = (defaultState: { [x: string]: any }) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: true,
    preloadedState: defaultState,
  })
  return store
}

export default getReduxStore
