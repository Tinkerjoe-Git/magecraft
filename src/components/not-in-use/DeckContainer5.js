import React, { useState, useEffect } from 'react'
import DeckCard from './DeckCard5'
import { useDispatch, useSelector } from 'react-redux'
import { getDecks } from '../../actions/decks5'

const DeckContainer5 = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDecks())
  }, [dispatch])
  const deckcards = useSelector((state) => state.decks)
  console.log('this is deck' + deckcards)
  return <div>Deck</div>
}
export default DeckContainer5
