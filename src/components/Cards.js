import React, { Component, useState, useEffect } from 'react'

import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import { withRouter } from 'react-router-dom'

import { connect, useSelector, useDispatch } from 'react-redux'
import { selectDeck, deleteDeck } from '../actions/decks'

import { fetchCARDS } from '../globalVars'
import { setCards } from '../reducers/cardSlice'

function Cards() {
  const cards = useSelector((state) => state.cards)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('mounting cards')
    fetchCARDS('cards').then((data) => dispatch(setCards(data)))
    return () => {
      console.log('done')
    }
  }, [])

  return (
    <div>
      <h1>All Cards</h1>
      <ul>
        {cards.map((c, i) => (
          <li key={i}>{c.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Cards
