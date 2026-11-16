/**
 * Represents a category in the database
 */
export interface Category {
    /**
     * The name of the category
     */
    categoryName: string
    /**
     * The type of puzzle
     */
    puzzleType: string
    /**
     * The length of the scramble
     */
    scrambleLength: number
}

/**
 *
 * @param check The object to check
 * @returns Boolean of if the object implements Time
 */
// ESlint rule disabled because the point is literally to pass in any object of any type.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isCategory = (check: any): check is Category => {
    return (
        check
        && typeof check.categoryName === "string"
        && typeof check.puzzleType === "string"
        && typeof check.scrambleLength === "number"
    );
};
