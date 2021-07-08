import { API_ROOT } from '../globalVars'

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json',
}

const getWithToken = (url) => {
  const token = localStorage.getItem('token')
  return fetch(url, {
    headers: { Authorization: token },
  }).then((res) => res.json())
}

// const getCurrentUser = () => {
//   return getWithToken(`${API_ROOT}/current_user`)
// }

const getCurrentUser = () => {
  // resolve if current user is present, reject otherwise

  return getWithToken(`${API_ROOT}/current_user`).then((res) => {
    console.log(res)
    if (res.status === 401) {
      throw new Error('Not authorized as current user')
    } else {
      return res.json()
    }
  })
}

const setToken = (token) => {
  localStorage.setItem('token', token)
  localStorage.setItem('lastLoginTime', new Date(Date.now()).getTime())
}

const login = (credentials) => {
  return fetch(`${API_ROOT}/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ user: credentials }),
  }).then((res) => res.json())
}

export const adapter = {
  auth: {
    login,
    getCurrentUser,
  },
}
