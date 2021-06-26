import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { loginUser } from '../actions/auth'
import { connect } from 'react-redux'
import { Button, Grid, CardHeader, Divider } from '@material-ui/core'
import { Form } from 'react-final-form'
import { Alert } from '@material-ui/lab'
import { Segment } from 'semantic-ui-react'

class LoginForm extends Component {
  state = {
    error: false,
    redirect: false,
    fields: {
      username: '',
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
      fields: { username, password },
    } = this.state
    this.props.loginUser(username, password, this.props.history)
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
        <Grid textAlign="center" verticalAlign="top" className="login-form">
          <Grid.Column className="auth-form-body">
            <Divider hidden />
            <CardHeader as="h2" textAlign="center">
              {' '}
              Log-in to your account
            </CardHeader>
            <Alert severity="error">
              You must be logged before you can do that!
            </Alert>
            <Alert severity="error">
              <p>Please login below, then try again.</p>
            </Alert>
            <Alert severity="warning">Something went wrong!</Alert>
            <p>{this.props.authErrorAlert}</p>
            <Form size="large" onSubmit={this.handleSubmit}>
              <p>
                For sample, use <b>username:</b> <i>demo</i> and{' '}
                <b>password:</b> <i>1234</i>
              </p>
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

                <Button fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Alert>
              New to us? <Link to="/signup">Sign Up</Link>
            </Alert>
          </Grid.Column>
        </Grid>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.errorStatus,
    authErrorAlert: state.auth.error.Alert,
    loggedIn: !!state.auth.currentUser.id,
  }
}

export default connect(mapStateToProps, { loginUser })(LoginForm)
