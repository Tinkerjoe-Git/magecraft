import { API_ROOT } from '../globalVars'

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json',
}

const getWithToken = async (url) => {
  const token = localStorage.getItem('token')

  const res = await fetch(url, {
    headers: { Authorization: token, 'Content-Type': 'application/json' },
  })
  return res
}

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

const login = async (data) => {
  const res = await fetch(`${API_ROOT}/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })
  //TODO:
  return await res.json()
}

export const adapter = {
  auth: {
    login,
    getCurrentUser,
  },
}
