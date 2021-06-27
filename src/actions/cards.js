import { API_ROOT } from '../globalVars'

export const addCard = (cardObj) => {
  return {
    type: 'ADD_Card',
    payload: cardObj,
  }
}

//{card: card} === {card}

export const createCard = (card) => {
  return (dispatch) => {
    fetch('/cards', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({ card }),
    })
      .then((resp) => resp.json())
      .then((card) => {
        dispatch(addCard(card))
      })
  }
}

export const updateCard = (newCard) => {
  return {
    type: 'UPDATE_Card',
    payload: newCard,
  }
}

export const getCards = () => {
  return (dispatch) => {
    dispatch({ type: 'LOADING' })

    fetch('/cards')
      .then((resp) => resp.json())
      .then((cards) => {
        dispatch({
          type: 'GET_CardS',
          payload: cards,
        })
      })
  }
}

export const selectCard = (card, sideboard, type, history) => {
  if (history) {
    history.push(`/cards/${card.id}`)
  }
  return {
    type: 'SELECT_CARD',
    payload: { attributes: card, sideboard, type },
  }
}

export const clearCard = () => {
  return {
    type: 'CLEAR_CARD',
  }
}
