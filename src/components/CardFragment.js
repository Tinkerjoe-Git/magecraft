import React, { Component } from 'react'
import { Fragment, Popover, Image } from '@material-ui/core'

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
      <Fragment>
        <a>{`${count} ${name}`}</a>
      </Fragment>
    )

    return (
      <Popover
        trigger={fragment}
        position="bottom center"
        on="hover"
        hoverable
        open={this.state.isOpen}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
      >
        <Image src={img_url} />
      </Popover>
    )
  }
}

export default CardFragment
