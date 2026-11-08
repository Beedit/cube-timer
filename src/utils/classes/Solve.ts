import axios from "axios";
import { config } from "../config";
import cstimer from "cstimer_module";

class Solve {
    id?: number;

    time: number;
    date: number;
    puzzle: string;
    category: string;
    scramble: string;

    dnf?: boolean;
    plusTwoCount?: number;
    note?: string;

    constructor(category: string, puzzle: string) {
        if (!cstimer.getScrambleTypes().includes(puzzle)) {
            puzzle = "333";
        }
        this.time = 0;
        this.date = 0;
        this.puzzle = puzzle;
        this.category = category;
        this.scramble = cstimer.getScramble(puzzle);
    }

    async submit() {
        console.log("meow");
        axios.post(config.server + "/solve", {
            time: this.time,
            date: this.date,
            puzzle: this.puzzle,
            scramble: this.scramble,
        }).then((response) => {
            if (response.data.success == true) {
                this.id = Number(response.data.result);
            }
        }).catch((reason) => {
            console.log(reason);
            return "ERR";
        });
    }

    async setPlusTwo(count: number) {
        this.plusTwoCount = count;

        axios.put(config.server + "/solve/plusTwo", {
            id: this.id,
            plusTwoCount: this.plusTwoCount,
        }).then((result) => {
            // Add handling
            console.log(result);
        });
    }

    async setDnf(dnf: boolean) {
        this.dnf = dnf;

        axios.put(config.server + "/solve/dnf", {
            id: this.id,
            dnf: this.dnf,
        }).then((result) => {
            // Add handling
            console.log(result);
        });
    }

    async setNote(note: string) {
        this.note = note;

        axios.put(config.server + "/solve/note", {
            id: this.id,
            note: this.note,
        }).then((result) => {
            // Add handling
            console.log(result);
        });
    }

    async setScramble(scramble: string) {
        this.scramble = scramble;

        axios.put(config.server + "/solve/scramble", {
            id: this.id,
            scramble: this.scramble,
        }).then((result) => {
            // Add handling
            console.log(result);
        });
    }

    async deleteSolve() {
        axios.delete(config.server + "/solve", {
            data: {
                id: this.id,
            },
        }).then((result) => {
            // Add handling
            console.log(result);
        });
    }
}

export { Solve };
