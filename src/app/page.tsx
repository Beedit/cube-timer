"use client";
import Infobox from "../components/Infobox";
import Preview from "../components/Preview";
import Scramble from "../components/Scramble";
import Settings from "../components/Settings";
import Timer from "../components/Timer";
import Widget from "../components/Widget";
import "./globals.css";
import { createContext, useReducer, type ActionDispatch } from "react";
import { updateSolveData } from "../utils/data";
import type { Action } from "../utils/interfaces/Action";
import Solves from "../components/Solves";
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

export default function Page() {
    const [currentSolveData, setSolveData] = useReducer(updateSolveData, time);

    // console.log("Server is compatible. Client api version: {config.apiVersion}");
    return (
        <SolveData value={currentSolveData}>
            <SetSolveData value={setSolveData}>
                <div className="grid grid-cols-7 grid-rows-7 gap-5 w-screen h-screen p-7.5">
                    <div className="row-span-3 col-start-1 row-start-5"><Solves /></div>
                    <div className="row-span-3 col-start-7 row-start-5"><Settings /></div>
                    <div className="col-span-3 row-span-3 col-start-3 row-start-3"><Timer /></div>
                    <div className="row-span-3 col-start-7 row-start-1"><Widget /></div>
                    <div className="row-span-3 col-start-1 row-start-1"><Infobox /></div>
                    <div className="col-span-3 col-start-3 row-start-1"><Scramble /></div>
                    <div className="col-span-3 col-start-3 row-start-7"><Preview /></div>
                </div>
            </SetSolveData>
        </SolveData>
    );
}
