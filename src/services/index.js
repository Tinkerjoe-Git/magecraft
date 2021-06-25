import { API_ROOT } from '../globalVars'

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json',
}

const getWithToken = async (url) => {
  const token = localStorage.getItem('token')
  const res = await fetch(url, {
    headers: { Authorization: token },
  })
  return await res.json()
}

const getCurrentUser = () => {
  return getWithToken(`${API_ROOT}/current_user`)
}

const login = async (data) => {
  const res = await fetch(`${API_ROOT}/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })
  return await res.json()
}

export const adapter = {
  auth: {
    login,
    getCurrentUser,
  },
}
