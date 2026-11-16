"use client";
import { Button, Separator, useOverlayState } from "@heroui/react";
import { SolveMenu } from "../menus/SolveMenu";
import { getRealTime, type Solve } from "../../utils/interfaces/Solve";
import { formatTimer } from "../../utils/data";

export default function SolveButton({ solve }: { solve: Solve }) {
    const modalState = useOverlayState();
    return (
        <>
            <Button onPress={() => modalState.setOpen(true)}>
                {solve.id ?? ""}
                <Separator orientation="vertical" />
                {formatTimer(getRealTime(solve)) + ((solve.plusTwo > 0) ? "+" : "")}
            </Button>

            <SolveMenu modalState={modalState} solve={solve} />
        </>
    );
}
