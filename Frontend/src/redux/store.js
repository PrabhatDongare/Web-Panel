import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from './employee/employeeSlice'

export const store = configureStore({
  reducer: {
    employee: employeeReducer
  },
})