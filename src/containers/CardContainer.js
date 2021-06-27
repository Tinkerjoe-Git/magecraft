import React, { Component } from 'react'
import MtgCard from '../components/MtgCard'
// import { v4 as uuidv4 } from 'uuidv4'
import { connect } from 'react-redux'
import { fetchCards } from '../actions/cards'
import { Container } from '@material-ui/core'
import DeckCard2 from '../components/DeckCard2'

class CardContainer extends Component {
  componentDidMount() {
    this.props.fetchCards({ term: 'default' })
  }

  render() {
    const cards = this.props.results.map((card) => (
      <DeckCard2
        key={card.id}
        //key={uuidv4()}
        id={card.id}
        name={card.name}
        img={card.image_url}
        text={card.text}
        cmc={card.cmc}
        type={card.card_type}
        colors={card.colors}
      />
    ))

    return <div id="card-container">{cards}</div>
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.cards.results,
    loading: state.cards.loading,
    loggedIn: !!state.auth.currentUser.id,
  }
}

export default connect(mapStateToProps, { fetchCards })(CardContainer)
