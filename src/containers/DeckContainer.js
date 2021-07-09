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
  const deckcards = useSelector((state) => state.decks)
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

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Cards Index
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          List of Standard Legal Cards 2021
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/:username/decks/new`}
              >
                Make a New Deck
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary">
                Wishlist a Card
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}
