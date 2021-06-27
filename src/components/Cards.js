import React, { Component, useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import BookIcon from '@material-ui/icons/Book'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import { withRouter } from 'react-router-dom'
import DeleteModal from './DeleteModal'
import { connect, useSelector, useDispatch } from 'react-redux'
import { selectDeck, deleteDeck } from '../actions/decks'
import { dateFormater } from '../globalFunctions'
import { fetchCARDS } from '../globalVars'
import { setCards } from '../reducers/cardSlice'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        MageCraft
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

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
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))

export default function Cards() {
  const classes = useStyles()
  const cards = useSelector((state) => state.cards)
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('mounting cards')
    fetchCARDS('cards').then(() => dispatch(setCards(cards)))
    return () => {
      console.log('done')
    }
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <BookIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Cards
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Card Layout
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              List of Standard Legal Cards 2021
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card, i) => (
              <Grid item key={i}>
                {card.name} xs={12} sm={6} md={4}
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.img_url}
                    title={card.name}
                  />
                  )
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {this.props.name}
                    </Typography>
                    <Typography>{this.props.text}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View Full Details
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={this.handleAdd}
                    >
                      Add Card
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          MageCraft
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          If you want to see more sets let me know.
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  )
}

// const mapStateToProps = (state) => {
//   return {
//     currentUser: state.auth.currentUser,
//   }
// }

// connect(mapStateToProps, { selectDeck, deleteDeck })(withRouter(DeckCard2))