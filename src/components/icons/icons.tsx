import { FontAwesomeIcon, type CSSVariables } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import type { CSSProperties } from "react";

const iconClasses = "scale-125 px-2";
const iconStyle: CSSProperties & CSSVariables = {
    color: "#ffb9e7",
};

const HeartIcon = () => {
    return <FontAwesomeIcon icon={faHeart} className={iconClasses} style={iconStyle} />;
};

export { HeartIcon };
