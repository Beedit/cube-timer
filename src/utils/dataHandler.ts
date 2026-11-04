import axios from "axios";
import { config } from "./config";
import { Solve } from "./classes/Solve";
import cstimer from "cstimer_module";

let currentSolve = new Solve();

const init = () => {
    newSolve();

    currentSolve.puzzle = "333";

    currentSolve.scramble = cstimer.getScramble(currentSolve.puzzle);
};

const serverCompatible = async () => {
    let res = false;
    await axios.get(config.server + "/version").then((response) => {
        if (response.status == 200 && response.data["success"] == true) {
            res = (
                response.data["result"]["name"] == "cube-timer-api"
                && response.data["result"]["version"] == config.apiVersion
            );
        }
    }).catch((reason) => {
        console.log(reason);
    });
    return res;
};

const getAllTimes = async () => await (await fetch(config.server + "/solve/all")).json();
const newSolve = () => {
    currentSolve = new Solve();
};

export { serverCompatible, getAllTimes, newSolve, currentSolve, init };
