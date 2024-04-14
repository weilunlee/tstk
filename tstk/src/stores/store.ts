import { configureStore } from '@reduxjs/toolkit'
import stocksSlice from './stocksSlice'
import reportsSlice from './reportsSlice'
import stockInfoSlice from './stockInfoSlice'

export const store = configureStore({
  reducer: {
    stocks:stocksSlice,
    reports:reportsSlice,
    stockInfo:stockInfoSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
