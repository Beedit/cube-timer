import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCogs, faArrowUpRightFromSquare, faOtter, faTableCells, faAngleRight, faBars, faTrashCan, faPencil } from "@fortawesome/free-solid-svg-icons";

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

const CogIcon = ({ text }: { text?: boolean }) => {
    return <FontAwesomeIcon icon={faCogs} className={iconClasses} style={(text) ? {} : iconStyle} />;
};

const LinkIcon = () => {
    return <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={iconClasses} style={iconStyle} />;
};

const OtterIcon = () => {
    return <FontAwesomeIcon icon={faOtter} bounce widthAuto style={iconStyle} size="2xl" />;
};

const ThreeCubeIcon = () => {
    return <FontAwesomeIcon icon={faTableCells} spinSnap4 widthAuto style={iconStyle} />;
};

const ArrowIcon = () => {
    return <FontAwesomeIcon icon={faAngleRight} widthAuto />;
};

const BarsIcon = () => {
    return <FontAwesomeIcon icon={faBars} widthAuto />;
};

const BinIcon = () => {
    return <FontAwesomeIcon icon={faTrashCan} widthAuto />;
};

const EditIcon = () => {
    return <FontAwesomeIcon icon={faPencil} widthAuto />;
};

export { HeartIcon, CogIcon, LinkIcon, OtterIcon, ThreeCubeIcon, ArrowIcon, BarsIcon, BinIcon, EditIcon };
