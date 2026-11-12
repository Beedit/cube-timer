"use client";
import type { Solve } from "./interfaces/Solve";
import type { Action } from "./interfaces/Action";
import cstimer from "cstimer_module";

const updateSolveData = (currentState: Solve, action: Action) => {
    switch (action.type) {
        case "time":
            return { ...currentState, time: action.data as number };
        case "date":
            return { ...currentState, date: action.data as number };
        case "scramble":
            return { ...currentState, scramble: action.data as string };
        case "category":
            return { ...currentState, category: action.data as string };
        case "puzzle":
            return { ...currentState, puzzle: action.data as string };
        case "nextScramble":
            return { ...currentState, scramble: cstimer.getScramble(currentState.puzzle) };
    }
};

export { updateSolveData };
