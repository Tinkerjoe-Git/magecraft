import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'
import { connect } from 'react-redux'
import { fetchCARDS } from '../globalVars'
import { Container } from '@material-ui/core'
import Cards from '../components/Cards2'

export default function CardContainer() {
  return (
    <Container>
      cards=
      {this.props.cards.map((card) => (
        <Cards key={card.id} card={card} />
      ))}
    </Container>
  )
}
