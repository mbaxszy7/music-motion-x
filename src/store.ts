import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import type Song from "@/interfaces/song"

export const rootSlice = createSlice({
  name: "root",
  initialState: {
    currentPlaySong: {} as Song,
    showPlayBar: true,
    currentPlaySongList: [] as Song[],
    isShowPlayModal: false,
  },
  reducers: {
    setShowPlayModal: (state, action: PayloadAction<boolean>) => {
      state.isShowPlayModal = action.payload
    },
    playSong: (state, action: PayloadAction<Song>) => {
      state.currentPlaySong = action.payload
      if (state.currentPlaySongList.length === 0) {
        state.currentPlaySongList = [action.payload] as Song[]
      } else {
        const curIndex = state.currentPlaySongList.findIndex(
          (song) => song.id === state.currentPlaySong.id,
        )
        if (curIndex === -1) {
          state.currentPlaySongList.unshift(state.currentPlaySong)
        }
      }
    },
    playSongs: (state, action: PayloadAction<Song[]>) => {
      state.currentPlaySongList = action.payload
      state.currentPlaySong = state.currentPlaySongList[0]
    },
    playPrev: (state) => {
      const curIndex = state.currentPlaySongList.findIndex(
        (song) => song.id === state.currentPlaySong.id,
      )

      if (curIndex > 0) {
        state.currentPlaySong = state.currentPlaySongList[curIndex - 1]
      }
    },
    playNext: (state) => {
      const curIndex = state.currentPlaySongList.findIndex(
        (song) => song.id === state.currentPlaySong.id,
      )

      if (curIndex < state.currentPlaySongList.length - 1) {
        state.currentPlaySong = state.currentPlaySongList[curIndex + 1]
      }
    },
    playAtNext: (state, action: PayloadAction<Song>) => {
      if (action.payload.id === state.currentPlaySong.id) return
      if (!state.currentPlaySong.id) {
        state.currentPlaySong = action.payload
        if (state.currentPlaySongList.length === 0) {
          state.currentPlaySongList = [action.payload] as Song[]
        }
      } else {
        const curIndex = state.currentPlaySongList.findIndex(
          (song) => song.id === state.currentPlaySong.id,
        )

        state.currentPlaySongList.splice(curIndex + 1, 0, action.payload)
      }
    },
    setShowPlayBar: (state, action: PayloadAction<boolean>) => {
      state.showPlayBar = action.payload
    },
  },
})

const rootReducer = {
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
