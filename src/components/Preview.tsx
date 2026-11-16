import { useContext } from "react";
import { TimeData } from "../utils/data";
import cstimer from "cstimer_module";
import GlassBox from "./GlassBox";
import Image from "next/image";

export default function Preview() {
    const time = useContext(TimeData);
    const img = cstimer.getImage(time.scramble, time.puzzle);
    const imgData = btoa(img);

    return (
        <GlassBox>
            <div className="flex flex-1 place-content-center h-full w-full">
                <Image width="50" height="50" alt="" src={"data:image/svg+xml;base64," + imgData} className="w-auto h-full object-cover" />
            </div>
        </GlassBox>
    );
}
