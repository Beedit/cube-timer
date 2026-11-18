"use client";
import Infobox from "../components/Infobox";
import Preview from "../components/Preview";
import Scramble from "../components/Scramble";
import Settings from "../components/Settings";
import Timer from "../components/Timer";
import "./globals.css";

import Solves from "../components/Solves";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { getSetting } from "../utils/config";
import { Toast } from "@heroui/react";

export default function Page() {
    const { setTheme } = useTheme();

    useEffect(() => {
        const f = async () => {
            setTheme(await getSetting("theme") as string);
        };
        f();
    }, [setTheme]);

    return (
        <>
            <Toast.Provider />
            <div className="grid gap-4 w-screen h-screen p-7.5 grid-cols-5 grid-rows-9 md:grid-cols-9">
                <div className="col-span-3 col-start-2 md:col-start-4"><Scramble /></div>
                <div className="col-span-3 col-start-2 row-span-3 row-start-3 md:col-start-4"><Timer /></div>
                <div className="col-span-3 col-start-2 row-start-6 md:col-start-4"><Infobox /></div>
                <div className="col-span-3 col-start-2 row-span-2 row-start-8 md:col-start-4"><Preview /></div>
                <div className="hidden col-span-2 col-start-8 row-span-3 row-start-7 md:block"><Settings /></div>
                <div className="hidden col-span-2 col-start-1 row-start-1 row-span-9 md:block"><Solves /></div>
            </div>
        </>
    );
}
