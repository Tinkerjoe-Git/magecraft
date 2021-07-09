import axios from 'axios'

export const getDecks = () => async (dispatch) => {
  try {
    const res = await axios.get('http://127.0.0.1:3000/decks')
    console.log(res)
    dispatch({
      type: 'FETCH_DECK',
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const createDecks = (deck) => async (dispatch) => {
  try {
    const res = await axios.get('http://127.0.0.1:3000/decks', deck)
    dispatch({ type: 'CREATE_DECK', payload: res.data })
  } catch (error) {
    console.log(error)
  }
}
