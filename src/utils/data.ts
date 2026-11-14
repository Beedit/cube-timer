"use client";
import type { Action } from "./interfaces/Action";
import cstimer from "cstimer_module";
import type { Time } from "./interfaces/Time";
import type { Category } from "./interfaces/Category";

const updateSolveData = (currentState: Time, action: Action) => {
    switch (action.type) {
        case "time":
            return { ...currentState, time: action.data as number };
        case "date":
            return { ...currentState, date: action.data as number };
        case "scramble":
            return { ...currentState, scramble: action.data as string };
        case "category": {
            const cat = action.data as Category;
            return { ...currentState, category: action.data as string, puzzle: cat.puzzleType };
        }
        case "nextScramble": {
            return { ...currentState, scramble: cstimer.getScramble(currentState.puzzle) };
        }
    }
};

/**
 * Formats the time when given in ms
 * @returns Time formatted in MM:SS:MsMs
 */
const formatTimer = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = (time % 60000) % 1000;

    const formattedMins = minutes.toString().padStart(2, "0");
    const formattedSecs = seconds.toString().padStart(2, "0");
    const formattedMs = milliseconds.toString().padStart(3, "0").substring(0, 2);

    return `${(formattedMins == "00") ? "" : `${formattedMins}:`}${formattedSecs}.${formattedMs}`;
};

export { updateSolveData, formatTimer };
