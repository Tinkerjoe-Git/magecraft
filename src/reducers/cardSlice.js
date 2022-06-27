import { createSlice } from '@reduxjs/toolkit'

const cardsSlice = createSlice({
  name: 'cards',
  initialState: [],
  reducers: {
    setCards(state, action) {
      state.entities.push(action.payload)
    },
  },
})

export const { setCards } = cardsSlice.actions
export default cardsSlice.reducer
