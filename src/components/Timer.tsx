"use client";
import { useEffect, useRef, useState } from "react";
import GlassBox from "./GlassBox";

export default function Timer() {
    const [isRunning, setRunning] = useState(false);
    const [localTime, setTime] = useState(0);
    const timeRef = useRef(0);
    const interval = useRef<NodeJS.Timeout>(undefined);
    const spaceTime = useRef(0);
    const spaceStartTime = useRef(NaN);

    const startTimer = () => {
        setTime(0);
        timeRef.current = Date.now();
        setRunning(true);
    };

    const formatTimer = () => {
        const minutes = Math.floor(localTime / 60000);
        const seconds = ((localTime % 60000) / 1000).toFixed(0);
        const milliseconds = (localTime % 60000) % 1000;

        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(3, "0").substring(0, 2)}`;
    };

    useEffect(() => {
        if (isRunning) {
            interval.current = setInterval(() => {
                setTime(Date.now() - timeRef.current);
            }, 1);
        }

        return () => {
            clearInterval(interval.current);
        };
    }, [isRunning]);

    useEffect(() => {
        document.addEventListener("keydown", (key) => {
            if (key.code == "Space") {
                if (Number.isNaN(spaceStartTime.current)) {
                    spaceStartTime.current = Date.now();
                }
                spaceTime.current = Date.now() - spaceStartTime.current;
            }
        });
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", (key) => {
            if (key.code == "Space") {
                if (spaceTime.current > 500) {
                    document.getElementById("timer")?.classList.remove("text-red-500");
                    document.getElementById("timer")?.classList.add("text-emerald-700");
                } else {
                    document.getElementById("timer")?.classList.add("scale-90", "text-red-500");
                }
            }
        });
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", (key) => {
            if (key.repeat) {
                return;
            }
            if (key.code == "Space" && isRunning) {
                setRunning(false);
            }
        });
    }, [isRunning]);

    useEffect(() => {
        document.addEventListener("keyup", (key) => {
            if (key.code == "Space") {
                if (spaceTime.current > 500) {
                    setTime(0);
                    setRunning(false);
                    startTimer();
                }
                spaceStartTime.current = NaN;
                spaceTime.current = 0;
                document.getElementById("timer")?.classList.remove("scale-90", "text-red-500", "text-emerald-700");
            }
        });
    }, []);

    return (
        <GlassBox>
            <div className="text-8xl font-bold h-full flex items-center justify-center transition" id="timer">
                {formatTimer()}
            </div>
        </GlassBox>
    );
}
