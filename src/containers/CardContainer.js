import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'
import { connect } from 'react-redux'
import { fetchCARDS } from '../globalVars'
import { Container } from '@material-ui/core'
import Cards from '../components/Cards2'

class CardContainer extends Component {
  componentDidMount() {
    this.props.fetchCARDS({ term: 'default' }, this.props.history)
    console.log('Cards Mount')
  }

  render() {
    const cards = this.props.cards.map((card) => (
      <Cards
        key={card.id}
        //key={uuidv4()}
        // id={card.id}
        name={card.name}
        img={card.image_url}
        text={card.text}
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

export default connect(mapStateToProps, { fetchCARDS })(CardContainer)
