module.exports = {
    /**
     * How often will a less fit cell win a battle against a more fit cell.
     */
    BATTLE_UPSET_RATE: 10,

    MAX_GUESSES: 5,
    MUTATION_RATE: 10,
    NUM_CELLS: 100000,
    NUM_GAMES: 10000,
    NUM_GENERATIONS: 50,
    NUM_ROOMS: 4,
    NUM_WORKERS: 6,

    /**
     * Increase this value to make the sucess percent matter more in the fitness.
     */
    SUCCESS_PERCENT_FACTOR: 9
}
