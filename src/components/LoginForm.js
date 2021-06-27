import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { connect, useSelector, useDispatch } from 'react-redux'

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

const LoginForm = ({ handleClose }) => {
  const classes = useStyles()
  const [username, setUsername] = useState('')
  //const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const authError = useSelector((state) => state.auth.error)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(username, password)
    /*
    fetchUser(auth endpoint thing with username and password)
      .then(dispatch user is authed)
      .catch(auth failed for reason and dispatch that)
    */
    if (handleClose) handleClose()
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="username"
        variant="filled"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
