import * as React from 'react'
import { Grid, Container } from '@material-ui/core'

export default function withStats(Component) {
  return class withStats extends React.Component {
    render() {
      return (
        <Container maxWidth={'md'}>
          <Grid>
            <Component {...this.props} />

            <p>Stats</p>
          </Grid>
        </Container>
      )
    }
  }
}
