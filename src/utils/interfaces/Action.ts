import type { Category } from "./Category";

export interface Action {
    type: "time" | "date" | "scramble" | "category" | "nextScramble"
    data?: number | string | Category
}
