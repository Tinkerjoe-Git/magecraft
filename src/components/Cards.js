import React, { useState, useEffect } from 'react';
//import { fetchCARDS } from './utils';
import { Container } from '@material-ui/core';

export default function Cards() {
    const [cards, setCards] = useState([])
        useEffect(() => {
        console.log("mounting cards")
       fetch('http://127.0.0.1:3000/cards')
            .then(r => r.json())
        return () => {
            console.log("unmounting cards")
            setCards([])
        }
    }, [])

    // componentDidUpdate + componentDidMount
    useEffect(() => {
        console.log("updating cards")
    }, [cards])

    return (
        <Container>
            <div>
                <h1>All Cards</h1>
                <ul>
                    {cards.map((c, i) => <li key={i}>{c.name}</li>)}
                </ul>
            </div>
        </Container>
    );
}
 
