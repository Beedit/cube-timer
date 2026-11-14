"use client";
import { useContext, useEffect } from "react";
import GlassBox from "./GlassBox";
import { SetSolveData, SolveData } from "../app/page";
import { getSetting } from "../utils/config";
import type { Category } from "../utils/interfaces/Category";
export default function Scramble() {
    const solve = useContext(SolveData);
    const editSolveData = useContext(SetSolveData);
    const scramble = solve.scramble;

    useEffect(() => {
        const f = async () => {
            editSolveData({ type: "category", data: await getSetting("defaultCategory") as Category });
            editSolveData({ type: "nextScramble" });
        };

        f();
    }, [editSolveData]);

    return (
        <GlassBox>
            <div className="text-[1.2vw] font-bold h-full flex items-center justify-center transition" suppressHydrationWarning>
                {scramble}
            </div>
        </GlassBox>
    );
}
