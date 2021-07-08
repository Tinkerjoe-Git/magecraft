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

export const loginUser = (name, email, password, history) => (dispatch) => {
  dispatch({ type: 'LOADING_USER' })

  adapter.auth.login({ name, email, password }).then((res) => {
    if (res.error) {
      dispatch({ type: 'LOGIN_ERROR', payload: res.error })
    } else {
      console.log(res)
      // setToken(res.headers.get('Authorization'))
      localStorage.setItem('token', res.jwt)
      const { id, name } = res.data
      const decks = res.data.decks
      dispatch({ type: 'SET_CURRENT_USER', user: { id, name } })
      dispatch({
        type: 'LOAD_CURRENT_USER_DATA',
        payload: { decks },
      })
      history.push('/')
    }
  })
}

// export const logoutUser = () => {
//   localStorage.removeItem('token')
//   return {
//     type: 'LOGOUT_USER',
//   }
// }

export const logoutUser = () => {
  return (dispatch) => {
    return fetch('http://localhost:3001/logout', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
    }).then((res) => {
      if (res.ok) {
        return (
          dispatch({ type: NOT_AUTHENTICATED }),
          dispatch({ type: 'LOGOUT_USER' })
        )
      } else {
        return res.json().then((errors) => {
          dispatch({ type: NOT_AUTHENTICATED })
          return Promise.reject(errors)
        })
      }
    })
  }
}

export const createUser = (name, email, password, history) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_USER' })
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify({ user: { name, email, password } }),
    }
    return fetch(`${API_ROOT}/signup`, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          dispatch({ type: 'LOGIN_ERROR', payload: res.error })
        } else {
          localStorage.setItem('token', res.jwt)
          const { id, name } = res.data
          dispatch({ type: 'SET_CURRENT_USER', user: { id, name } })
        }
      })
  }
}

// export const createUser = (name, email, password, history) => {
//   return (dispatch) => {
//     return fetch(`${API_ROOT}/signup`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accepts: 'application/json',
//       },
//       body: JSON.stringify({ user: { name, email, password } }),
//     }).then((res) => {
//       if (res.ok) {
//         console.log(res.headers.get('Authorization'))
//         localStorage.setItem('token', res.jwt)
//         // const { id, name } = res.user.attributes
//         //TODO: lets set our currentUser
//         return res.json().then(
//           (userJson) => dispatch({ type: AUTHENTICATED, payload: userJson }),
//           // dispatch({
//           //   type: 'SET_CURRENT_USER',
//           //   //TODO: maybe user: { name, email, password }
//           //   user: { id, name },
//           // }),

//           //history.push('/');
//         )
//       } else {
//         return res.json().then((errors) => {
//           dispatch({ type: 'LOGIN_ERROR', payload: res.error })
//           return Promise.reject(errors)
//         })
//       }
//     })
//   }

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
