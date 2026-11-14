export interface Time {
    time: number
    date: number
    scramble: string
    category: string
    puzzle: string
}

/**
 *
 * @param check The object to check
 * @returns Boolean of if the object implements Time
 */
// ESlint rule disabled because the point is literally to pass in any object of any type.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isTime = (check: any): check is Time => {
    return (
        check
        && typeof check.time === "number"
        && typeof check.date === "number"
        && typeof check.scramble === "string"
        && typeof check.category === "string"
        && typeof check.puzzle === "string"
    );
};
