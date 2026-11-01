import cstimer from "cstimer_module";
import GlassBox from "./GlassBox";

export default function Scramble() {
    return (
        <GlassBox>
            {cstimer.getScramble("333")}
        </GlassBox>
    );
}
