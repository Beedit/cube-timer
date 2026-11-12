"use client";
import { useContext } from "react";
import GlassBox from "./GlassBox";
import { CurrentContext } from "../utils/data";

export default function Scramble() {
    const context = useContext(CurrentContext);

    return (
        <GlassBox>
            <div className="text-2rem font-bold h-full flex items-center justify-center transition">
                {context.solve.scramble}
            </div>
        </GlassBox>
    );
}
