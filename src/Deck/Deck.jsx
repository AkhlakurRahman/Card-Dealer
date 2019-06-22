import React, { Component } from 'react';
import axios from 'axios';

import Card from './Card';
import classes from './Deck.module.css';

export default class Deck extends Component {
  state = {
    card: '',
    drawn: []
  };

  async componentDidMount() {
    const deck = await axios.get(
      'https://deckofcardsapi.com/api/deck/new/shuffle/'
    );
    this.setState({ card: deck.data });
  }

  getCard = async () => {
    const deck_id = this.state.card.deck_id;
    try {
      const cardResponse = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck_id}/draw/`
      );
      if (!cardResponse.data.success) {
        throw new Error('You have deal all card');
      }
      const drawnCard = cardResponse.data.cards[0];
      this.setState(prevState => ({
        drawn: [
          ...prevState.drawn,
          {
            id: drawnCard.code,
            image: drawnCard.image,
            name: `${drawnCard.value} ${drawnCard.suit}`
          }
        ]
      }));
    } catch (error) {
      alert(error);
    }
  };

  render() {
    const card = this.state.drawn.map(card => (
      <Card key={card.id} image={card.image} name={card.name} />
    ));
    return (
      <div className={classes.Deck}>
        <h1>Card Dealer</h1>
        <button onClick={this.getCard}>Get Card!</button>
        <div className={classes.Deck_Card}>{card}</div>
      </div>
    );
  }
}
