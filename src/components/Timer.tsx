"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import GlassBox from "./GlassBox";

export default function Timer() {
    const [isRunning, setRunning] = useState(false);
    const [keyBindCheck, setKeyBindCheck] = useState(false);
    const [localTime, setTime] = useState(0);
    const timeRef = useRef(0);
    const interval = useRef<NodeJS.Timeout>(undefined);
    const spaceTime = useRef(0);
    const spaceStartTime = useRef(NaN);

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
        console.log(localTime);
        setRunning(false);
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
        document.addEventListener("keydown", (key) => {
            if (key.code == "Space" && !keyBindCheck) {
                if (Number.isNaN(spaceStartTime.current)) {
                    spaceStartTime.current = Date.now();
                }
                spaceTime.current = Date.now() - spaceStartTime.current;
            }
        });
    }, [keyBindCheck]);

    useEffect(() => {
        document.addEventListener("keydown", (key) => {
            if (key.code == "Space" && !keyBindCheck) {
                if (spaceTime.current > 500) {
                    document.getElementById("timer")?.classList.remove("text-red-500");
                    document.getElementById("timer")?.classList.add("text-emerald-700");
                } else {
                    document.getElementById("timer")?.classList.add("scale-95", "text-red-500");
                }
            }
        });
    }, [keyBindCheck]);

    useEffect(() => {
        document.addEventListener("keydown", (key) => {
            if (key.code == "Space" && isRunning && !key.repeat) {
                setKeyBindCheck(true);
                stopTimer();
            }
            return;
        }, { once: true });
    }, [isRunning, stopTimer]);

    useEffect(() => {
        document.addEventListener("keyup", (key) => {
            setKeyBindCheck(false);
            if (key.code == "Space") {
                if (spaceTime.current > 500) {
                    startTimer();
                }
                spaceStartTime.current = NaN;
                spaceTime.current = NaN;
                document.getElementById("timer")?.classList.remove("scale-95", "text-red-500", "text-emerald-700");
            }
        });
    }, []);

    return (
        <GlassBox>
            <div className="text-8xl font-bold h-full flex items-center justify-center transition" id="timer">
                {formatTimer(localTime)}
            </div>
        </GlassBox>
    );
}
