import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { loginUser } from '../actions/auth'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

class Login extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    error: false,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { username, email, password } = this.state
    this.props
      .dispatchLoginUser({ username, email, password })
      .then(() => this.props.history.push('/'))
      .catch(() => this.setState({ error: true }))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          name="username"
          id="standard-password-input"
          label="username"
          placeholder="Username"
          variant="filled"
          required
          value={this.state.username}
          onChange={this.handleChange}
        />
        <TextField
          name="email"
          label="email"
          variant="filled"
          required
          value={this.state.email}
          onChange={this.handleChange}
        />

        <TextField
          name="password"
          label="Password"
          variant="filled"
          type="password"
          required
          value={this.state.password}
          onChange={this.handleChange}
        />
        <div>
          <Button variant="contained">Cancel</Button>
          <Input type="submit" value="Log In" />
          <Button
            onClick={() => {
              alert('Logging In')
            }}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLoginUser: (name, email, password) =>
      dispatch(loginUser(name, email, password)),
  }
}

export default connect(null, mapDispatchToProps)(Login)
