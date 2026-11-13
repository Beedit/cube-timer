"use client";
import { useEffect, useState, type ReactNode } from "react";
import GlassBox from "./GlassBox";
import WhiteBox from "./WhiteBox";
import { getAllTimes } from "../utils/api";
import { Status } from "../utils/enums/Status";

export default function Solves() {
    const [children, setChildren] = useState<ReactNode[]>();

    useEffect(() => {
        const f = async () => {
            const { status, result: times } = await getAllTimes();
            if (status === Status.Success && Array.isArray(times)) {
                const timesList: ReactNode[] = [];
                for (const time of times) {
                    timesList.push(
                        // placeholder
                        <WhiteBox key={time.id}>
                            [
                            {time.time}
                            ] [
                            {new Date(time.date).toLocaleDateString()}
                            ]
                        </WhiteBox>,
                    );
                }
                setChildren(timesList.reverse());
            }
        };

        f();
    }, []);

    return (
        <GlassBox>
            <h1>
                Solves
            </h1>
            <div className="grid grid-cols-1 gap-2 justify-items-center">
                {children}
            </div>
        </GlassBox>
    );
}
