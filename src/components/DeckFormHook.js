import React, { Component, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DeckCardInputHook from './DeckCardInputHook'
import { connect } from 'react-redux'
import { sortCardsIntoBoards } from '../globalFunctions'
import {
  Button,
  Checkbox,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  CardActions,
} from '@material-ui/core'
import { createDeck } from '../actions/decks'
import { clearCard } from '../actions/cards'
import { withRouter } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
import {
  InputLabel,
  FormControl,
  IconButton,
  FormGroup,
  FormLabel,
  TextField,
  Input,
  Select,
} from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { Cards } from './Cards2'
import { makeStyles } from '@material-ui/core/styles'
import { setCards } from '../reducers/cardSlice'
import BrushIcon from '@material-ui/icons/Brush'
import { fetchCARDS } from '../globalVars'
import { selectCard } from '../actions/cards'

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

export function DeckFormHook() {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [format, setFormat] = useState('')
  const [count, setCount] = useState(0)
  const [error, setError] = useState(false)
  const [cards, setCards] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    fetchCARDS().then((data) => {
      dispatch({ type: 'FETCH_CARDS_COMPLETED', payload: data })
    })
    return () => {
      console.log(cards)
    }
  }, [])

  function addCard(addedCard) {
    setCards([...cards, addedCard])
  }

  // function addCardToBoard(addedCard) {
  //     setCards(cards.map((card) => {
  //       if (card.id === addedCard.id) {
  //         return card
  //       }
  //     }
  //   ))
  // }

  function handleSubmit(event) {
    event.preventDefault()
    if (name === '') {
      setError(true)
    } else {
      dispatch(createDeck(name, format, cards))
    }
  }

  const deckCards = useSelector((state) => state.cards.results)

  const deckCardsList =
    deckCards.map((card) => (
      <Container className={classes.cardGrid} maxWidth="md" item key={card.id}>
        <Grid container spacing={4}>
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={card.image_url}
                title={card.name}
              ></CardMedia>
              <CardActions>
                <Button size="small" color="primary">
                  Add to SideBoard
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onChange={(e) => setCards(e.target.value)}
                  onClick={
                    () =>
                      dispatch({ type: 'SELECT_CARD', payload: card }) &&
                      addCard(card.selectedCard)

                    // addCard(card) &&
                    // dispatch({ type: 'ADD_CARD', payload: cardObj }) &&
                    // setCards([...cards, card])
                  }
                >
                  Add Card To Deck
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    )) || []

  return (
    <React.Fragment>
      <div>
        <h1>Create Deck</h1>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onSubmit={handleSubmit}
              error={error}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Format</FormLabel>
            <Select
              name="format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              onSubmit={handleSubmit}
              error={error}
            >
              <option value="">Select Format</option>
              <option value="standard">Standard</option>
              <option value="modern">Modern</option>
              <option value="legacy">Legacy</option>
              <option value="vintage">Vintage</option>
              <option value="commander">Commander</option>
            </Select>
          </FormControl>
          <Button type="submit">Submit</Button>

          <Divider />
          <h1>Deck Cards</h1>
          <div>
            <ul>
              {deckCardsList} <Card cards={deckCardsList} />
            </ul>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}
