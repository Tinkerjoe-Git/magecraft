import React, { Component } from 'react'
//import uuid from 'uuid'
import CardFragment from './CardFragment'
import DeckCardInput from './DeckCardInput'
import { capitalizeFirstLetter } from '../globalFunctions'
import { Box, FormLabel } from '@material-ui/core'

class FragmentList extends Component {
  state = {
    cards: this.props.cards,
  }

  addInput = () => {
    this.setState({
      cards: [
        ...this.state.cards,
        {
          key: Object.id,
          name: '',
          count: '',
          sideboard: this.props.board === 'sideboard' ? true : false,
        },
      ],
    })
  }

  handleRemove = (event, cardRef) => {
    this.props.handleRemoveEdit(event, cardRef)
    this.setState({
      cards: this.state.cards.filter((card) => card.key !== cardRef.key),
    })
  }

  render() {
    const {
      type,
      board,
      editing,
      // totalsideboard
    } = this.props
    const FragmentHeader = capitalizeFirstLetter(type)
    let cardFragments = null
    if (editing) {
      cardFragments = this.props.cards.map((card, index) => {
        return (
          <DeckCardInput
            removeInput={this.props.removeInput}
            handleCardChange={this.props.handleCardChange}
            handleRemove={this.handleRemove}
            handleChange={this.props.handleChange}
            key={index}
            editing={editing}
            card={card}
          />
        )
      })
    } else {
      cardFragments = this.props.cards.map((card) => (
        <CardFragment key={card.id} card={card} board={board} />
      ))
    }

    return (
      <React.Fragment className="deck-list-group" compact>
        {this.props.editing && (
          <FormLabel
            as="a"
            onClick={this.props.appendInput}
            name={type}
            attached="top"
          >
            Add
          </FormLabel>
        )}
        {type && <Box as={FragmentHeader}></Box>}

        {cardFragments}
      </React.Fragment>
    )
  }
}

export default FragmentList
