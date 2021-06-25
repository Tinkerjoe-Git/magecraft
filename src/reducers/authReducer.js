const defaultState = {
  currentUser: {},
  currentUserDecks: [],
  loading: false,
  errorStatus: false,
  error: {},
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'LOADING_USER':
      return { ...state, loading: true }
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.user,
        loading: false,
        errorStatus: false,
        error: {},
      }
    case 'LOAD_CURRENT_USER_DATA':
      console.log('user data', action.payload)
      return {
        ...state,
        currentUserDecks: action.payload.decks,
        loading: false,
      }
    case 'UPDATE_CURRENT_USER_DECKS':
      return {
        ...state,
        currentUserDecks: [...state.currentUserDecks, action.payload],
        loading: false,
      }
    case 'LOGOUT_USER':
      return {
        ...state,
        currentUser: {},
        currentUserDecks: [],
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        errorStatus: !state.errorStatus,
        error: action.payload,
      }
    default:
      return { ...state }
  }
}
