"use client";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import GlassBox from "./GlassBox";
import { getSolveByID, submit } from "../utils/api";
import { formatTimer, SetSolveListData, SetTimeData, TimeData } from "../utils/data";
import { Status } from "../utils/enums/Status";
import { isSolve } from "../utils/interfaces/Solve";

export default function Timer() {
    const timeData = useContext(TimeData);
    const setTimeData = useContext(SetTimeData);
    const updateSolveList = useContext(SetSolveListData);
    const [isRunning, setRunning] = useState(false);
    const [keyBindCheck, setKeyBindCheck] = useState(false);
    const [localTime, setTime] = useState(0);
    const timeRef = useRef(0);
    const interval = useRef<NodeJS.Timeout>(undefined);
    const spaceTime = useRef(0);
    const spaceStartTime = useRef(NaN);
    const timerElement = useRef<HTMLDivElement>(null);

    const startTimer = () => {
        spaceStartTime.current = NaN;
        spaceTime.current = NaN;
        setRunning(false);
        setTime(0);
        timeRef.current = Date.now();
        setRunning(true);
    };

    const stopTimer = useCallback(async () => {
        setRunning(false);

        const solveID = await submit(localTime, Date.now(), timeData.category, timeData.scramble);
        if (solveID.status == Status.Success && typeof solveID.result === "string") {
            const solve = await getSolveByID(solveID.result);
            if (solve.status == Status.Success && isSolve(solve.result)) {
                updateSolveList({
                    type: "add",
                    data: solve.result,
                });
            }
        }
        setTimeData({
            type: "time",
            data: localTime,
        });
        setTimeData({
            type: "date",
            data: Date.now(),
        });
        setTimeData({ type: "nextScramble" });
    }, [localTime, timeData.category, timeData.scramble, setTimeData, updateSolveList]);

    useEffect(() => {
        if (isRunning) {
            interval.current = setInterval(() => {
                setTime(Date.now() - timeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(interval.current);
        };
    }, [isRunning]);

    useEffect(() => {
        const f = (key: KeyboardEvent) => {
            if (key.code == "Space" && !keyBindCheck) {
                if (Number.isNaN(spaceStartTime.current)) {
                    spaceStartTime.current = Date.now();
                }
                spaceTime.current = Date.now() - spaceStartTime.current;
            }
        };

        document.addEventListener("keydown", f);
        return () => {
            document.removeEventListener("keydown", f);
        };
    }, [keyBindCheck]);

    useEffect(() => {
        const f = (key: KeyboardEvent) => {
            if (key.code == "Space" && !keyBindCheck) {
                if (spaceTime.current > 500) {
                    timerElement.current!.classList.remove("text-red-500");
                    timerElement.current!.classList.add("text-emerald-700");
                } else {
                    timerElement.current!.classList.add("scale-95", "text-red-500");
                }
            }
        };

        document.addEventListener("keydown", f);

        return () => {
            document.removeEventListener("keydown", f);
        };
    }, [keyBindCheck]);

    useEffect(() => {
        const f = (key: KeyboardEvent) => {
            if (key.code == "Space" && isRunning && !key.repeat) {
                setKeyBindCheck(true);
                stopTimer();
            }
            return;
        };

        document.addEventListener("keydown", f, { once: true });

        return () => {
            document.removeEventListener("keydown", f);
        };
    }, [isRunning, stopTimer]);

    useEffect(() => {
        const f = (key: KeyboardEvent) => {
            if (key.code == "Space") {
                setKeyBindCheck(false);
                if (spaceTime.current > 500) {
                    startTimer();
                }
                spaceStartTime.current = NaN;
                spaceTime.current = NaN;
                timerElement.current!.classList.remove("scale-95", "text-red-500", "text-emerald-700");
            }
            return;
        };

        document.addEventListener("keyup", f);

        return () => {
            document.removeEventListener("keyup", f);
        };
    }, []);

    return (
        <GlassBox>
            <div className="text-[6vw] font-bold h-full flex items-center justify-center transition" ref={timerElement}>
                {formatTimer(localTime)}
            </div>
        </GlassBox>
    );
}
