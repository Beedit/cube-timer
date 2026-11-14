"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { createContext, useReducer, type ActionDispatch } from "react";
import { updateSolveData } from "../utils/data";
import type { Action } from "../utils/interfaces/Action";
import type { Time } from "../utils/interfaces/Time";

const time = {
    time: 0,
    date: 0,
    scramble: "",
    category: "",
    puzzle: "",
};

export const SolveData = createContext<Time>(time);
export const SetSolveData = createContext<ActionDispatch<[action: Action]>>(() => {});

export function Providers({ children }: { children: React.ReactNode }) {
    const [currentSolveData, setSolveData] = useReducer(updateSolveData, time);

    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SolveData value={currentSolveData}>
                <SetSolveData value={setSolveData}>
                    {children}
                </SetSolveData>
            </SolveData>
        </NextThemesProvider>
    );
}
