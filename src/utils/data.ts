"use client";
import type { Solve } from "./interfaces/Solve";
import type { Action } from "./interfaces/Action";
import cstimer from "cstimer_module";
import { updateSetting } from "./config";

const updateSolveData = (currentState: Solve, action: Action) => {
    switch (action.type) {
        case "time":
            return { ...currentState, time: action.data as number };
        case "date":
            return { ...currentState, date: action.data as number };
        case "scramble":
            return { ...currentState, scramble: action.data as string };
        case "category":
            updateSetting("lastCategory", action.data as string);
            return { ...currentState, category: action.data as string };
        case "puzzle":
            updateSetting("lastPuzzle", action.data as string);
            return { ...currentState, puzzle: action.data as string };
        case "nextScramble":
            return { ...currentState, scramble: cstimer.getScramble(currentState.puzzle) };
    }
};

export { updateSolveData };
