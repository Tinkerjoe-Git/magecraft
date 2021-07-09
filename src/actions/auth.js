import { adapter } from '../services'
import { API_ROOT } from '../globalVars'
import { AUTHENTICATED, NOT_AUTHENTICATED } from '../actions'

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
      const { id, name, decks } = res.data
      dispatch({ type: 'SET_CURRENT_USER', user: { id, name } })
      dispatch({ type: 'LOAD_CURRENT_USER_DATA', payload: { decks } })
    })
    .catch((err) => {
      // unproblematic if no current user
    })
}

export const loginUser = (username, password, history) => (dispatch) => {
  dispatch({ type: 'LOADING_USER' })

  adapter.auth.login({ username, password }).then((res) => {
    if (res.error) {
      dispatch({ type: 'LOGIN_ERROR', payload: res.error })
    } else {
      localStorage.setItem('token', res.jwt)
      const { id, name } = res.user.data.attributes
      const decks = res.user.data.attributes.decks.data
      dispatch({ type: 'SET_CURRENT_USER', user: { id, name } })
      dispatch({
        type: 'LOAD_CURRENT_USER_DATA',
        payload: { decks },
      })
      history.push('/')
    }
  })
}

// export const loginUser = (username, email, password) => {
//   return (dispatch) => {
//     return fetch('http://localhost:3001/login', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ user: username, email, password }),
//     }).then((res) => {
//       if (res.ok) {
//         setToken(res.headers.get('Authorization'))
//         // const { id, name } = res.user.data.attributes
//         // const decks = res.user.data.attributes.decks.data
//         return res
//           .json()
//           .then(
//             (userJson) => dispatch({ type: AUTHENTICATED, payload: userJson }),
//             dispatch({ type: 'SET_CURRENT_USER', user: { id, name } }),
//             dispatch({ type: 'LOAD_CURRENT_USER_DATA', payload: { decks } }),
//           )
//       } else {
//         return res.json().then((errors) => {
//           dispatch({ type: NOT_AUTHENTICATED })
//           return Promise.reject(errors)
//         })
//       }
//     })
//   }
// }
// export const loginUser = (name, email, password) => {
//   return (dispatch) => {
//     return fetch('http://localhost:3000/login', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ user: name, email, password }),
//     }).then((res) => {
//       if (res.ok) {
//         setToken(res.headers.get('Authorization'))
//         return res
//           .json()
//           .then((userJson) =>
//             dispatch({ type: AUTHENTICATED, payload: userJson }),
//           )
//       } else {
//         return res.json().then((errors) => {
//           dispatch({ type: NOT_AUTHENTICATED })
//           return Promise.reject(errors)
//         })
//       }
//     })
//   }

// export const loginUser = (name, email, password) => {
//   return (dispatch) => {
//     return fetch('http://localhost:3000/login', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ user: name, email, password }),
//     }).then((res) => {
//       if (res.ok) {
//         setToken(res.headers.get('Authorization'))
//         const { id, name } = res.user.user.attributes
//         const decks = res.user.user.attributes.decks.data
//         return res.json().then(
//           () =>
//             dispatch({
//               type: 'AUTHENTICATED',
//               user: { name, email, password },
//             }),
//           dispatch({ type: 'SET_CURRENT_USER', user: { id, name } }),
//           dispatch({
//             type: 'LOAD_CURRENT_USER_DATA',
//             payload: { decks },
//           }),
//         )
//       } else {
//         return res.json().then((errors) => {
//           dispatch({ type: NOT_AUTHENTICATED })
//           return Promise.reject(errors)
//         })
//       }
//     })
//   }
// }

export const logoutUser = () => {
  localStorage.removeItem('token')
  return {
    type: 'LOGOUT_USER',
  }
}

// export const createUser = (name, email, password, history) => {
//   return (dispatch) => {
//     dispatch({ type: 'LOADING_USER' })
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accepts: 'application/json',
//       },
//       body: JSON.stringify({ user: { name, email, password } }),
//     }
//     return fetch(`${API_ROOT}/signup`, options)
//       .then((res) => res.json())
//       .then((res) => {
//         if (res.error) {
//           dispatch({ type: 'LOGIN_ERROR', payload: res.error })
//         } else {
//           localStorage.setItem('token', res.jwt)
//           const { id, name } = res.data
//           dispatch({ type: 'SET_CURRENT_USER', user: { id, name } })
//         }
//       })
//   }
// }

export const createUser = (username, email, password, history) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_USER' })
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    }
    return fetch(`${API_ROOT}/signup`, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          dispatch({ type: 'LOGIN_ERROR', payload: res.error })
        } else {
          localStorage.setItem('token', res.jwt)
          const { id, name } = res.user.data.attributes
          dispatch({ type: 'SET_CURRENT_USER', user: { id, name } })
        }
      })
  }
}

const setToken = (token) => {
  localStorage.setItem('token', token)
  localStorage.setItem('lastLoginTime', new Date(Date.now()).getTime())
}

const getToken = () => {
  const now = new Date(Date.now()).getTime()
  const thirtyMinutes = 1000 * 60 * 30
  const timeSinceLastLogin = now - localStorage.getItem('lastLoginTime')
  if (timeSinceLastLogin < thirtyMinutes) {
    return localStorage.getItem('token')
  }
}

// export const checkAuth = () => {
//   return (dispatch) => {
//     return fetch('http://localhost:3000/current_user', {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: getToken(),
//       },
//     }).then((res) => {
//       if (res.ok) {
//         return res
//           .json()
//           .then((user) => dispatch({ type: AUTHENTICATED, payload: user }))
//       } else {
//         return Promise.reject(dispatch({ type: NOT_AUTHENTICATED }))
//       }
//     })
//   }
// }
