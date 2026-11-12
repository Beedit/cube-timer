export interface Action {
    type: "time" | "date" | "scramble" | "category" | "puzzle" | "nextScramble"
    data?: number | string
}
