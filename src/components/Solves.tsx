"use client";
import { useEffect, useState, type ReactNode } from "react";
import GlassBox from "./GlassBox";
import { getAllTimes } from "../utils/api";
import { Status } from "../utils/enums/Status";
import { type Solve } from "../utils/interfaces/Solve";
import SolveButton from "./menus/SolveButton";

export default function Solves() {
    const [children, setChildren] = useState<ReactNode[]>();

    useEffect(() => {
        const f = async () => {
            const {
                status,
                result: times,
            } = await getAllTimes();
            console.log(times);
            if (status === Status.Success && Array.isArray(times)) {
                const timesList: ReactNode[] = [];
                for (const time of times) {
                    timesList.push(<SolveButton solve={time as Solve} key={time.id} />);
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
