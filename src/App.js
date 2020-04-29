import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'
import './App.css'
import GuessCount from './GuessCount'
import Card from './Card'
import HallOfFame from './HallOfFame'
import HighScoreInput from './HighScoreInput'

const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_PAUSE_MS = 750

class App extends Component {
  state = {
    cards: this.generateCards(),
    currentPair: [],
    guesses: 0,
    hallOfFame: null,
    matchedCardIndices: [],
  }

  // arrow fx for binding
  displayHallOfFame = (hallOfFame) => {
    this.setState({ hallOfFame })
  }
  
  generateCards() {
    const result = []
    const size = SIDE * SIDE
    const candidates = shuffle(SYMBOLS)
    while (result.length < size) {
      const card = candidates.pop()
      result.push(card, card)
    }
    return shuffle(result)
  }
  
  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state
    const indexMatched = matchedCardIndices.includes(index)
  
    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
    }
    
    // currentPair.length === 2
    if (currentPair.includes(index)) {
      return indexMatched ? 'justMatched' : 'justMismatched'
    }
  
    // currentPair does not include index
    return indexMatched ? 'visible' : 'hidden'
  }
  
  handleNewPairClosedBy = (index) => {
    const { cards, currentPair, guesses, matchedCardIndices } = this.state
    const newPair = [currentPair[0], index]
    const newGuesses = guesses + 1
    const matched = cards[currentPair[0]] === cards[index]
    this.setState({ currentPair: newPair,guesses: newGuesses })
    if (matched) {
      this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair] })
    }
    setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MS)
  }
  
  // Arrow fx for binding to "this"
  handleCardClick = index => {
    const { currentPair } = this.state
    if (currentPair.length === 2) {
      return
    }
    if (currentPair.length === 0) {
      this.setState({ currentPair: [index]})
      return
    }
    this.handleNewPairClosedBy(index)
  }

  render() {
    const { cards, guesses, hallOfFame, matchedCardIndices } = this.state
    // temporary
    const won = matchedCardIndices.length === 2   // cards.length
    return (
      <div className="memory">
        <GuessCount guesses={guesses} />
        {cards.map((card, index) => (
          <Card 
            card={card}
            feedback={this.getFeedbackForCard(index)}
            key={index}
            index={index}
            onClick={this.handleCardClick}
          />
        ))}
        {
          won &&
            (hallOfFame ? (
              <HallOfFame entries={hallOfFame}/>
            ) : (
              <HighScoreInput guesses={guesses} onStored={this.displayHallOfFame}/>
            ))
        }

      </div>
    )
  }
}

export default App
