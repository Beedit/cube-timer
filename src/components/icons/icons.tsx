import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCogs, faArrowUpRightFromSquare, faOtter, faTableCells } from "@fortawesome/free-solid-svg-icons";

const iconClasses = "px-1";
const iconStyle = {
    "color": "#ffb9e7",
    "--fa-primary-color": "#ffb9e7",
    "--fa-primary-opacity": "1",
    "--fa-secondary-color": "#ffe6f7",
    "--fa-secondary-opacity": "1",
};

const HeartIcon = () => {
    return <FontAwesomeIcon icon={faHeart} className={iconClasses} style={iconStyle} />;
};

const CogIcon = () => {
    return <FontAwesomeIcon icon={faCogs} className={iconClasses} style={iconStyle} />;
};

const LinkIcon = () => {
    return <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={iconClasses} style={iconStyle} />;
};

const OtterIcon = () => {
    return <FontAwesomeIcon icon={faOtter} bounce widthAuto style={iconStyle} size="2xl" />;
};

const ThreeCubeIcon = () => {
    return <FontAwesomeIcon icon={faTableCells} bounce widthAuto style={iconStyle} />;
};

export { HeartIcon, CogIcon, LinkIcon, OtterIcon, ThreeCubeIcon };
