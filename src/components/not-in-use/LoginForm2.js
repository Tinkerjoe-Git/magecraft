import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { loginUser } from '../../actions/auth'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}))

const LoginForm = (props) => {
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  //const Loggedin = useSelector((state) => state.auth.currentUser.id)

  const authError = useSelector((state) => state.auth.error)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    return {
      dispatchLoginUser: (username, email, password) =>
        dispatch(loginUser(username, email, password)).then(() =>
          props.history.push('/'),
        ),
    }
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="username"
        placeholder="Username"
        variant="filled"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="email"
        variant="filled"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <Button variant="contained">Cancel</Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
