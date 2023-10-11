import { configureStore } from '@reduxjs/toolkit'
import stocksSlice from './stocksSlice'
import reportsSlice from './reportsSlice'

export const store = configureStore({
  reducer: {
    stocks:stocksSlice,
    reports:reportsSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
