import React, { Component } from 'react'
import { Box, Popper } from '@material-ui/core'

class CardFragment extends Component {
  state = { isOpen: false }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  handleClose = () => {
    this.setState({ isOpen: false })
  }

  render() {
    const { count, name, img_url } = this.props.card
    const fragment = (
      <Box>
        <a>{`${count} ${name}`}</a>
      </Box>
    )

    return (
      <Popper
        trigger={fragment}
        position="bottom center"
        on="hover"
        hoverable
        open={this.state.isOpen}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
      >
        src={img_url}
      </Popper>
    )
  }
}

export default CardFragment
