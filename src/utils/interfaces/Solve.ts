export interface Solve {
    time: number
    date: number
    scramble: string
    category: string
    id: number
    dnf: boolean
    plusTwoCount: number
    note: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSolve = (object: any): object is Solve => {
    if (
        object.time && object.date && object.scramble && object.category && object.id && object.dnf && object.plusTwoCount
    ) {
        if (
            typeof object.time === "number"
            && typeof object.date === "number"
            && typeof object.scramble === "string"
            && typeof object.category === "string"
            && typeof object.id === "number"
            && typeof object.dnf === "number"
            && typeof object.plusTwoCount === "number"
            && typeof object.note === "string"
        ) {
            return true;
        }
    }

    return false;
};
