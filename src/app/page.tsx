import Infobox from "../components/Infobox";
import Preview from "../components/Preview";
import Scramble from "../components/Scamble";
import Stats from "../components/Stats";
import Timer from "../components/Timer";
import Times from "../components/Times";
import Widget from "../components/Widget";
import "./globals.css";

export default function Page() {
    return (
        <div className="grid grid-cols-7 grid-rows-7 gap-5 w-screen h-screen p-7.5">
            <div className="row-span-3 col-start-1 row-start-5"><Times /></div>
            <div className="row-span-3 col-start-1 row-start-1"><Stats /></div>
            <div className="col-span-3 row-span-3 col-start-3 row-start-3"><Timer /></div>
            <div className="row-span-3 col-start-7 row-start-1"><Preview /></div>
            <div className="row-span-3 col-start-7 row-start-5"><Infobox /></div>
            <div className="col-span-3 col-start-3 row-start-1"><Scramble /></div>
            <div className="col-span-3 col-start-3 row-start-7"><Widget /></div>
        </div>

    );
}
