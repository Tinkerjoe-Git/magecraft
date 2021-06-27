import React, { Component } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import CardContainer from './containers/CardContainer'
import DeckContainer from './containers/DeckContainer'
import Home from './components/HomePage'
import DeckShow from './components/DeckShow'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import DeckForm from './components/DeckForm'
import NotFoundPage from './components/NotFoundPage'
import withStats from './components/hocs/withStats'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUser } from './actions/auth'
import { Cards } from './components/Cards'

const DeckFormWithStats = withStats(DeckForm)

class App extends Component {
  componentDidMount() {
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
          <Route exact path="/login" />
          <Route exact path="/signup" />
          <Route exact path="/cards" />
          <Route exact path="/decks/search" />
          <Route exact path="/:username/decks" />
          <Route
            exact
            path="/:username/decks/new"
            component={DeckFormWithStats}
          />
          <Route
            exact
            path="/decks/:id"
            render={() => <DeckShow deck={selectedDeck} />}
          />
          <Route
            exact
            path="/:username/decks/:id"
            render={() => <DeckShow deck={selectedDeck} />}
          />
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
