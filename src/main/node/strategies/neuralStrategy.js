const doCellFunction = (subFunction, history) => {
    // Check for out of bounds lookAtGuess. If out of bounds, use default guess
    if (subFunction.lookAtGuess >= history.length) {
        return subFunction.defaultGuess
    }

    const historyValue = history[subFunction.lookAtGuess]

    if (historyValue in subFunction.map) {
        if (typeof subFunction.map[historyValue] == 'object') {
            // If it's another subFunction, call again with the new subFunction
            return doCellFunction(subFunction.map[historyValue], history)
        } else {
            // If it's not a subFunction, it's an int, so return it
            return subFunction.map[historyValue]
        }
    } else {
        // History val doesn't map to anything in the subFunction. Default to zero
        return subFunction.defaultGuess
    }
}

const neuralStrategy = (game, cell) => {
    const guessHistory = game.guesses

    const result = doCellFunction(cell, guessHistory)

    return result
}

module.exports = neuralStrategy
