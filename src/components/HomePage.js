import React from 'react'
import MtgCard from './MagicCard'
import DeckCard from './DeckCard'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Container,
  Header,
  Button,
  Icon,
  Segment,
  Menu,
} from '@material-ui/core'

const Home = (props) => {
  const handleClick = (event) => {
    props.history.push('/login')
  }

  return (
    <Segment
      id="home"
      color="grey"
      inverted
      textAlign="center"
      vertical
      style={{ height: '100vh' }}
    >
      <Menu
        icon="labeled"
        vertical
        floated="right"
        inverted
        size="mini"
        compact
      >
        <Container text>
          <Header
            className="main-header"
            as="h1"
            content="Spellbook"
            inverted
          />

          {props.loggedIn && (
            <Header className="sub-header" as="h2" inverted>
              Welcome <span className="username">{props.currentUser.name}</span>
            </Header>
          )}

          <Header
            className="sub-header"
            as="h2"
            content="Create and manage your Magic: The Gathering Decks"
            inverted
          />

          {!props.loggedIn && (
            <Button primary size="huge" onClick={handleClick}>
              Get Started
              <Icon name="right arrow" />
            </Button>
          )}
        </Container>
      </Menu>
    </Segment>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    loggedIn: !!state.auth.currentUser.id,
    currentUser: state.auth.currentUser,
  }
}

export default connect(mapStateToProps)(withRouter(Home))
