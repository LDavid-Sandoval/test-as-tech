import { configureStore } from "@reduxjs/toolkit";
import conditionsReducer from '../features/conditions/conditionsSlice'

export const store = configureStore({
    reducer: {
        conditions: conditionsReducer
    }
})