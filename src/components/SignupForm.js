import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createUser } from '../actions/auth'
import { connect } from 'react-redux'
import {
  Card,
  Button,
  Grid,
  CardHeader,
  Divider,
  TextField,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

class SignupForm extends Component {
  state = {
    validation: {
      error: false,
      message: '',
    },
    fields: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  }

  handleChange = (name) => (event) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: event.target.value,
      },
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {
      fields: { name, email, password, passwordConfirmation },
    } = this.state
    if (password === passwordConfirmation) {
      this.props.createUser(name, email, password, this.props.history)
    } else {
      this.setState({
        validation: {
          error: true,
          message: 'Passwords do not match',
        },
        fields: {
          ...this.state.fields,
          password: '',
          passwordConfirmation: '',
        },
      })
    }
  }

  render() {
    const { error, message } = this.state.validation
    return (
      <Grid className="login-form">
        <Card className="auth-form-body">
          <Divider hidden />
          <CardHeader as="h2"> Signup for your account</CardHeader>
          {/* <Alert severity="error">Something went wrong! {message} </Alert> */}
          <form size="large" onSubmit={this.handleSubmit}>
            <TextField
              id="name"
              placeholder="name"
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange('name')}
            />
            <TextField
              id="email"
              placeholder="email"
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange('email')}
            />
            <TextField
              id="password"
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange('password')}
            />
            <TextField
              placeholder="Password confirmation"
              name="passwordConfirmation"
              type="password"
              value={this.state.passwordConfirmation}
              onChange={this.handleChange('passwordConfirmation')}
            />

            <Button onClick={this.handleSubmit}>Signup</Button>
          </form>
          <Alert severity="info">
            Already have an account? <Link to="/login">Login</Link>
          </Alert>
        </Card>
      </Grid>
    )
  }
}

export default connect(null, { createUser })(SignupForm)
