/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuidv4'
import { connect } from 'react-redux'
import { selectCard } from '../actions/cards'

import { Card, List, Label, Button, Icon, Modal, Form } from 'semantic-ui-react'

class MagicCard extends Component {
  state = {
    mouseOver: false,
    infoView: false,
    card: {},
    key: uuidv4(),
  }

  handleAdd = (event) => {
    const sideboard = event.target.name === 'sideboard'
    this.props.selectCard(this.props.card, sideboard, event.target.name)
  }

  componentDidMount() {
    console.log('Updated')
  }

  handleMouseOver = (event) => {
    this.setState({
      mouseOver: !this.state.mouseOver,
    })
  }

  showInfo = (event) => {
    this.setState({
      showInfo: !this.state.showInfo,
    })
  }

  handleCardChange = (event) => {
    const { name, value, checked } = event.target
    this.setState({
      card: {
        ...this.state.card,
        [name]: checked ? checked : value,
      },
    })
  }

  handleFieldsChange = (event, { id, value }) => {
    this.setState({
      card: {
        ...this.state.card,
        [id]: value,
      },
    })
  }

  render() {
    const { id, name, cmc, mana_cost, rarity, power, toughness, text, imgUrl } =
      this.props.card

    const { mouseOver, showInfo, key } = this.state
    {
      return (
        <Card
          className="magic-card"
          onMouseEnter={this.handleMouseOver}
          onMouseLeave={this.handleMouseOver}
        >
          <div className="ui image">
            <img src={imgUrl} alt={name} />
            {'createDeck' && mouseOver && (
              <Label
                as="a"
                onClick={this.handleAdd}
                name="mainboard"
                color="black"
                attached="top left"
                content="MB"
              />
            )}

            {'createDeck' && mouseOver && (
              <Label
                as="a"
                onClick={this.handleAdd}
                name="sideboard"
                color="grey"
                attached="top right"
                content="SB"
              />
            )}
          </div>
        </Card>
      )
    }
  }
}
export default connect(null, {
  selectCard,
})(MagicCard)
