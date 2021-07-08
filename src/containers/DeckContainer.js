import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/auth'
import DeckCard from '../components/DeckCard'
import { Container, Card } from 'semantic-ui-react'
import Alert from '@material-ui/lab/Alert'

class DeckContainer extends Component {
  state = {
    userPage: false,
    redirect: false,
    visible: false,
    message: '',
    decks: [],
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loggedIn && nextProps.match.path === '/:username/decks') {
      return {
        message:
          (nextProps.location.state && nextProps.location.state.message) || '',
        visible:
          (nextProps.location.state && nextProps.location.state.message) ||
          false,
        userPage: true,
        decks: nextProps.currentUserDecks,
      }
    }

    if (
      nextProps.loggedIn &&
      nextProps.match.path === '/:username/decks' &&
      prevState.userPage === false
    ) {
      nextProps.fetchUser()
      return {
        message:
          (nextProps.location.state && nextProps.location.state.message) || '',
        visible:
          (nextProps.location.state && nextProps.location.state.message) ||
          false,
        userPage: true,
        decks: nextProps.currentUserDecks,
      }
    }

    if (nextProps.match.path === '/decks/search') {
      return {
        message:
          (nextProps.location.state && nextProps.location.state.message) || '',
        visible:
          (nextProps.location.state && nextProps.location.state.message) ||
          false,
        userPage: false,
        decks: nextProps.deckResults,
      }
    }

    return null
  }

  componentDidMount = () => {
    if (this.props.loggedIn && this.props.match.path === '/:username/decks') {
      this.props.fetchUser()
      this.setState({
        userPage: true,
        decks: this.props.currentUserDecks,
      })
    } else if (
      !this.props.loading &&
      !this.props.deckResults.length &&
      this.props.match.path !== '/:username/decks'
    ) {
      this.props.fetchDecks({ term: 'default' }, this.props.history)
    } else if (this.props.match.path === '/decks/search') {
      this.setState({
        userPage: false,
        decks: this.props.deckResults,
      })
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.location.state) {
      this.setState({
        redirect: nextProps.location.state.redirect,
      })
    }
  }

  render() {
    const { deckResults, currentUserDecks } = this.props
    const { userPage, redirect, message, decks } = this.state
    const deckResultsCards = deckResults.map((deck) => (
      <DeckCard key={uuid()} deck={deck.attributes} user={false} />
    ))
    const currentUserDecksCards = currentUserDecks.map((deck) => (
      <DeckCard key={uuid()} deck={deck.attributes} user={true} />
    ))
    const deckCards = decks.map((deck) => (
      <DeckCard key={uuid()} deck={deck.attributes} user={false} />
    ))
    console.log(currentUserDecks)
    return (
      <Container>
        {(redirect && !deckResults.length) ||
        (!redirect && !currentUserDecks.length) ? (
          <Alert severity="info">No decks yet</Alert>
        ) : null}
        {deckCards}
        <React.Fragment>
          {redirect ? deckResultsCards : currentUserDecksCards}
        </React.Fragment>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.auth)
  return {
    deckResults: state.decks.results,
    loading: state.decks.loading,
    currentUserDecks: state.auth.currentUserDecks,
  }
}

export default connect(mapStateToProps, { fetchUser })(DeckContainer)
