import { type UseOverlayStateReturn, Modal } from "@heroui/react";
import { HeartIcon, OtterIcon } from "../icons/icons";
import Link from "../Link";

export const AboutModal = ({ modalState }: { modalState: UseOverlayStateReturn }) => {
    return (
        <Modal state={modalState}>
            <Modal.Backdrop>
                <Modal.Container size="lg">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon>
                                <OtterIcon />
                            </Modal.Icon>
                            <Modal.Heading>About</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                {"Made with love "}
                                <HeartIcon />
                                {" by Pip!"}
                                <br />
                                <br />
                                <Link url="https://github.com/Beedit/cube-timer">
                                    Source Code
                                </Link>
                                <br />
                                <Link url="https://gaypa.ws">
                                    My site
                                </Link>
                            </p>
                        </Modal.Body>
                        <Modal.Footer />
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};
