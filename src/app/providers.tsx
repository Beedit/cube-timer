"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { createContext, useReducer, type ActionDispatch } from "react";
import { updateCategories, updateSolveData } from "../utils/data";
import type { TimeAction } from "../utils/interfaces/TimeAction";
import type { Time } from "../utils/interfaces/Time";
import { getAllCategories } from "../utils/api";
import type { Category } from "../utils/interfaces/Category";
import { Status } from "../utils/enums/Status";
import type { CategoryAction } from "../utils/interfaces/CategoryAction";

const time = {
    time: 0,
    date: 0,
    scramble: "",
    category: "",
    puzzle: "",
};

const { status, result } = await getAllCategories();
const categories = (status == Status.Success) ? result as Category[] : [];

export const SolveData = createContext<Time>(time);
export const SetSolveData = createContext<ActionDispatch<[action: TimeAction]>>(() => {});

export const CategoryData = createContext<Category[]>(categories);
export const SetCategoryData = createContext<ActionDispatch<[action: CategoryAction]>>(() => {});

export function Providers({ children }: { children: React.ReactNode }) {
    const [currentSolveData, setSolveData] = useReducer(updateSolveData, time);
    const [categoryData, setCategoryData] = useReducer(updateCategories, categories);

    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SolveData value={currentSolveData}>
                <SetSolveData value={setSolveData}>
                    <CategoryData value={categoryData}>
                        <SetCategoryData value={setCategoryData}>
                            {children}
                        </SetCategoryData>
                    </CategoryData>
                </SetSolveData>
            </SolveData>
        </NextThemesProvider>
    );
}
