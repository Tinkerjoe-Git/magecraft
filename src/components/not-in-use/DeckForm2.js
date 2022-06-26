import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'
import DeckCardInput from '../DeckCardInput'
import { connect } from 'react-redux'
import { sortCardsIntoBoards } from '../../globalFunctions'
import { Button, Container, Checkbox, Divider } from '@material-ui/core'
import { createDeck } from '../../actions/decks'
import { clearCard } from '../../actions/cards'
import { withRouter } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
import {
  InputLabel,
  IconButton,
  FormGroup,
  FormLabel,
  TextField,
  Input,
  Select,
} from '@material-ui/core'
import { Cards } from '../Cards2'

export default function DeckForm() {
  const [inputs, setInputs] = React.useState({})
  const [error, setError] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)
  const [isValid, setIsValid] = React.useState(true)
  const [selectedBoard, setSelectedBoard] = React.useState('')
  const [selectedCard, setSelectedCard] = React.useState('')
  const [selectedDeck, setSelectedDeck] = React.useState('')
  const [selectedCardId, setSelectedCardId] = React.useState('')
  const [selectedCardName, setSelectedCardName] = React.useState('')
  const [selectedCardSet, setSelectedCardSet] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const newDeck = {
      id: uuid(),
      name: inputs.name.value,
      description: inputs.description.value,
      cards: [],
      boardId: selectedBoard,
    }
    const { boards, cards } = sortCardsIntoBoards(inputs.cards.value)
    if (boards.length > 0) {
      newDeck.cards = boards.map((b) => b.cards)
    } else {
      newDeck.cards = cards
    }
    setSelectedDeck(newDeck)
    setIsValid(true)
    setIsLoading(false)
    setSelectedBoard('')
    setSelectedCard('')
    setSelectedCardId('')
    setSelectedCardName('')
    setSelectedCardSet('')
    setInputs({})
    setError('')
  }

  const handleChange = (e) => {
    const { target } = e
    const name = target.name
    const value = target.value
    if (name === 'name' && value.length > 0) {
      setSelectedDeck(null)
      setSelectedBoard('')
      setSelectedCard('')
      setSelectedCardId('')
      setSelectedCardName('')
      setSelectedCardSet('')
    }
    setInputs({ ...inputs, [name]: value })
  }
  const handleChangeCard = (e) => {
    const { target } = e
    const name = target.name
    const value = target.value
    if (name === 'name' && value.length > 0) {
      setSelectedDeck(null)
      setSelectedBoard('')
      setSelectedCard('')
      setSelectedCardId('')
      setSelectedCardName('')
      setSelectedCardSet('')
    }
    setInputs({ ...inputs, [name]: value })
  }
  const handleChangeBoard = (e) => {
    const { target } = e
    const name = target.name
    const value = target.value
    if (name === 'name' && value.length > 0) {
      setSelectedDeck(null)
      setSelectedBoard('')
      setSelectedCard('')
      setSelectedCardId('')
      setSelectedCardName('')
      setSelectedCardSet('')
    }
    setInputs({ ...inputs, [name]: value })
  }
  const handleChangeCardSet = (e) => {
    const { target } = e
    const name = target.name
    const value = target.value
    if (name === 'name' && value.length > 0) {
      setSelectedDeck(null)
      setSelectedBoard('')
      setSelectedCard('')
      setSelectedCardId('')
      setSelectedCardName('')
      setSelectedCardSet('')
    }
    setInputs({ ...inputs, [name]: value })
  }

  const handleCardSelection = (e, cardId) => {
    setSelectedCardId(cardId)
    setSelectedCardName(e.name)
    setSelectedCardSet(e.set)
  }

  const handleBoardSelection = (e, boardId) => {
    setSelectedBoard(boardId)
  }

  const handleDeckSelection = (e, deckId) => {
    setSelectedDeck(decks.find((d) => d.id === deckId))
  }
  const handleClear = () => {
    setSelectedDeck(null)
    setSelectedBoard('')
    setSelectedCard('')
    setSelectedCardId('')
    setSelectedCardName('')
    setSelectedCardSet('')
    setInputs({})
    setError('')
  }

  const handleSubmitDeck = (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (selectedDeck) {
      if (isValid) {
        const { boards, cards } = sortCardsIntoBoards(inputs.cards.value)
        selectedDeck.cards = cards
        selectedDeck.boards = boards
        setSelectedDeck(selectedDeck)
        setIsValid(true)
        setIsLoading(false)
        setSelectedBoard('')
        setSelectedCard('')
        setSelectedCardId('')
        setSelectedCardName('')
        setSelectedCardSet('')
        setInputs({})
        setError('')
      } else {
        setIsValid(false)
        setIsLoading(false)
        setError('Please correct the errors below')
      }
    } else {
      setIsValid(false)
      setIsLoading(false)
      setError('Please select a deck to add the cards to')
    }
  }

  const handleSubmitCard = (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (selectedDeck) {
      if (selectedCard) {
        const { boards, cards } = sortCardsIntoBoards(inputs.cards.value)
        const newCard = {
          id: uuid(),
          name: selectedCardName,
          set: selectedCardSet,
          description: '',
          boardId: selectedBoard,
        }
        selectedDeck.cards.push(newCard)
        selectedDeck.boards = boards
        setSelectedDeck(selectedDeck)
        setIsValid(true)
        setIsLoading(false)
        setSelectedBoard('')
        setSelectedCard('')
        setSelectedCardId('')
        setSelectedCardName('')
        setSelectedCardSet('')
        setInputs({})
        setError('')
      } else {
        setIsValid(false)
        setIsLoading(false)
        setError('Please select a card to add')
      }
    } else {
      setIsValid(false)
      setIsLoading(false)
      setError('Please select a deck to add the cards to')
    }
  }

  const handleSubmitBoard = (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (selectedDeck) {
      if (selectedBoard) {
        const { boards, cards } = sortCardsIntoBoards(inputs.cards.value)
        const newBoard = {
          id: uuid(),
          name: selectedBoardName,
          description: '',
          cards: [],
        }
        selectedDeck.boards.push(newBoard)
        selectedDeck.boards = boards
        setSelectedDeck(selectedDeck)
        setIsValid(true)
        setIsLoading(false)
        setSelectedBoard('')
        setSelectedCard('')
        setSelectedCardId('')
        setSelectedCardName('')
        setSelectedCardSet('')
        setInputs({})
        setError('')
      } else {
        setIsValid(false)
        setIsLoading(false)
        setError('Please select a board to add the cards to')
      }
    } else {
      setIsValid(false)
      setIsLoading(false)
      setError('Please select a deck to add the cards to')
    }
  }

  return (
    <div className="add-cards">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Deck Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            placeholder="Deck Name"
            onChange={handleChange}
            value={inputs.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cards">Cards</label>
          <textarea
            className="form-control"
            name="cards"
            id="cards"
            placeholder="Cards"
            onChange={handleChangeCard}
            value={inputs.cards}
          />
        </div>
        <div className="form-group">
          <label htmlFor="boards">Boards</label>
          <textarea
            className="form-control"
            name="boards"
            id="boards"
            placeholder="Boards"
            onChange={handleChangeBoard}
            value={inputs.boards}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardset">Card Set</label>
          <select
            className="form-control"
            name="cardset"
            id="cardset"
            onChange={handleChangeCardSet}
            value={inputs.cardset}
          >
            {cardSets.map((set) => (
              <option key={set.id} value={set.id}>
                {set.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!isValid}>
          Submit
        </button>
        <button type="button" className="btn btn-danger" onClick={handleClear}>
          Clear
        </button>
      </form>
    </div>
  )
}
