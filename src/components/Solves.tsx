"use client";
import { useContext, useEffect, useState, type ReactNode } from "react";
import GlassBox from "./GlassBox";
import SolveButton from "./parts/SolveButton";
import { SolveListData, TimeData } from "../utils/data";

export default function Solves() {
    const [children, setChildren] = useState<ReactNode[]>();
    const solveList = useContext(SolveListData);
    const currentTime = useContext(TimeData);

    useEffect(() => {
        const f = () => {
            const timesList: ReactNode[] = [];

            solveList.forEach((solve) => {
                if (solve.category == currentTime.category) {
                    timesList.push(<SolveButton solve={solve} key={solve.id} />);
                }
            });

            setChildren(timesList.reverse());
        };

        f();
    }, [currentTime.category, solveList]);

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
