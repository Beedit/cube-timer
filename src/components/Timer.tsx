"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import GlassBox from "./GlassBox";
import { data } from "../utils/data";

export default function Timer() {
    const [isRunning, setRunning] = useState(false);
    const [keyBindCheck, setKeyBindCheck] = useState(false);
    const [localTime, setTime] = useState(0);
    const timeRef = useRef(0);
    const interval = useRef<NodeJS.Timeout>(undefined);
    const spaceTime = useRef(0);
    const spaceStartTime = useRef(NaN);
    const timerElement = useRef<HTMLDivElement>(null);

    const startTimer = () => {
        console.log("starting");
        spaceStartTime.current = NaN;
        spaceTime.current = NaN;
        setRunning(false);
        setTime(0);
        timeRef.current = Date.now();
        setRunning(true);
    };

    const stopTimer = useCallback(() => {
        setRunning(false);
        data.solve.time = localTime;
        data.submitSolve();
    }, [localTime]);

    /**
     * Formats the time when given in ms
     * @returns Time formatted in MM:SS:MsMs
     */
    const formatTimer = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = (time % 60000) % 1000;

        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(3, "0").substring(0, 2)}`;
    };

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
            <div className="text-8xl font-bold h-full flex items-center justify-center transition" ref={timerElement}>
                {formatTimer(localTime)}
            </div>
        </GlassBox>
    );
}
