import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const conditionsSlice = createSlice({
    name: 'conditions',
    initialState,
    reducers: {
        addDataConditions: (state, action) => {
            if(state.length === 0){
                state.push(...action.payload)
            }
        }
    }
})

export const { addDataConditions } = conditionsSlice.actions

export default conditionsSlice.reducer