import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

export default function withLoader(Component) {
  return class withLoader extends React.Component {
    render() {
      return this.props.loading ? (
        <Dimmer active="true">
          <Loader />
        </Dimmer>
      ) : (
        <Component {...this.props} />
      )
    }
  }
}
