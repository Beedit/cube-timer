import type { Solve } from "../Solve";

export interface SolveListAction {
    type: "add" | "remove"
    data: Solve
}
