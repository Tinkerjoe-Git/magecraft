import React, { Component } from 'react'
//import uuid from 'uuid'
import FragmentList from './FragmentList'
import DeleteModal from './DeleteModal'
import { keysForDeckShow } from '../globalVars'
import { sortCardsByType, dateFormater } from '../globalFunctions'
import { withRouter, Redirect } from 'react-router-dom'
import {
  fetchDeck,
  deleteDeck,
  updateDeck,
  deleteFromDeck,
  createDeck,
} from '../actions/decks'
import { connect } from 'react-redux'
import {
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Container,
  Grid,
  Icon,
} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

class DeckShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      userDeck: false,
      editing: false,
      destroy: false,
      deck: {},
      deckCopy: {},
      fragmentCount: 0,
      validation: {
        error: false,
        message: '',
      },
    }
    this.cardsToUpdate = []
    this.cardsToDelete = []
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount = () => {
    if (!Object.keys(this.props.selectedDeck).length) {
      this.props.fetchDeck(this.props.match.params.id)
      if (this.props.match.path === '/:username/decks/:id') {
        this.setState({ userDeck: true })
      }
    }
    if (this.props.match.path === '/:username/decks/:id') {
      this.setState({ userDeck: true })
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      !prevState.fragmentCount &&
      Object.keys(nextProps.selectedDeck).length
    ) {
      const mainboardFragments = nextProps.selectedDeck.cards.filter(
        (card) => !card.sideboard,
      ).length
      const uniqCardTypes = [
        nextProps.selectedDeck.cards.map((card) => card.id),
      ].length
      const cardsWithKeys = nextProps.selectedDeck.cards.map((card) => {
        card.key = card.id
        card.error = false
        return card
      })
      return {
        fragmentCount: mainboardFragments + uniqCardTypes,
        deck: { ...nextProps.selectedDeck, cards: cardsWithKeys },
        deckCopy: { ...nextProps.selectedDeck, cards: cardsWithKeys },
      }
    }

    if (nextProps.deckError) {
      const cards = prevState.deck.cards.map((card) => {
        if (nextProps.deckErrorRes.keys.includes(card.key)) {
          card.error = true
        }
        return card
      })

      return {
        validation: {
          error: true,
          message: nextProps.deckErrorRes.message,
        },
        deck: { ...prevState.deck, cards },
      }
    }
    return null
  }

  handleDelete = (event) => {
    this.setState({ redirect: true }, () =>
      this.props.deleteDeck(
        this.props.selectedDeck.id,
        this.props.history,
        this.props.currentUser,
      ),
    )
  }

  handleEdit = (event) => {
    if (this.state.editing) {
      this.setState({ editing: !this.state.editing, deck: this.state.deckCopy })
    } else {
      this.setState({ editing: !this.state.editing })
    }
  }

  handleCopy = (event) => {
    const copy = true
    this.props.createDeck(this.state.deck, this.props.history, copy)
  }

  toggleDestroyModal = () => {
    this.setState({
      destroy: !this.state.destroy,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (
      JSON.stringify(this.state.deck) !== JSON.stringify(this.state.deckCopy)
    ) {
      this.props.updateDeck(this.state.deck)
      this.setState({
        editing: false,
      })
    } else {
      alert('No were changes made, submission invalid')
    }
  }

  appendInput = (event, { name }) => {
    event.preventDefault()
    const sideboard = name === 'sideboard'
    const cards = this.state.deck.cards
    if (cards.length <= 100) {
      this.setState(
        {
          deck: {
            ...this.state.deck,
            cards: [
              ...this.state.deck.cards,
              {
                key: cards.id,
                error: false,
                primary_type: name,
                sideboard,
                name: '',
                count: '',
              },
            ],
          },
        },
        () => console.log(this.state.deck.cards.length),
      )
    } else {
      alert('Max cards reached')
    }
  }

  handleCardChange = (event, { name, id, value }) => {
    const cards = this.state.deck.cards.map((card) => {
      if (card.key === id) {
        card[name] = value
      }
      return card
    })
    this.setState({
      deck: { ...this.state.deck, cards },
    })
  }

  removeInput = (event) => {
    event.preventDefault()
    const { id } = event.target
    const cards = this.state.deck.cards.filter((card) => card.key !== id)
    this.setState({
      deck: { ...this.state.deck, cards },
    })
  }

  render() {
    const { loggedIn, history } = this.props
    const { destroy, userDeck, redirect, editing } = this.state

    const {
      name,
      totalMainboard,
      totalSideboard,
      cards,
      creator,
      userName,
      formatName,
      updatedAt,
    } = this.state.deck
    const mainboardFragments = (() => {
      if (cards) {
        const fragments = []
        const mainboard = cards.filter((card) => !card.sideboard)
        const sortedCards = sortCardsByType(mainboard)
        for (const cardType in sortedCards) {
          fragments.push(
            <FragmentList
              appendInput={this.appendInput}
              removeInput={this.removeInput}
              handleCardChange={this.handleCardChange}
              key={cards.id[cardType]}
              editing={this.state.editing}
              cards={sortedCards[cardType]}
              type={cardType}
              board="mainboard"
            />,
          )
        }
        return fragments.sort(
          (a, b) => b.props.cards.length - a.props.cards.length,
        )
      }
    })()
    const sideboardFragment = (() => {
      if (cards) {
        const sideboard = cards.filter((card) => card.sideboard)
        return (
          <FragmentList
            appendInput={this.appendInput}
            removeInput={this.removeInput}
            handleCardChange={this.handleCardChange}
            totalsideboard={totalSideboard}
            key={cards.ids.Sideboard}
            editing={this.state.editing}
            cards={sideboard}
            type="sideboard"
            board="sideboard"
          />
        )
      }
    })()

    const useStyles = makeStyles((theme) => ({
      icon: {
        marginRight: theme.spacing(2),
      },
      heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
      },
      heroButtons: {
        marginTop: theme.spacing(4),
      },
      cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
        backgroundSize: 'contain',
      },
      cardContent: {
        flexGrow: 1,
      },
      footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
      },
    }))
    const classes = useStyles()

    if (redirect) {
      return <Redirect exact to={`/${this.props.currentUser.name}/decks`} />
    } else {
      return (
        <Container>
          <ButtonGroup>
            <Button name="edit" onClick={history.goBack}>
              {userDeck ? 'Return to Decks' : 'Return to Results'}
            </Button>
            {loggedIn && !editing && userDeck && (
              <Button name="edit" onClick={this.handleEdit}>
                Edit
              </Button>
            )}
            {loggedIn && !editing && !userDeck && (
              <Button name="copy" onClick={this.handleCopy}>
                Copy
              </Button>
            )}
            {loggedIn && editing && (
              <Button name="cancel" onClick={this.handleEdit}>
                Cancel
              </Button>
            )}
            {userDeck && !editing && (
              <Button name="delete" onClick={this.toggleDestroyModal}>
                Delete
              </Button>
            )}
            {editing && <Button onClick={this.handleSubmit}>Update</Button>}
          </ButtonGroup>
          <List>
            <ListItem>
              <b>Creator:</b> {userName !== 'admin' ? userName : creator}
            </ListItem>
            <ListItem>
              <b>Format:</b> {formatName}
            </ListItem>
            <ListItem>
              <b>Last Updated:</b> {dateFormater(updatedAt)}
            </ListItem>
          </List>
          <Grid container spacing={4}>
            <Grid item key={this.cards.id}>
              <Card>
                <CardContent className={classes.cardContent}>
                  <Typography>{`Mainboard (${totalMainboard})`}</Typography>
                  <div
                    id={
                      (this.state.fragmentCount <= 26 &&
                        'deck-container-small') ||
                      (this.state.fragmentCount > 38 &&
                        'deck-container-large') ||
                      'deck-container-mid'
                    }
                  >
                    {mainboardFragments}
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid container spacing={4}>
              <Card>
                <CardContent className={classes.cardContent}>
                  <Typography>{`Mainboard (${totalMainboard})`}</Typography>
                  <Typography>{`Sideboard (${totalSideboard})`}</Typography>
                </CardContent>
              </Card>
              {sideboardFragment}
            </Grid>
          </Grid>

          <DeleteModal
            open={destroy}
            handleDelete={this.handleDelete}
            toggle={this.toggleDestroyModal}
            type="deck"
          />
        </Container>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDeck: state.decks.selected,
    loading: state.decks.loading,
    currentUser: state.auth.currentUser,
    loggedIn: !!state.auth.currentUser.id,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    fetchDeck,
    deleteDeck,
    updateDeck,
    deleteFromDeck,
    createDeck,
  })(DeckShow),
)
