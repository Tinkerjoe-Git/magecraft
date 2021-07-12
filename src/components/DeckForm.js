import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'
import DeckCardInput from './DeckCardInput'
import { connect } from 'react-redux'
import { sortCardsIntoBoards } from '../globalFunctions'
import { Button, Container, Checkbox, Divider } from '@material-ui/core'
import { createDeck } from '../actions/decks'
import { clearCard } from '../actions/cards'
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

class DeckForm extends Component {
  state = {
    fields: {
      name: '',
      format: '',
      cards: {
        mainboard: [{ key: uuid(), name: '', count: '', error: false }],
        sideboard: [{ key: uuid(), name: '', count: '', error: false }],
      },
    },
    text: false,
    validation: {
      error: false,
      message: '',
    },
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      Object.keys(nextProps.selectedCard).length &&
      (nextProps.selectedCard.type === 'mainboard' ||
        nextProps.selectedCard.type === 'sideboard')
    ) {
      this.addCard(nextProps.selectedCard)
    }

    if (nextProps.deckError) {
      const mainboardCopy = this.state.fields.cards.mainboard.map((card) => {
        if (nextProps.deckErrorRes.keys.mainboard.includes(card.key)) {
          card.error = true
        }
        return card
      })
      const sideboardCopy = this.state.fields.cards.sideboard.map((card) => {
        if (nextProps.deckErrorRes.keys.sideboard.includes(card.key)) {
          card.error = true
        }
        return card
      })

      this.setState(
        {
          validation: {
            error: true,
            message: nextProps.deckErrorRes.message,
          },
          fields: {
            ...this.state.fields,
            cards: {
              mainboard: mainboardCopy,
              sideboard: sideboardCopy,
            },
          },
        },
        () => console.log(this.state.fields.cards),
      )
    }
  }

  addCard = (addedCard) => {
    const board = this.state.fields.cards[addedCard.type]
    let updated = false
    const newCards = board.map((stateCard, index) => {
      const names = board.map((card) => card.name)
      if (
        stateCard.name.toLowerCase() === addedCard.attributes.name.toLowerCase()
      ) {
        ++stateCard.count
        updated = true
        return stateCard
      } else if (
        !stateCard.name &&
        !names.includes(addedCard.attributes.name)
      ) {
        updated = true
        stateCard.name = addedCard.attributes.name
        stateCard.count = 1
        return stateCard
      }

      return stateCard
    })

    if (!updated) {
      newCards.push({
        key: uuid(),
        name: addedCard.attributes.name,
        count: 1,
        error: false,
      })
    }

    this.setState({
      fields: {
        ...this.state.fields,
        cards: {
          ...this.state.fields.cards,
          [addedCard.type]: newCards,
        },
      },
    })
  }

  appendInput = (event, { name }) => {
    if (!this.state.text) {
      this.setState({
        fields: {
          ...this.state.fields,
          cards: {
            ...this.state.fields.cards,
            [name]: this.state.fields.cards[name].map((card) => ({
              ...card,
              name: '',
              count: '',
              error: false,
            })),
          },
        },
        text: true,
      })
    }
  }

  removeInput = (event, { id, name }) => {
    if (this.state.text) {
      this.setState({
        fields: {
          ...this.state.fields,
          cards: {
            ...this.state.fields.cards,
            [name]: this.state.fields.cards[name].filter(
              (card) => card.key !== id,
            ),
          },
        },
        text: false,
      })
    }
  }

  handleChange = (event, { name, value, checked }) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: checked ? checked : value,
      },
    })
  }

  handleCardChange = (event) => {
    const { name, id, value } = event.target
    const position = event.target.dataset.position
    const copy = this.state.fields.cards[id].map((card, index) => {
      if (index === parseInt(position, 10)) {
        card[name] = value
      }
      return card
    })
    this.setState(
      {
        fields: {
          ...this.state.fields,
          cards: {
            ...this.state.fields.cards,
            [id]: copy,
          },
        },
      },
      () => console.log(this.state.fields.cards),
    )
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { name, format } = this.state.fields
    if (name && format) {
      this.props.createDeck(this.state.fields, this.props.history)
      this.setState({ validation: { error: false, message: '' } })
    } else {
      const message = `Name and format required for submission `
      this.setState({ validation: { error: true, message } })
    }
  }

  render() {
    const { error, message } = this.state.validation
    const mainboard = this.state.fields.cards.mainboard.map((input, index) => {
      return (
        <DeckCardInput
          index={index}
          card={input}
          key={input.key}
          handleCardChange={this.handleCardChange}
          removeInput={this.removeInput}
          board="mainboard"
        />
      )
    })
    const sideboard = this.state.fields.cards.sideboard.map((input, index) => {
      return (
        <DeckCardInput
          index={index}
          card={input}
          key={input.key}
          handleCardChange={this.handleCardChange}
          removeInput={this.removeInput}
          board="sideboard"
        />
      )
    })

    const { name, archtype, format } = this.state.fields
    const { formats } = this.props

    return (
      <Container>
        <Alert
          color="error"
          message={message}
          onDismiss={() =>
            this.setState({ validation: { error: false, message: '' } })
          }
          showIcon
          style={{ width: '100%' }}
        />
        <FormGroup onSubmit={this.handleSubmit}>
          <FormLabel>Deck Name</FormLabel>
          <InputLabel>
            <TextField
              onChange={this.handleChange}
              id="name"
              defaultValue={name}
              width={9}
            />
          </InputLabel>
        </FormGroup>
        <FormGroup>
          <FormLabel>Deck Format</FormLabel>
          <Select
            onChange={this.handleChange}
            options={formats}
            placeholder="Search format"
            search
            selection
            value={format}
            name="format"
          ></Select>
        </FormGroup>
        <FormGroup>
          <FormLabel>Mainboard</FormLabel>
          {mainboard}
          <IconButton onClick={this.appendInput} name="mainboard">
            Add Card
          </IconButton>
          <Divider />
          <FormLabel>Sideboard</FormLabel>
          {sideboard}
          <IconButton onClick={this.appendInput} name="sideboard">
            Add Card
          </IconButton>
          <Divider />
        </FormGroup>
        <Button color="primary" onClick={this.handleSubmit}>
          Create Deck
        </Button>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    formats: state.decks.formats.map((format) => {
      return { text: format.name, value: format.name }
    }),
    userId: state.auth.currentUser.id,
    selectedCard: state.cards.selected,
    deckError: state.decks.errorStatus,
    deckErrorRes: state.decks.error,
  }
}

export default connect(mapStateToProps, { createDeck, clearCard })(
  withRouter(DeckForm),
)
