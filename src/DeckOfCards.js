import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import { v4 as uuid } from "uuid";
import axios from "axios";
import "./DeckOfCards.css";

const BASE_URL = "http://deckofcardsapi.com/api/deck";

const DeckOfCards = () => {
  const deckId = useRef();
  const [cards, setCards] = useState([]);

  const addCard = (newCard) => {
    setCards((cards) => [...cards, { ...newCard, id: uuid() }]);
  };

  useEffect(() => {
    async function shuffleDeck() {
      const res = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
      deckId.current = res.data.deck_id;
    }
    shuffleDeck();
  }, []);

  async function drawCard() {
    const res = await axios.get(`${BASE_URL}/${deckId.current}/draw/?count=1`);
    addCard({ image: `${res.data.cards[0].image}`, id: uuid() });
    if (res.data.remaining === 0) {
      alert("Error: no cards remaining!");
    }
  }

  return (
    <div className="DeckOfCards">
      <button onClick={drawCard}>GIMME A CARD!</button>
      <div>
        {cards.map(({ image, id }) => (
          <Card image={image} id={id} key={id} />
        ))}
      </div>
    </div>
  );
};

export default DeckOfCards;
