import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/auth'

class LoginForm extends React.Component {
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
      <form
        onSubmit={this.handleSubmit}
        className="w-11/12 max-w-2xl mx-auto mt-8"
      >
        <h1 className="font-bold text-3xl">Log In</h1>
        <p className="h-8 text-red-400">
          {this.state.error && 'Invalid email or password'}
        </p>
        <fieldset>
          <label className="block uppercase mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="w-full border-2 focus:outline-none focus:ring-2 p-4 mb-4"
            onChange={this.handleChange}
            value={this.state.username}
          />
        </fieldset>
        <fieldset>
          <label className="block uppercase mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="w-full border-2 focus:outline-none focus:ring-2 p-4 mb-4"
            onChange={this.handleChange}
            value={this.state.email}
          />
        </fieldset>
        <fieldset>
          <label className="block uppercase mb-2" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full border-2 focus:outline-none focus:ring-2 p-4 mb-4"
            onChange={this.handleChange}
            value={this.state.password}
          />
        </fieldset>
        <input
          className="w-full text-center uppercase p-4 bg-blue-300 cursor-pointer mt-4"
          type="submit"
          value="Log In"
        />
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

export default connect(null, mapDispatchToProps)(LoginForm)
