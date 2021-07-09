import React from 'react'

const Deckcard2 = (props) => {
  const { id, name, img_url } = props
  return (
    <div>
      <h1>{name}</h1>
      <img src={img_url} width="300" height="300" alt="card" />
    </div>
  )
}
export default Deckcard2
