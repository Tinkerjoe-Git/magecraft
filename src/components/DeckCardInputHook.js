import React, { Component, useState, useEffect } from 'react'
import { addCard } from '../actions/decks'
import {
  InputLabel,
  Icon,
  FormGroup,
  FormLabel,
  TextField,
  Input,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

function DeckCardInputHook() {
  const [cardData, setCardData] = useState({
    name: '',
    count: '',
  })

  function handleChange(event) {
    const name = event.target.name
    let value = event.target.value
    if (event.target.type === 'checkbox') {
      value = event.target.checked
    }

    setCardData({
      ...cardData,
      [name]: value,
    })
  }

  return (
    <div className="DeckCardInput">
      <FormGroup>
        <InputLabel htmlFor="name">Name</InputLabel>
        <FormLabel>
          <TextField
            id="name"
            name="name"
            value={cardData.name}
            onChange={handleChange}
            // onBlur={this.handleChange}
            // onMouseOver={this.handleMouseOver}
            // onMouseOut={this.handleMouseOver}
          />
        </FormLabel>
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="count">Count</InputLabel>
        <FormLabel>
          <Input
            id="count"
            name="count"
            type="number"
            value={cardData.count}
            onChange={handleChange}
            // onBlur={this.handleChange}
            // onMouseOver={this.handleMouseOver}
            // onMouseOut={this.handleMouseOver}
          />
        </FormLabel>
      </FormGroup>
      {/* <FormGroup> */}
      {/* <InputLabel htmlFor="removed">Removed</InputLabel>
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
      </FormGroup> */}
      {/* <Icon
        className={`DeckCardIcon ${mouseOver ? 'DeckCardIcon--mouseOver' : ''}`}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOver}
        onClick={this.handleRemove}
      >
        <i className="material-icons">delete_forever</i>
      </Icon> */}
    </div>
  )
}

export default DeckCardInputHook
