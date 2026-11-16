import { useContext, useEffect, useState } from "react";
import GlassBox from "./GlassBox";
import { formatTimer, getAoX, SolveListData, TimeData } from "../utils/data";

export default function Infobox() {
    const solveData = useContext(SolveListData);
    const timeData = useContext(TimeData);

    const [averages, setAverages] = useState<{
        ao5: number | string
        ao12: number | string
    }>({
        ao5: "",
        ao12: "",
    });

    useEffect(() => {
        const f = async () => {
            const allSolves = solveData.toSorted((a, b) => (a.date > b.date) ? -1 : 1);
            const solves = allSolves.filter(solve => solve.category == timeData.category);
            setAverages({
                ao5: (solves.length >= 5) ? getAoX(solves.slice(0, 5), 1) : "Do more solves!",
                ao12: (solves.length >= 12) ? getAoX(solves.slice(0, 12), 1) : "Do more solves!",
            });
        };

        f();
    }, [solveData, timeData.category]);

    return (
        <GlassBox>
            <div className="grid grid-colums-1 w-full h-full gap-3 text-[3vh] font-bold transition">
                <div className="flex justify-center w-full h-full gap-3">
                    <div>Ao5:</div>
                    <div>{(typeof averages.ao5 == "number") ? formatTimer(averages.ao5) : averages.ao12}</div>
                </div>
                <div className="flex justify-center w-full h-full gap-3">
                    <div>Ao12:</div>
                    <div>{(typeof averages.ao12 == "number") ? formatTimer(averages.ao12) : averages.ao12}</div>
                </div>
            </div>
        </GlassBox>
    );
}
