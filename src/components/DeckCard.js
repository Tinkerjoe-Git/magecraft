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
    const {
      name,
      userName,
      creator,
      updatedAt,
      formatName,
      // id,
    } = this.props.deck
    return (
      <Card
        className="magic-card"
        onMouseEnter={this.handleMouseOver}
        onMouseLeave={this.handleMouseOver}
      >
        <CardContent>
          <CardHeader
            as="a"
            floated="center"
            onClick={this.handleClick}
            className="white-text"
          >
            {name}
          </CardHeader>
          <CardHeader className="white-text">
            <i>{userName === 'admin' ? creator : userName}</i>
          </CardHeader>
          <List>
            <ListItem>
              <ListItemText className="white-text">Format</ListItemText>
              {formatName}
            </ListItem>
          </List>
        </CardContent>
        <CardContent extra className="white-text">
          {dateFormater(updatedAt)}
          {this.props.match.path === '/:username/decks' &&
            this.state.mouseOver && (
              <FormLabel
                as="a"
                name="delete"
                onClick={this.toggleDestroyModal}
                attached="top right"
                icon="delete"
              />
            )}
        </CardContent>
        <DeleteModal
          open={this.state.destroy}
          handleDelete={this.handleDelete}
          toggle={this.toggleDestroyModal}
          type="deck"
        />
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
