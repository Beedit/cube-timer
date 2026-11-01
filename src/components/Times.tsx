import type { ReactNode } from "react";
import GlassBox from "./GlassBox";

export default async function Times() {
    const times = await (await fetch("http://localhost:5000/solve/all")).json();

    const timesList: ReactNode[] = [];

    if (times.success == true && times.result) {
        for (const time of times.result) {
            timesList.push(
                <div key={time.id}>
                    [
                    {time.time}
                    ] [
                    {time.id}
                    ]
                </div>,
            );
        }
    }

    return (
        <GlassBox>
            Times:
            {timesList}
        </GlassBox>
    );
}
