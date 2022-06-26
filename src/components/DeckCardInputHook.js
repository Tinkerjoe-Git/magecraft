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

function DeckCardInputHook(props) {
  const dispatch = useDispatch()
  const { name, setName } = useState('')
  const { count, setCount } = useState(0)
  const { error, setError } = useState(false)
  const { mouseOver, setMouseOver } = useState(false)
  const { removed, setRemoved } = useState(false)

  function handleChange(event) {
    const { name, count } = event.target.value || {}
    setName(name)
    setCount(count)
  }

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <div className="deck-card-input">
      <FormGroup>
        <FormLabel>
          <InputLabel>
            <Icon onClick={handleChange}>add</Icon>
            Add Card
          </InputLabel>
        </FormLabel>
        <Input
          name="name"
          value={name}
          onChange={handleChange}
          onSubmit={handleSubmit}
          error={error}
        />
        <InputLabel
          className="deck-card-input-count-label"
          error={error}
          disabled={removed}
        >
          Count
        </InputLabel>
        <TextField
          name="count"
          value={count}
          onChange={handleChange}
          onSubmit={handleSubmit}
          error={error}
        />
        <Icon
          className="deck-card-input-remove-icon"
          onClick={() => setRemoved(true)}
        >
          remove
        </Icon>
      </FormGroup>
    </div>
  )
}

export default DeckCardInputHook
