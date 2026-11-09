import { Solve } from "./classes/Solve";
import { getConfigHandler, getSetting } from "./config";

class Data {
    solve: Solve;

    constructor() {
        this.solve = new Solve("", "");
    }

    submitSolve() {
        this.solve.submit();
        this.solve = new Solve(this.solve.category, this.solve.puzzle);
    }

    changeCategory(category: string, puzzle: string) {
        this.solve = new Solve(category, puzzle);
    }

    async changeSetting(key: string, value: string) {
        const dataHandler = await getConfigHandler();

        await dataHandler.set(key, value);
        await dataHandler.save();
    }

    async getSetting(key: string) {
        return await getSetting(key);
    }
}

export const data = new Data();
