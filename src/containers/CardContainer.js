import React, { Component } from 'react'
import MtgCard from '../components/MtgCard'
import { v4 as uuidv4 } from 'uuidv4'
import { connect } from 'react-redux'
import withPusher from '../components/hocs/withPusher'
import { fetchCards } from '../actions/cards'
import { Container } from '@material-ui/core'

class CardContainer extends Component {
  componentDidMount() {
    this.props.fetchCards({ term: 'default' })
  }

  render() {
    const { pusherVisible, pusherType } = this.props
    const cards = this.props.results.map((card) => (
      <MtgCard
        key={uuidv4()}
        card={card.attributes}
        type={card.type}
        pusherVisible={pusherVisible}
        pusherType={pusherType}
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

export default connect(mapStateToProps, { fetchCards })(
  withPusher(CardContainer),
)
