import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { loginUser } from '../actions/auth'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

class LoginForm extends React.Component {
  state = {
    error: false,
    redirect: false,
    fields: {
      username: '',
      email: '',
      password: '',
    },
  }

  componentDidMount = () => {
    if (this.props.location.state) {
      this.setState({
        redirect: this.props.location.state.redirect,
      })
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    if (nextProps.authError) {
      this.setState({
        error: true,
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [event.target.name]: event.target.value,
      },
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {
      fields: { username, email, password },
    } = this.state
    this.props.loginUser(username, email, password, this.props.history)
    this.setState({
      redirect: false,
      error: false,
      fields: {
        ...this.state.fields,
        password: '',
      },
    })
  }

  render() {
    const { error, redirect } = this.state
    if (this.props.loggedIn) {
      return <Redirect to="/" />
    } else {
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
              onClick={this.handleSubmit}
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
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.errorStatus,
    authErrorMessage: state.auth.error.message,
    loggedIn: !!state.auth.currentUser.id,
  }
}

export default connect(mapStateToProps, { loginUser })(LoginForm)
