import React, { Component } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import CardContainer from './containers/CardContainer'
import DeckContainer from './containers/DeckContainer'
import Home from './components/HomePage'
//import DeckShow from './components/DeckShow'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import DeckForm from './components/DeckForm'
import NotFoundPage from './components/NotFoundPage'
import withStats from './components/hocs/withStats'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { fetchUser } from './actions/auth'
import Cards from './components/Cards2'
import { getCards } from './actions/cards'

const DeckFormWithStats = withStats(DeckForm)

const LoginPage = () => {
  const userIsAuthenticated = useSelector(
    (state) => !!state.auth.currentUser.id,
  )

  if (userIsAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  )
}

const SignupPage = () => {
  const userIsAuthenticated = useSelector(
    (state) => !!state.auth.currentUser.id,
  )

  if (userIsAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h1>Signup</h1>
      <SignupForm />
    </div>
  )
}

class App extends Component {
  componentDidMount() {
    this.props.getCards
    let jwt = localStorage.getItem('token')
    if (jwt && !this.props.loggedIn) {
      this.props.fetchUser()
    }
  }

  render() {
    const {
      selectedDeck,
      // loggedIn,
      // loading,
    } = this.props
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/cards" component={Cards} />
          <Route exact path="/decks/search" />
          {/* UserDecks is list of all decks for a given user */}
          <Route exact path="/decks/:username" component={UserDecks} />
          {/* UserDeck is a single deck of cards */}
          <Route exact path="/decks/:username/:id" component={UserDeck} />
          <Route
            exact
            path="/:username/decks/new"
            component={DeckFormWithStats}
          />
          <Route exact path="/decks/:id" />
          <Route exact path="/:username/decks/:id" />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDeck: state.decks.selected,
    loggedIn: !!state.auth.currentUser.id,
  }
}

export default withRouter(connect(mapStateToProps, { fetchUser })(App))
