import React, { Component } from 'react'
import { Label, Icon, FormGroup, FormLabel, TextField } from '@material-ui/core'

class DeckCardInput extends Component {
  state = {
    mouseOver: false,
    removed: false,
  }

  handleRemove = (event) => {
    this.props.handleRemove(event, this.props.card)
  }

  render() {
    const { index, board, editing } = this.props
    const { error, key, name, count, card_id } = this.props.card
    if (this.state.removed && name.length) {
      return (
        <React.Fragment>
          <FormLabel
            color="primary"
            size="small"
            as="a"
            onClick={this.handleRemove}
            id={board}
            name={index}
          >
            restore
          </FormLabel>
          {`${count} ${name}`} removed
        </React.Fragment>
      )
    } else {
      return (
        <FormGroup as={editing ? null : React.Fragment}>
          {!editing && (
            <FormLabel
              color="red"
              size="small"
              as="a"
              corner="left"
              onClick={this.props.removeInput}
              id={key}
              name="remove"
            >
              <Icon name="remove" size="large" />
            </FormLabel>
          )}

          <TextField
            type="text"
            disabled={!!card_id}
            error={error}
            placeholder="Card name"
            value={name}
            name="name"
            id={key}
            className={editing ? 'name-input-deck-show' : 'name-input'}
            onChange={this.props.handleCardChange}
          />
          <TextField
            type="number"
            placeholder="N"
            value={count}
            name="count"
            id={key}
            className={editing ? 'number-input-deck-show' : 'number-input'}
            onChange={this.props.handleCardChange}
          />

          {editing && (
            <Icon
              name="remove"
              id={key}
              corner
              fitted
              onClick={this.props.removeInput}
            />
          )}
        </FormGroup>
      )
    }
  }
}

export default DeckCardInput
