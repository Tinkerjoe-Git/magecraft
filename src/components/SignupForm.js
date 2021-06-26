import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createUser } from '../actions/auth'
import { connect } from 'react-redux'
import { Button, Grid, CardHeader, Divider } from '@material-ui/core'
import { Form } from 'react-final-form'
import { Alert } from '@material-ui/lab'
import { Segment } from 'semantic-ui'

class SignupForm extends Component {
  state = {
    validation: {
      error: false,
      message: '',
    },
    fields: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
  }

  handleChange = (event, { name, value }) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {
      fields: { username, password, passwordConfirmation },
    } = this.state
    if (password === passwordConfirmation) {
      this.props.createUser(username, password, this.props.history)
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
      <Grid textAlign="center" verticalAlign="top" className="login-form">
        <Grid.Column className="auth-form-body">
          <Divider hidden />
          <CardHeader as="h2" textAlign="center">
            {' '}
            Signup for your account
          </CardHeader>
          <Alert severity="error">Something went wrong! {message} </Alert>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password confirmation"
                name="passwordConfirmation"
                type="password"
                value={this.state.passwordConfirmation}
                onChange={this.handleChange}
              />

              <Button fluid size="large">
                Signup
              </Button>
            </Segment>
          </Form>
          <Alert severity="info">
            Already have an account? <Link to="/login">Login</Link>
          </Alert>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(null, { createUser })(SignupForm)
