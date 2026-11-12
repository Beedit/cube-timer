"use client";
import { useContext } from "react";
import GlassBox from "./GlassBox";
import { SolveData } from "../app/page";
export default function Scramble() {
    const solve = useContext(SolveData);
    const scramble = solve.scramble;

    return (
        <GlassBox>
            <div className="text-[1.2vw] font-bold h-full flex items-center justify-center transition" suppressHydrationWarning>
                {scramble}
            </div>
        </GlassBox>
    );
}
