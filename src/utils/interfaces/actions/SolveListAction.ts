import type { Solve } from "../Solve";

export interface SolveListAction {
    type: "add" | "remove" | "editSolve"
    data: Solve | {
        id: number
        data: {
            dnf?: boolean
            plusTwo?: number
            scramble?: string
            note?: string
        }
    }
}
