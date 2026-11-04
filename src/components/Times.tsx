import type { ReactNode } from "react";
import GlassBox from "./GlassBox";
import WhiteBox from "./WhiteBox";
import { getAllTimes } from "../utils/dataHandler";

export default async function Times() {
    const times = await getAllTimes();

    const timesList: ReactNode[] = [];

    if (times.success == true && times.result) {
        for (const time of times.result) {
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
    }

    return (
        <GlassBox>
            <div className="grid grid-cols-1 gap-2 justify-items-center">
                {timesList}
            </div>
        </GlassBox>
    );
}
