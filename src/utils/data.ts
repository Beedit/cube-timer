import axios from "axios";
import { Solve } from "./classes/Solve";
import { getConfigHandler, getSetting } from "./config";
import type { Category } from "./interfaces/Category";

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
        console.log(this.solve.scramble);
    }

    async changeSetting(key: string, value: string) {
        const dataHandler = await getConfigHandler();

        await dataHandler.set(key, value);
        await dataHandler.save();
    }

    async getSetting(key: string) {
        return await getSetting(key);
    }

    async getCategories() {
        const response = await axios.get(await this.getSetting("server") + "/category/all");

        if (response.status == 200) {
            return response.data.result as Category[];
        }
        return [];
    }
}

export const data = new Data();
