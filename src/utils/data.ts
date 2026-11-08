import { Solve } from "./classes/Solve";

class Data {
    solve: Solve;

    constructor() {
        this.solve = new Solve("", "");
    }

    submit() {
        this.solve.submit();
        this.solve = new Solve(this.solve.category, this.solve.puzzle);
    }

    changeCategory(category: string, puzzle: string) {
        this.solve = new Solve(category, puzzle);
    }
}

export const data = new Data();
