import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { loginUser } from '../actions/auth'
import { connect } from 'react-redux'
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Divider,
} from '@material-ui/core'

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
            <Header as="h2" textAlign="center">
              {' '}
              Log-in to your account
            </Header>
            <Message warning attached hidden={redirect === false}>
              <Message.Header>
                You must be logged before you can do that!
              </Message.Header>
              <p>Please login below, then try again.</p>
            </Message>
            <Message warning attached hidden={error === false}>
              <Message.Header>Something went wrong!</Message.Header>
              <p>{this.props.authErrorMessage}</p>
            </Message>
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
            <Message>
              New to us? <Link to="/signup">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
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
