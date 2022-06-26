import React, { useState, useDispatch } from 'react'
import { addCard } from '../actions/deck'

function DeckCardInput(onAddItem) {
  const [name, setName] = useState('')
  const [count, setCount] = useState('Produce')
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(addCard(name, count))
  }

  function handleChange(event) {
    const { name, count } = event.target.value || {}
    setName(name)
    setCount(count)
  }

  return (
    <form className="DeckCardInput" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          htmlFor="name"
          id="name"
          type="checkbox"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </label>

      <label>
        count:
        <select
          name="count"
          htmlFor="count"
          value={count}
          type="number"
          onChange={handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  )
}

export default DeckCardInput
