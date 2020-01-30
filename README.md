## 4 Doors

Top performer
```json
{
  "defaultGuess": 1,
  "lookAtGuess": 0,
  "map": {
    "1": {
      "defaultGuess": 2,
      "lookAtGuess": 2,
      "map": {
        "2": {
          "defaultGuess": 1,
          "lookAtGuess": 3,
          "map": {}
        }
      }
    }
  },
  "fitness": 9.51934,
  "successPercent": 1,
  "averageGuesses": 2.4033
}
```
Constants

```js
module.exports = {
    BATTLE_UPSET_RATE: 10,
    MAX_GUESSES: 5,
    MUTATION_RATE: 10,
    NUM_CELLS: 100000,
    NUM_GAMES: 10000,
    NUM_GENERATIONS: 50,
    NUM_ROOMS: 4,
    NUM_WORKERS: 6,
    SUCCESS_PERCENT_FACTOR: 9
}
```
