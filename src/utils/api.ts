"use client";

import axios from "axios";
import { getSetting } from "./config";
import type { Result } from "./interfaces/Result";
import type { Response } from "./interfaces/Response";
import { Status } from "./enums/Status";
import type { Time } from "./interfaces/Time";
import type { Category } from "./interfaces/Category";

const submit = async (time: number, date: number, category: string, scramble: string) => {
    let res: Result = {
        status: Status.Fail,
    };
    axios.post(await getSetting("server") + "/solve", {
        time: time,
        date: date,
        category: category,
        scramble: scramble,
    }).then((response) => {
        if (response.data.success == true) {
            res = {
                status: Status.Success,
                result: response.data.result as number,
            } as Result;
        }
    }).catch((reason) => {
        console.log(reason);
        return "ERR";
    });

    return res;
};

const setPlusTwo = async (id: number, count: number) => {
    axios.put(await getSetting("server") + "/solve/plusTwo", {
        id: id,
        plusTwoCount: count,
    }).then((result) => {
        // Add handling
        console.log(result);
    });
};

const setDnf = async (id: number, dnf: boolean) => {
    axios.put(await getSetting("server") + "/solve/dnf", {
        id: id,
        dnf: dnf,
    }).then((result) => {
        // Add handling
        console.log(result);
    });
};

const setNote = async (id: number, note: string) => {
    axios.put(await getSetting("server") + "/solve/note", {
        id: id,
        note: note,
    }).then((result) => {
        // Add handling
        console.log(result);
    });
};

const setScramble = async (id: number, scramble: string) => {
    axios.put(await getSetting("server") + "/solve/scramble", {
        id: id,
        scramble: scramble,
    }).then((result) => {
        // Add handling
        console.log(result);
    });
};

const deleteSolve = async (id: number) => {
    axios.delete(await getSetting("server") + "/solve", {
        data: {
            id: id,
        },
    }).then((result) => {
        // Add handling
        console.log(result);
    });
};

const getAllTimes = async () => {
    const response = await axios.get(await getSetting("server") + "/solve/all");

    if (response.status == 200) {
        return {
            status: Status.Success,
            result: response.data.result as Time[],
        } as Result;
    }
    return {
        status: Status.Fail,
    } as Result;
};

const getAllCategories = async () => {
    const response = await axios.get(await getSetting("server") + "/category/all");

    if (response.status == 200) {
        return {
            status: Status.Success,
            result: response.data.result as Category[],
        } as Result;
    }
    return {
        status: Status.Fail,
    } as Result;
};

const getCategoryPuzzle = async (categoryName: string) => {
    const response = await axios.get(await getSetting("server") + "/category/all") as Response;
    const final = {
        status: Status.Fail,
    } as Result;

    if (response.success && Array.isArray(response.result)) {
        response.result.forEach((category: { categoryName: string, puzzle: string }) => {
            if (category.categoryName == categoryName) {
                final.result = category.puzzle;
                final.status = Status.Success;
            }
        });
    }

    return final;
};

export { submit, setPlusTwo, setDnf, setNote, setScramble, deleteSolve, getAllTimes, getCategoryPuzzle, getAllCategories };
