import { createSlice } from '@reduxjs/toolkit'

const cardsSlice = createSlice({
  name: 'cards',
  initialState: [],
  reducers: {
    setCards(state, action) {
      state = action.payload
      return state
    },
  },
})

export const { setCards } = cardsSlice.actions
export default cardsSlice.reducer
