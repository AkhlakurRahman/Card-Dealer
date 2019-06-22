import React, { Component } from 'react';

import classes from './Card.module.css';

class Card extends Component {
  angle = Math.random() * 90 - 45;
  xPos = Math.random() * 40 - 20;
  yPos = Math.random() * 40 - 20;
  transform = `translate(${this.xPos}px, ${this.yPos}px) rotate(${
    this.angle
  }deg)`;

  render() {
    return (
      <img
        style={{ transform: this.transform }}
        className={classes.Card}
        src={this.props.image}
        alt={this.props.name}
      />
    );
  }
}

export default Card;
