import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/auth'
import DeckCard from '../components/DeckCard'
import { Container, Card } from 'semantic-ui-react'
import Alert from '@material-ui/lab/Alert'

class DeckContainer extends Component {
  state = {
    redirect: false,
  }

  componentDidMount = () => {
    this.props.fetchUser()
    if (this.props.location.state) {
      this.setState({
        redirect: this.props.location.state.redirect,
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
    const { redirect } = this.state
    const deckResultsCards = deckResults.map((deck) => (
      <DeckCard key={uuid()} deck={deck.attributes} user={false} />
    ))
    const currentUserDecksCards = currentUserDecks.map((deck) => (
      <DeckCard key={uuid()} deck={deck.attributes} user={true} />
    ))
    console.log(currentUserDecks)
    return (
      <Container>
        {(redirect && !deckResults.length) ||
        (!redirect && !currentUserDecks.length) ? (
          <Alert severity="info">No decks yet</Alert>
        ) : null}
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
