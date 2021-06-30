import React from 'react'
import { Grid, Container } from 'material-ui'

export default function withStats(Component) {
  return class withStats extends React.Component {
    render() {
      return (
        <Container maxWidth={'md'}>
          <Grid container spacing={4}>
            <Grid item key={this.props.cards.id}></Grid>
            <Component />

            <p>Stats go here</p>
          </Grid>
        </Container>
      )
    }
  }
}
