"use client";
import type { TimeAction } from "./interfaces/actions/TimeAction";
import cstimer from "cstimer_module";
import type { Time } from "./interfaces/Time";
import { isCategory, type Category } from "./interfaces/Category";
import { type CategoryAction } from "./interfaces/actions/CategoryAction";
import { deleteSolve, getAllCategories, getAllSolves } from "../utils/api";
import { Status } from "../utils/enums/Status";
import { deleteCategory } from "./api";
import { createContext, type ActionDispatch } from "react";
import type { SolveListAction } from "./interfaces/actions/SolveListAction";
import { getRealTime, isSolve, type Solve } from "./interfaces/Solve";

const updateTimeData = (currentState: Time, action: TimeAction) => {
    switch (action.type) {
        case "time":
            return { ...currentState, time: action.data as number };
        case "date":
            return { ...currentState, date: action.data as number };
        case "scramble":
            return { ...currentState, scramble: action.data as string };
        case "category": {
            const cat = action.data as Category;
            return { ...currentState, category: cat.categoryName as string, puzzle: cat.puzzleType };
        }
        case "nextScramble": {
            return { ...currentState, scramble: cstimer.getScramble(currentState.puzzle) };
        }
    }
};

const updateCategories = (currentState: Category[], action: CategoryAction) => {
    switch (action.type) {
        case "add": {
            if (isCategory(action.data)) {
                return [...currentState, action.data];
            }
            return currentState;
        }
        case "remove":
            deleteCategory(action.data as string);
            return currentState.filter(item => item.categoryName != action.data);
    }
};

const updateSolveList = (currentState: Solve[], action: SolveListAction) => {
    switch (action.type) {
        case "add": {
            if (isSolve(action.data)) {
                return [...currentState, action.data];
            }
            return currentState;
        }
        case "remove":
            deleteSolve(action.data.id);
            return currentState.filter(item => item.id != action.data.id);
        case "editSolve": {
            const x = currentState.find(solve => solve.id == action.data.id);
            if (!isSolve(action.data) && action.data.data && x) {
                return [...currentState.filter(item => item.id != action.data.id), {
                    ...x,
                    ...action.data.data,
                }];
            }
            return currentState;
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

const getAoX = (times: Solve[], removeFromEachEnd: number) => {
    times.sort((a, b) => (a.time > b.time) ? 1 : -1);
    times = times.slice(removeFromEachEnd).slice(0, -removeFromEachEnd);

    return getMean(times);
};

const getMean = (times: Solve[]) => {
    let c = 0;

    times.forEach((time) => {
        c += getRealTime(time);
    });

    return c / times.length;
};

const getFormattedTime = (solve: Solve) => {
    return formatTimer(getRealTime(solve)) + ((solve.plusTwo > 0) ? "+" : "");
};

/**
 * A list of the default competitions
 */
const competitions = {
    "2x2": { scrambleType: "222so", scrambleLength: 0 },
    "3x3": { scrambleType: "333", scrambleLength: 0 },
    "4x4": { scrambleType: "444wca", scrambleLength: -40 },
    "5x5": { scrambleType: "555wca", scrambleLength: -60 },
    "6x6": { scrambleType: "666wca", scrambleLength: -80 },
    "7x7": { scrambleType: "777wca", scrambleLength: -100 },
    "3x3 Blind": { scrambleType: "333ni", scrambleLength: 0 },
    "3x3 One Handed": { scrambleType: "333oh", scrambleLength: 0 },
    "Clock": { scrambleType: "clkwca", scrambleLength: 0 },
    "Megaminx": { scrambleType: "mgmp", scrambleLength: -70 },
    "Pyraminx": { scrambleType: "pyrso", scrambleLength: -10 },
    "Skewb": { scrambleType: "skbso", scrambleLength: 0 },
    "Face Turning Octahedron": { scrambleType: "ftoso", scrambleLength: 0 },
    "Square-1": { scrambleType: "sqrs", scrambleLength: 0 },
    "4x4 Blind": { scrambleType: "444bld", scrambleLength: -40 },
    "5x5 Blind": { scrambleType: "555bld", scrambleLength: -60 },
    "3x3 Multi-Blind": { scrambleType: "r3ni", scrambleLength: 5 },
};

export const timeInitialState = {
    time: 0,
    date: 0,
    scramble: "",
    category: "",
    puzzle: "",
};

const { status: categoriesStatus, result: categoriesResult } = await getAllCategories();
export const categoriesInitialState = (categoriesStatus == Status.Success) ? categoriesResult as Category[] : [];

const { status: solvesStatus, result: solvesResult } = await getAllSolves();
export const solveListInitialState = (solvesStatus == Status.Success) ? solvesResult as Solve[] : [];

export const TimeData = createContext<Time>(timeInitialState);
export const SetTimeData = createContext<ActionDispatch<[action: TimeAction]>>(() => {});

export const CategoryData = createContext<Category[]>(categoriesInitialState);
export const SetCategoryData = createContext<ActionDispatch<[action: CategoryAction]>>(() => {});

export const SolveListData = createContext<Solve[]>(solveListInitialState);
export const SetSolveListData = createContext<ActionDispatch<[action: SolveListAction]>>(() => {});

export { updateTimeData, formatTimer, competitions, updateCategories, updateSolveList, getAoX, getMean, getFormattedTime };
