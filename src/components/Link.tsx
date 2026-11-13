import { Link } from "@heroui/react";
import { openUrl } from "@tauri-apps/plugin-opener";
import { LinkIcon } from "./icons/icons";

const TauriLink = ({ url, children }: { url: string, children: React.ReactNode }) => {
    const f = () => {
        openUrl(url);
    };
    return (
        <Link href={undefined} onClick={() => f()} className="gap-3">
            {children}
            <Link.Icon>
                <LinkIcon />
            </Link.Icon>
        </Link>
    );
};

export default TauriLink;
