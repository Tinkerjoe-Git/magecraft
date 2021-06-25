import React, { Component } from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { selectCard } from '../actions/cards'

import { Card, List, Label, Button, Icon, Form } from '@material-ui/core'

class MagicCard extends Component {
  state = {
    mouseOver: false,
    infoView: false,
    card: {},
    key: uuid(),
  }

  handleAdd = (event) => {
    const sideboard = event.target.name === 'sideboard'
    this.props.selectCard(this.props.card, sideboard, event.target.name)
  }

  componentDidMount() {
    if (this.props.type === 'collection_card') {
      this.setState({ collectionView: true, card: this.props.card })
    }
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
    const {
      // id,
      name,
      // cmc,
      // mana_cost,
      // rarity,
      // power,
      // toughness,
      // text,
      imgUrl,
      count,
      condition,
      setName,
      premium,
      wishlist,
    } = this.props.card

    const { mouseOver, showInfo, key } = this.state
    const { pusherVisible, pusherType } = this.props
    {
      return (
        <Card
          className="magic-card"
          onMouseEnter={this.handleMouseOver}
          onMouseLeave={this.handleMouseOver}
        >
          <div className="ui image">
            <img src={imgUrl} alt={name} />
            {pusherVisible && pusherType === 'createDeck' && mouseOver && (
              <Label
                as="a"
                onClick={this.handleAdd}
                name="mainboard"
                color="black"
                attached="top left"
                content="MB"
              />
            )}

            {pusherVisible && pusherType === 'createDeck' && mouseOver && (
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
