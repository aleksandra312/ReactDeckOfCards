import React, { useState, useEffect } from "react";
import Card from "./Card";
import { v4 as uuid } from "uuid";
import axios from "axios";

const DeckOfCards = () => {
  const [cards, setCards] = useState([]);

  const addCard = (newCard) => {
    setCards((cards) => [...cards, { ...newCard, id: uuid() }]);
  };

  async function drawCard() {
    const res = await axios.get(
      "http://deckofcardsapi.com/api/deck/swr2iokx9s2f/draw/?count=1"
    );

    const cardImg = res.data.cards[0].image;
    addCard({ image: `${cardImg}`, id: uuid() });
  }

  return (
    <div>
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
