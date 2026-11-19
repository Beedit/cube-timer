import axios from "axios";
import { getSetting } from "./config";
import type { Result } from "./interfaces/Result";
import { Status } from "./enums/Status";
import type { Category } from "./interfaces/Category";
import type { Solve } from "./interfaces/Solve";
import data from "../data/data.json";

const submit = async (time: number, date: number, category: string, scramble: string) => {
    return await axios.post(await getSetting("server") + "/solve", {
        time: time,
        date: date,
        category: category,
        scramble: scramble,
    }).then((response) => {
        if (response.data.success) {
            return {
                status: Status.Success,
                result: response.data.result as number,
            } as Result;
        } else {
            return {
                status: Status.Fail,
                result: response.data.result,
            } as Result;
        }
    }).catch((error) => {
        return {
            status: Status.Fail,
            result: error,
        } as Result;
    });
};

const getSolveByID = async (id: string) => {
    return await axios.get(await getSetting("server") + `/solve?id=${id}`).then((response) => {
        if (response.data.success == true) {
            return {
                status: Status.Success,
                result: response.data.result as Solve,
            } as Result;
        } else {
            return {
                status: Status.Fail,
                result: response.data.result,
            } as Result;
        }
    }).catch((error) => {
        return {
            status: Status.Fail,
            result: error,
        } as Result;
    });
};

const setPlusTwo = async (id: number, count: number) => {
    return await axios.put(await getSetting("server") + "/solve/plusTwo", {
        id: id,
        plusTwo: count,
    }).then((response) => {
        if (response.data.success) {
            return {
                status: Status.Success,
            } as Result;
        } else {
            return {
                status: Status.Fail,
                result: response.data.result,
            } as Result;
        }
    }).catch((error) => {
        return {
            status: Status.Fail,
            result: error,
        } as Result;
    });
};

const setDnf = async (id: number, dnf: boolean) => {
    return await axios.put(await getSetting("server") + "/solve/dnf", {
        id: id,
        isDnf: dnf,
    }).then((response) => {
        if (response.data.success) {
            return {
                status: Status.Success,
            } as Result;
        } else {
            return {
                status: Status.Fail,
                result: response.data.result,
            } as Result;
        }
    }).catch((error) => {
        return {
            status: Status.Fail,
            result: error,
        } as Result;
    });
};

const setNote = async (id: number, note: string) => {
    return await axios.put(await getSetting("server") + "/solve/note", {
        id: id,
        note: note,
    }).then((response) => {
        if (response.data.success) {
            return {
                status: Status.Success,
            } as Result;
        } else {
            return {
                status: Status.Fail,
                result: response.data.result,
            } as Result;
        }
    }).catch((error) => {
        return {
            status: Status.Fail,
            result: error,
        } as Result;
    });
};

const setScramble = async (id: number, scramble: string) => {
    return await axios.put(await getSetting("server") + "/solve/scramble", {
        id: id,
        scramble: scramble,
    }).then((response) => {
        if (response.data.success) {
            return {
                status: Status.Success,
            } as Result;
        } else {
            return {
                status: Status.Fail,
                result: response.data.result,
            } as Result;
        }
    }).catch((error) => {
        return {
            status: Status.Fail,
            result: error,
        } as Result;
    });
};

const deleteSolve = async (id: number) => {
    return await axios.delete(await getSetting("server") + "/solve", {
        data: {
            id: id,
        },
    }).then((response) => {
        if (response.data.success) {
            return {
                status: Status.Success,
            } as Result;
        } else {
            return {
                status: Status.Fail,
                result: response.data.result,
            } as Result;
        }
    }).catch((error) => {
        return {
            status: Status.Fail,
            result: error,
        } as Result;
    });
};

const deleteCategory = async (category: string) => {
    return await axios.delete(await getSetting("server") + "/category", {
        data: {
            category: category,
        },
    }).then((response) => {
        if (response.data.success) {
            return {
                status: Status.Success,
            } as Result;
        } else {
            return {
                status: Status.Fail,
                result: response.data.result,
            } as Result;
        }
    }).catch((error) => {
        return {
            status: Status.Fail,
            result: error,
        } as Result;
    });
};

const getAllSolves = async () => {
    return await axios.get(await getSetting("server") + "/solve/all").then((response) => {
        if (response.status == 200) {
            return {
                status: Status.Success,
                result: response.data.result as Solve[],
            } as Result;
        }
        return {
            status: Status.Fail,
            result: response.data.result,
        } as Result;
    }).catch((error) => {
        return {
            status: Status.Fail,
            result: error,
        } as Result;
    });
};

const getAllCategories = async () => {
    return await axios.get(await getSetting("server") + "/category/all").then((response) => {
        if (response.status == 200) {
            return {
                status: Status.Success,
                result: response.data.result as Category[],
            } as Result;
        }
        return {
            status: Status.Fail,
            result: response.data.result,
        } as Result;
    }).catch((error) => {
        return {
            status: Status.Fail,
            result: error,
        } as Result;
    });
};

const checkCompatability = async () => {
    return await axios.get(await getSetting("server") + "/version").then((response) => {
        if (response.status == 200 && response.data.result.name == data.apiName && data.versions.includes(response.data.result.version)) {
            return {
                status: Status.Success,
            } as Result;
        }
        return {
            status: Status.Fail,
        } as Result;
    }).catch((error) => {
        return {
            status: Status.Fail,
            result: error,
        } as Result;
    });
};

const newCategory = async (category: string, puzzle: string, scrambleLength: number) => {
    return await axios.post(await getSetting("server") + "/category", {
        category,
        puzzle,
        scrambleLength,
    }).then((response) => {
        if (response.data.success) {
            return {
                status: Status.Success,
                result: response.data.result as number,
            } as Result;
        } else {
            return {
                status: Status.Fail,
                result: response.data.result,
            } as Result;
        }
    }).catch((error) => {
        return {
            status: Status.Fail,
            result: error,
        } as Result;
    });
};

export { submit, setPlusTwo, setDnf, setNote, setScramble, deleteSolve, getAllSolves, getAllCategories, deleteCategory, getSolveByID, checkCompatability, newCategory };
