import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import DeleteModal from './DeleteModal'
import { connect } from 'react-redux'
import { selectDeck, deleteDeck } from '../actions/decks'
import {
  Card,
  List,
  ListItem,
  FormLabel,
  CardHeader,
  ListItemText,
} from '@material-ui/core'
import { dateFormater } from '../globalFunctions'
import CardContent from '@material-ui/core/CardContent'

class DeckCard extends Component {
  state = {
    destroy: false,
    mouseOver: false,
  }

  handleMouseOver = () => {
    this.setState({
      mouseOver: !this.state.mouseOver,
    })
  }

  toggleDestroyModal = () => {
    this.setState({
      destroy: !this.state.destroy,
    })
  }

  handleClick = () => {
    this.props.selectDeck(
      this.props.deck,
      this.props.history,
      this.props.currentUser,
    )
  }

  handleDelete = () => {
    this.props.deleteDeck(
      this.props.deck.id,
      this.props.history,
      this.props.currentUser,
    )
  }

  render() {
    const { deck } = this.props
    const { mouseOver } = this.state
    const { name, userName, creator, formatName, createdDate } = this.props.deck

    return (
      <Card style={{ cursor: 'pointer' }} onMouseOver={this.handleMouseOver}>
        <CardHeader
          title={
            <ListItem
              button
              onClick={this.handleClick}
              onMouseEnter={this.handleMouseOver}
              onMouseLeave={this.handleMouseOver}
            >
              <ListItemText primary={name} />
            </ListItem>
          }
          subheader={
            <ListItemText
              primary={
                <span>
                  <FormLabel>{formatName}</FormLabel>
                  <FormLabel>
                    {userName}
                    {creator}
                  </FormLabel>
                  <FormLabel>{dateFormater(createdDate)}</FormLabel>
                </span>
              }
            />
          }
          action={
            <ListItem
              button
              onClick={this.toggleDestroyModal}
              onMouseEnter={this.handleMouseOver}
              onMouseLeave={this.handleMouseOver}
            >
              <ListItemText
                primary="Delete"
                onClick={this.handleDelete}
                style={{
                  color: '#FFF',
                  backgroundColor: '#F44336',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              />
            </ListItem>
          }
        />
        <CardContent>
          {deck.cards.map((card) => (
            <ListItem
              key={card.id}
              onClick={this.handleClick}
              onMouseEnter={this.handleMouseOver}
              onMouseLeave={this.handleMouseOver}
            >
              <ListItemText primary={card.name} />
            </ListItem>
          ))}
        </CardContent>
        {this.state.destroy && (
          <DeleteModal
            deck={deck}
            onDelete={this.handleDelete}
            onCancel={this.toggleDestroyModal}
          />
        )}
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  }
}

export default connect(mapStateToProps, { selectDeck, deleteDeck })(
  withRouter(DeckCard),
)
