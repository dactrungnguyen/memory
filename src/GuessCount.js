import React from 'react'
import PropTypes from 'prop-types'

import './GuessCount.css'

const GuessCount = ({ guesses }) => <div className="guesses">Guess count: {guesses}</div>

GuessCount.propTypes = {
    guesses: PropTypes.number.isRequired
}

export default GuessCount
