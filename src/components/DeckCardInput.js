import React, { Component } from 'react'
import {
  InputLabel,
  Icon,
  FormGroup,
  FormLabel,
  TextField,
  Input,
} from '@material-ui/core'

class DeckCardInput extends Component {
  state = {
    mouseOver: false,
    removed: false,
  }

  handleMouseOver = (event) => {
    this.setState({ mouseOver: true })
  }

  handleChange = (event) => {
    const { name, count, removed } = event.target.value || {}
    const { onChange } = this.props || {}
    const { onChange: onCardChange } = this.props.card || {}
    onChange && onChange(event)
    onCardChange && onCardChange(event)
  }

  handleRemove = (event) => {
    this.props.handleRemove(event, this.props.card)
    this.setState({ removed: true })
  }

  render() {
    console.log('DeckCard info', this.props)
    const { name, count, error } = this.props.card || {}
    const { mouseOver, removed } = this.state || {}
    return (
      <div className="DeckCardInput">
        <FormGroup>
          <InputLabel htmlFor="name">Name</InputLabel>
          <FormLabel>
            <TextField
              id="name"
              value={name}
              onChange={this.handleChange}
              onBlur={this.handleChange}
              onMouseOver={this.handleMouseOver}
              onMouseOut={this.handleMouseOver}
              error={error}
            />
          </FormLabel>
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="count">Count</InputLabel>
          <FormLabel>
            <Input
              id="count"
              type="number"
              value={count}
              onChange={this.handleChange}
              onBlur={this.handleChange}
              onMouseOver={this.handleMouseOver}
              onMouseOut={this.handleMouseOver}
              error={error}
            />
          </FormLabel>
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="removed">Removed</InputLabel>
          <FormLabel>
            <Input
              id="removed"
              type="checkbox"
              checked={removed}
              onChange={this.handleChange}
              onBlur={this.handleChange}
              onMouseOver={this.handleMouseOver}
              onMouseOut={this.handleMouseOver}
              error={error}
            />
          </FormLabel>
        </FormGroup>
        <Icon
          className={`DeckCardIcon ${
            mouseOver ? 'DeckCardIcon--mouseOver' : ''
          }`}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOver}
          onClick={this.handleRemove}
        >
          <i className="material-icons">delete_forever</i>
        </Icon>
      </div>
    )
  }
}

export default DeckCardInput
