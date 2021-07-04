import { adapter } from '../services'
import { API_ROOT } from '../globalVars'

// export const fetchUser = () => (dispatch) => {
//   dispatch({ type: 'LOADING_USER' })
//   adapter.auth.getCurrentUser().then((data) => {
//     console.log(data)

//     dispatch({ type: 'SET_CURRENT_USER', user: data.attributes })
//   })
// }

export const fetchUser = () => (dispatch) => {
  dispatch({ type: 'LOADING_USER' })
  adapter.auth
    .getCurrentUser()
    .then((res) => {
      const { id, name, email } = res.data.attributes
      const decks = res.data.attributes.decks.data
      dispatch({ type: 'SET_CURRENT_USER', user: { id, name, email } })
      dispatch({ type: 'LOAD_CURRENT_USER_DATA', payload: { decks } })
    })
    .catch((err) => {
      // unproblematic if no current user
    })
}

export const loginUser = (username, email, password, history) => (dispatch) => {
  dispatch({ type: 'LOADING_USER' })

  return adapter.auth.login({ username, email, password }).then((res) => {
    if (res.error) {
      dispatch({ type: 'LOGIN_ERROR', payload: res.error })
    } else {
      localStorage.setItem('token', res.jwt)
      const { id, name, email } = res.user.data.attributes
      const decks = res.user.data.attributes.decks.data
      console.log(res.data.attributes)

      dispatch({ type: 'SET_CURRENT_USER', user: { id, name, email } })
      dispatch({
        type: 'LOAD_CURRENT_USER_DATA',
        payload: { decks },
      })
      history.push('/')
    }
  })
}

export const logoutUser = () => {
  localStorage.removeItem('token')
  return {
    type: 'LOGOUT_USER',
  }
}

export const createUser = (name, email, password, history) => {
  return (dispatch) => {
    return fetch(`${API_ROOT}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify({ user: { name, email, password } }),
    }).then((res) => {
      if (res.ok) {
        console.log(res.headers.get('Authorization'))
        localStorage.setItem('token', res.headers.get('Authorization'))
        //TODO: lets set our currentUser
        return res.json().then((userJson) =>
          dispatch({
            type: 'SET_CURRENT_USER',
            payload: userJson,
          }),
        )
      } else {
        return res.json().then((errors) => {
          dispatch({ type: 'LOGIN_ERROR', payload: res.error })
          return Promise.reject(errors)
        })
      }
    })
  }
}

//TODO: check the order here, seems sus.
// export const createUser = (name, email, password, history) => {
//   return async (dispatch) => {
//     dispatch({ type: 'LOADING_USER' })
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accepts: 'application/json',
//       },
//       // body: JSON.stringify({ user: credentials })
//       body: JSON.stringify({ user: { name, email, password } }),
//     }
//     try {
//       const res = await fetch(`${API_ROOT}/signup`, options)
//       const res_1 = await res.json()
//       if (res_1.error) {
//         dispatch({ type: 'LOGIN_ERROR', payload: res_1.error })
//       } else {
//         localStorage.setItem('token', res.headers.get('Authorization'))
//         const { id, name, email } = res_1.user.data.attributes
//         dispatch({ type: 'SET_CURRENT_USER', user: { id, name, email } })
//         history.push('/')
//       }
//     } catch (e) {
//       console.log(e)
//     }
//   }
// }
