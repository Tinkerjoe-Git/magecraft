import React, { Component } from 'react'
import MtgCard from '../components/MtgCard'
import { v4 as uuidv4 } from 'uuidv4'
import { connect } from 'react-redux'
import { fetchCards } from '../actions/cards'
import { Container } from '@material-ui/core'

class CardContainer extends Component {
  componentDidMount() {
    this.props.fetchCards({ term: 'default' })
  }

  render() {
    const cards = this.props.results.map((card) => (
      <MtgCard
        key={uuidv4()}
        card={card.attributes}
        name={card.name}
        type={card.type}
        img={card.image_url}
        text={card.text}
      />
    ))

    return <Container>{cards}</Container>
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
