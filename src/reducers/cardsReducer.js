const defaultState = {
  results: [],
  loading: false,
  selected: {},
  sets: [],
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'CARD_SEARCH_FORM_SUBMITTED':
    case 'LOADING_CARDS':
      return { ...state, loading: !state.loading, results: [] }

    case 'CARDS_SEARCH_COMPLETED':
    case 'FETCH_CARDS_COMPLETED':
    case 'SEARCH_CARDS':
      return { ...state, results: action.payload, loading: !state.loading }

    case 'SELECT_CARD':
      console.log('SELECT_CARD', action.payload)
      return { ...state, selected: action.payload }

    case 'CLEAR_CARD':
      return { ...state, selected: {} }

    default:
      return { ...state }
  }
}
