"use client";

import axios from "axios";
import { getSetting } from "./config";
import type { Result } from "./interfaces/Result";
import { Status } from "./enums/Status";
import type { Category } from "./interfaces/Category";
import type { Solve } from "./interfaces/Solve";

const submit = async (time: number, date: number, category: string, scramble: string) => {
    const response = await axios.post(await getSetting("server") + "/solve", {
        time: time,
        date: date,
        category: category,
        scramble: scramble,
    });

    if (response.data.success) {
        return {
            status: Status.Success,
            result: response.data.result as number,
        } as Result;
    } else {
        return {
            result: Status.Fail,
        } as Result;
    }
};

const getSolveByID = async (id: string) => {
    const response = await axios.get(await getSetting("server") + `/solve?id=${id}`);

    if (response.data.success == true) {
        return {
            status: Status.Success,
            result: response.data.result as Solve,
        } as Result;
    } else {
        return {
            status: Status.Fail,
        } as Result;
    }
};

const setPlusTwo = async (id: number, count: number) => {
    axios.put(await getSetting("server") + "/solve/plusTwo", {
        id: id,
        plusTwo: count,
    }).then((result) => {
        // Add handling
        console.log(result);
    });
};

const setDnf = async (id: number, dnf: boolean) => {
    axios.put(await getSetting("server") + "/solve/dnf", {
        id: id,
        isDnf: dnf,
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

const deleteCategory = async (category: string) => {
    axios.delete(await getSetting("server") + "/category", {
        data: {
            category: category,
        },
    }).then((result) => {
        // Add handling
        console.log(result);
    });
};

const getAllSolves = async () => {
    const response = await axios.get(await getSetting("server") + "/solve/all");

    if (response.status == 200) {
        return {
            status: Status.Success,
            result: response.data.result as Solve[],
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

export { submit, setPlusTwo, setDnf, setNote, setScramble, deleteSolve, getAllSolves, getAllCategories, deleteCategory, getSolveByID };
