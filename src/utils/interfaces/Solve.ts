export interface Solve {
    time: number
    date: number
    scramble: string
    category: string
    id: number
    dnf: boolean
    plusTwo: number
    note: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSolve = (check: any): check is Solve => {
    return (
        check
        && typeof check.time === "number"
        && typeof check.date === "number"
        && typeof check.scramble === "string"
        && typeof check.category === "string"
        && typeof check.id === "number"
        && typeof check.dnf === "boolean"
        && typeof check.plusTwo === "number"
        && typeof check.note === "string"
    );
};

export const getRealTime = (solve: Solve) => {
    return solve.time + (2000 * solve.plusTwo);
};
