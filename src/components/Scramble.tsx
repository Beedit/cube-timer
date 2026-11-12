import GlassBox from "./GlassBox";

export default function Scramble({ scramble }: { scramble: string }) {
    return (
        <GlassBox>
            <div className="text-2rem font-bold h-full flex items-center justify-center transition" id="timer">
                {scramble}
            </div>
        </GlassBox>
    );
}
