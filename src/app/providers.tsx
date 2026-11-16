"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useReducer } from "react";
import { updateSolveList, categoriesInitialState, CategoryData, SetCategoryData, SetSolveListData, SetTimeData, SolveListData, solveListInitialState, TimeData, timeInitialState, updateCategories, updateTimeData } from "../utils/data";

export function Providers({ children }: { children: React.ReactNode }) {
    const [currentSolveData, setSolveData] = useReducer(updateTimeData, timeInitialState);
    const [categoryData, setCategoryData] = useReducer(updateCategories, categoriesInitialState);
    const [solveListData, setSolveListData] = useReducer(updateSolveList, solveListInitialState);

    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <TimeData value={currentSolveData}>
                <SetTimeData value={setSolveData}>
                    <CategoryData value={categoryData}>
                        <SetCategoryData value={setCategoryData}>
                            <SolveListData value={solveListData}>
                                <SetSolveListData value={setSolveListData}>
                                    {children}
                                </SetSolveListData>
                            </SolveListData>
                        </SetCategoryData>
                    </CategoryData>
                </SetTimeData>
            </TimeData>
        </NextThemesProvider>
    );
}
