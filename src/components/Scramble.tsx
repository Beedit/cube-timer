"use client";
import { useContext, useEffect } from "react";
import GlassBox from "./GlassBox";
import { SetTimeData, TimeData } from "../utils/data";
import { getSetting } from "../utils/config";
import type { Category } from "../utils/interfaces/Category";
export default function Scramble() {
    const time = useContext(TimeData);
    const editTimeData = useContext(SetTimeData);

    useEffect(() => {
        const f = async () => {
            editTimeData({ type: "category", data: await getSetting("defaultCategory") as Category });
            editTimeData({ type: "nextScramble" });
        };

        f();
    }, [editTimeData]);

    return (
        <GlassBox>
            <div className="text-[1.5vh] font-bold h-full flex items-center justify-center transition">
                {time.scramble}
            </div>
        </GlassBox>
    );
}
