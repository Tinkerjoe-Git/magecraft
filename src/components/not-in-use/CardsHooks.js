import uuid from 'uuid'
import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
//import { fetchCARDS } from './utils';

import {
  Container,
  Div,
  Card,
  Label,
  Icon,
  Button,
  Form,
  List,
} from '@material-ui/core'

export default function Cards() {
  const [cards, setCards] = useState([])
  const [checked, setChecked] = useEffect
  useEffect(() => {
    console.log('mounting cards')
    fetch('http://127.0.0.1:3000/cards').then((r) => r.json())
    return () => {
      console.log('unmounting cards')
      setCards([])
    }
  }, [])

  // const handleCardsChecked = e => {
  //     setChecked({ checked: e.target.value });
  // };
  // const handleCardsChecked = e => {
  //     setChecked({ checked: e.target.value });
  // };
  //     const handleCardsChecked = e => {
  //     setChecked({ checked: e.target.value });
  // };
}

// componentDidUpdate + componentDidMount
useEffect(() => {
  console.log('updating cards')
}, [cards])

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
