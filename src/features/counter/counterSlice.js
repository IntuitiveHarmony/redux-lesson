// Step 1.
import { createSlice } from '@reduxjs/toolkit'   

 // Step 2.
const initialState = {                          
  value: 0,
}

// Step 3.
export const counterSlice = createSlice({       
  name: 'counter',
  initialState,
  reducers: {
    //Step 4.
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Step 5.
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer