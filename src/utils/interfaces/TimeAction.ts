import type { Category } from "./Category";

export interface TimeAction {
    type: "time" | "date" | "scramble" | "category" | "nextScramble"
    data?: number | string | Category
}
