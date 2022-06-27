import React, { Component, useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/auth'
import { fetchDecks } from '../actions/decks'
import DeckCard from '../components/DeckCard'
import { Container, Card } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Cards from '../components/Cards2'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

//TODO: work on structure of fetch

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

export default function DeckContainer() {
  const classes = useStyles()
  const [decks, setDecks] = useState([])
  const deckcards = useSelector((state) => state.results)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: 'SELECT_DECK' })

    fetchDecks()
      .then((data) => {
        dispatch({ type: 'FETCH_DECKS_COMPLETE', payload: data })
      })
      .catch((reason) => ({ type: 'DECK_ERROR', payload: reason }))

    return () => {
      console.log('Unmounting')
    }
  }, [])

  const [selectedDeck, setSelectedDeck] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)

  return (
    <div className={classes.heroContent}>
      <div className={classes.heroButtons}>
        <Button
          variant="contained"
          color="primary"
          className={classes.icon}
          onClick={() => {
            setSelectedDeck(null)
            setSelectedCard(null)
            dispatch({ type: 'SELECT_DECK' })
          }}
        >
          <i className="fa fa-fw fa-plus" />
        </Button>
      </div>
      <Typography variant="h5" component="h1" gutterBottom>
        Decks
      </Typography>
      <Typography variant="subtitle1" component="h2">
        Decks in your account
      </Typography>
      <Cards />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image="/static/images/logo.png"
              title="Logo"
            />
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" component="h1">
                Deck
              </Typography>
              <Typography variant="subtitle1" component="h2">
                Deck title
              </Typography>
              <Typography variant="subtitle1" component="h3">
                Deck description
              </Typography>
            </CardContent>
            <CardActions className={classes.cardContent}>
              <Button color="primary" variant="contained">
                Edit deck
              </Button>
              <Button color="secondary" variant="contained">
                Delete deck
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
