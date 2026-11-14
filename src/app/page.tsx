"use client";
import Infobox from "../components/Infobox";
import Preview from "../components/Preview";
import Scramble from "../components/Scramble";
import Settings from "../components/Settings";
import Timer from "../components/Timer";
import Widget from "../components/Widget";
import "./globals.css";

import Solves from "../components/Solves";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { getSetting } from "../utils/config";

export default function Page() {
    const { setTheme } = useTheme();

    useEffect(() => {
        const f = async () => {
            setTheme(await getSetting("theme") as string);
        };
        f();
    }, [setTheme]);

    return (
        <div className="grid grid-cols-7 grid-rows-7 gap-5 w-screen h-screen p-7.5">
            <div className="row-span-3 col-start-1 row-start-5"><Solves /></div>
            <div className="row-span-3 col-start-7 row-start-5"><Settings /></div>
            <div className="col-span-3 row-span-3 col-start-3 row-start-3"><Timer /></div>
            <div className="row-span-3 col-start-7 row-start-1"><Widget /></div>
            <div className="row-span-3 col-start-1 row-start-1"><Infobox /></div>
            <div className="col-span-3 col-start-3 row-start-1"><Scramble /></div>
            <div className="col-span-3 col-start-3 row-start-7"><Preview /></div>
        </div>
    );
}
