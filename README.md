```
module.exports = {
    MAX_GUESSES: 10,
    MUTATION_RATE: 10,
    NUM_CELLS: 10000,
    NUM_GAMES: 1000,
    NUM_GENERATIONS: 20,
    NUM_ROOMS: 4,
}

{
  "defaultGuess": 1,
  "lookAtGuess": 2,
  "map": {
    "1": 2
  },
  "fitness": 750.3422
},

```

0 - 3
1 - 3
2 - 1
3 - 1
4 - 3
5 - 3
6 - 1
7 - 1
8 - 1
9 - 1

{
  "defaultGuess": 3,
  "lookAtGuess": 1,
  "map": {
    "0": {
      "defaultGuess": 1,
      "lookAtGuess": 7,
      "map": {}
    },
    "3": {
      "defaultGuess": 1,
      "lookAtGuess": 3,
      "map": {
        "0": {
          "defaultGuess": 4,
          "lookAtGuess": 3,
          "map": {}
        },
        "1": {
          "defaultGuess": 3,
          "lookAtGuess": 5,
          "map": {
            "1": {
              "defaultGuess": 4,
              "lookAtGuess": 7,
              "map": {}
            },
            "3": {
              "defaultGuess": 1,
              "lookAtGuess": 8,
              "map": {}
            }
          }
        }
      }
    }
  },
  "fitness": 2.9382611231937212
}


"generation": 60,
"cells": [
  {
    "defaultGuess": 1,
    "lookAtGuess": 1,
    "map": {
      "1": {
        "defaultGuess": 3,
        "lookAtGuess": 3,
        "map": {
          "1": {
            "defaultGuess": 1,
            "lookAtGuess": 5,
            "map": {
              "0": {
                "defaultGuess": 0,
                "lookAtGuess": 3,
                "map": {}
              },
              "3": {
                "defaultGuess": 1,
                "lookAtGuess": 5,
                "map": {}
              }
            }
          },
          "3": {
            "defaultGuess": 1,
            "lookAtGuess": 5,
            "map": {
              "1": {
                "defaultGuess": 3,
                "lookAtGuess": 7,
                "map": {
                  "3": {
                    "defaultGuess": 2,
                    "lookAtGuess": 5,
                    "map": {}
                  }
                }
              }
            }
          }
        }
      },
      "4": {
        "defaultGuess": 0,
        "lookAtGuess": 3,
        "map": {}
      }
    },
    "fitness": 2.935224102711122
  },
