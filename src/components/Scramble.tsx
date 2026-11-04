import GlassBox from "./GlassBox";
import { currentSolve } from "../utils/dataHandler";

export default function Scramble() {
    return (
        <GlassBox>
            <div className="text-2rem font-bold h-full flex items-center justify-center transition" id="timer">
                {currentSolve.scramble}
            </div>
        </GlassBox>
    );
}
