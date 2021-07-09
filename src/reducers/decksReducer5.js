export default function decks(state = [], action) {
  switch (action.type) {
    case 'FETCH_DECK':
      return action.payload

    case 'CREATE_DECK':
      return [...state, action.payload]

    default:
      return state
  }
}
