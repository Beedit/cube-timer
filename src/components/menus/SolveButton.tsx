"use client";
import { Button, Separator, useOverlayState } from "@heroui/react";
import { SolveMenu } from "./SolveMenu";
import type { Solve } from "../../utils/interfaces/Solve";
import { formatTimer } from "../../utils/data";

export default function CategoryDropdown({ solve }: { solve: Solve }) {
    const modalState = useOverlayState();
    return (
        <>
            <Button onPress={() => modalState.setOpen(true)}>
                {solve.id ?? ""}
                <Separator orientation="vertical" />
                {formatTimer(Number(solve.time)) + ((solve.plusTwoCount > 0) ? "+" : "")}
            </Button>

            <SolveMenu modalState={modalState} solve={solve} />
        </>
    );
}
