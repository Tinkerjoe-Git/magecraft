import React from 'react'
import { Grid, Container } from '@material-ui/core'

export default function withStats(Component) {
  return class withStats extends React.Component {
    render() {
      return (
        <Container maxWidth={'md'}>
          <Grid container spacing={4}>
            <Grid item key={this.props.deck_cards.id}></Grid>
            <Component />

            <p>Stats</p>
          </Grid>
        </Container>
      )
    }
  }
}
