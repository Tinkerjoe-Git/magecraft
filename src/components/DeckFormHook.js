import React, { Component, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DeckCardInputHook from './DeckCardInputHook'
import { connect } from 'react-redux'
import { sortCardsIntoBoards } from '../globalFunctions'
import {
  Button,
  Container,
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
import { Cards } from './Cards2'
import { makeStyles } from '@material-ui/core/styles'
import { setCards } from '../reducers/cardSlice'
import BrushIcon from '@material-ui/icons/Brush'

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
  const { name, setName } = useState('')
  const { format, setFormat } = useState('')
  const { count, setCount } = useState(0)
  const { error, setError } = useState(false)
  const { cards, setCards } = useState([])
  const dispatch = useDispatch()

  function handleChange(event) {
    setName(event.target.value)
    setCount(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (name === '') {
      setError(true)
    } else {
      dispatch(createDeck(name, format, cards))
      setName('')
      setFormat('')
      setCards([])
      setError(false)
    }
  }

  function addCard(card) {
    let newCards = [...cards]
    newCards.push(card)
    setCards(newCards)
  }

  const deckCards = useSelector((state) => state.cards.results)

  const deckCardsList =
    deckCards.map((card) => (
      <Grid item key={card.id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={card.image_url}
            title={card.name}
          />

          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {card.name}
            </Typography>
            <Typography color="textSecondary" align="center" variant="body1">
              Type:{card.card_type}
            </Typography>
            <br></br>
            <Typography color="textSecondary" align="center" variant="body2">
              {card.text}
            </Typography>
            <br></br>
            <Typography gutterBottom variant="body2">
              <BrushIcon />
              {card.artist}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              View Full Details
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                console.log('handle add')
              }}
            >
              Add Card
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )) || []

  return (
    <div>
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={name}
            onChange={handleChange}
            onSubmit={handleSubmit}
            error={error}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Format</FormLabel>
          <Select
            name="format"
            value={format}
            onChange={handleChange}
            onSubmit={handleSubmit}
            error={error}
          >
            <option value="">Select Format</option>
            <option value="standard">Standard</option>
            <option value="modern">Modern</option>
            <option value="legacy">Legacy</option>
            <option value="vintage">Vintage</option>
            <option value="commander">Commander</option>
            <option value="players">Players</option>
          </Select>
        </FormControl>
        <Button type="submit">Submit</Button>

        <Divider />
        <h1>Deck Cards</h1>
        <div>
          <DeckCardInputHook onChange={handleChange} />
          {deckCardsList}
        </div>
      </form>
    </div>
  )
}
