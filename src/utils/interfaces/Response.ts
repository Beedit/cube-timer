import type { Status } from "../enums/Status.js";

/**
 * Represents a result of a function
 */
export interface Response {
    /**
     * The status
     */
    success: Status
    /**
     * The result of the function
     */
    result?: unknown
}
