import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { loginUser } from '../actions/auth'

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

const LoginForm = ({ onCancelClick }) => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const authError = useSelector((state) => state.auth.error)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, email, password, history)
    dispatch(loginUser(name, email, password, history))

    /*
    fetchUser(auth endpoint thing with username and password)
      .then(dispatch user is authed)
      .catch(auth failed for reason and dispatch that)
    */
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="name"
        variant="filled"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        <Button variant="contained" onClick={onCancelClick}>
          Cancel
        </Button>
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
