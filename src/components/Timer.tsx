"use client";
import { useEffect, useRef, useState } from "react";
import GlassBox from "./GlassBox";
export default function Timer() {
    const [isRunning, setRunning] = useState(false);
    const [time, setTime] = useState(0);
    const timeRef = useRef(0);
    const interval = useRef<NodeJS.Timeout>(undefined);
    const spaceTime = useRef(0);
    const spaceStartTime = useRef(0);

    const startTimer = () => {
        setTime(0);
        timeRef.current = Date.now();
        setRunning(true);
    };

    const stopTimer = () => {
        setRunning(false);
    };

    const formatTimer = () => {
        const minutes = Math.floor(time / 60000);
        const seconds = ((time % 60000) / 1000).toFixed(0);
        const milliseconds = (time % 60000) % 1000;

        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
    };

    useEffect(() => {
        console.log(isRunning);
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
            if (key.code == "Space") {
                if (spaceStartTime.current == 0) {
                    spaceStartTime.current = Date.now();
                }

                if (isRunning) {
                    stopTimer();
                }
                spaceTime.current = Date.now() - spaceStartTime.current;
            }
        });
    });

    useEffect(() => {
        document.addEventListener("keyup", (key) => {
            if (key.code == "Space") {
                if (spaceTime.current > 500) {
                    setTime(0);
                    setRunning(false);
                    startTimer();
                }
                spaceStartTime.current = 0;
                spaceTime.current = 0;
            }
        });
    });

    return (
        <GlassBox>
            <div className="timer">
                {formatTimer()}
            </div>
        </GlassBox>
    );
}
