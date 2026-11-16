import type { Category } from "../Category";

export interface CategoryAction {
    type: "add" | "remove"
    data?: number | string | Category
}
