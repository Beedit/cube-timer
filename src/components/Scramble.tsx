import { data } from "../utils/data";
import GlassBox from "./GlassBox";

export default function Scramble() {
    return (
        <GlassBox>
            <div className="text-2rem font-bold h-full flex items-center justify-center transition" id="timer">
                {data.solve.scramble}
            </div>
        </GlassBox>
    );
}
