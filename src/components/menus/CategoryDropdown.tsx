"use client";
import { Dropdown, Header, Label, useOverlayState } from "@heroui/react";
import { useContext, useState, type ReactNode } from "react";
import WhiteBox from "../WhiteBox";
import { getAllCategories } from "../../utils/api";
import { Status } from "../../utils/enums/Status";
import type { Category } from "../../utils/interfaces/Category";
import { SetSolveData } from "../../app/page";
import { ManageCategoriesModal } from "./ManageCategoriesModal";

export default function CategoryDropdown() {
    const modalDisclosure = useOverlayState();
    const [children, setChildren] = useState<ReactNode[]>();
    const setSolveData = useContext(SetSolveData);

    const onItemOpen = (category: Category) => {
        setSolveData({ type: "category", data: category.categoryName });
        setSolveData({ type: "puzzle", data: category.puzzleType });
        setSolveData({ type: "nextScramble" });
    };

    const f = async () => {
        const children: ReactNode[] = [];
        const categories = await getAllCategories();

        if (categories.status == Status.Success && Array.isArray(categories.result)) {
            categories.result.forEach((category: Category) => {
                children.push(
                    <Dropdown.Item key={category.categoryName} onAction={() => onItemOpen(category)}>
                        <Label>
                            {category.categoryName}
                        </Label>
                    </Dropdown.Item>,
                );
            });
        }

        setChildren(children);
    };

    return (
        <>
            <Dropdown onOpenChange={(open) => {
                if (open) {
                    f();
                }
            }}
            >
                <Dropdown.Trigger>
                    <WhiteBox>
                        Categories
                    </WhiteBox>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                    <Dropdown.Menu>
                        <Dropdown.Section>
                            <Header>Categories</Header>
                            {children}
                        </Dropdown.Section>
                        <Dropdown.Section>
                            <Header>Manage</Header>
                            <Dropdown.Item key="manageCategories" onAction={() => modalDisclosure.setOpen(true)}>
                                <Label>
                                    Manage Categories
                                </Label>
                            </Dropdown.Item>
                        </Dropdown.Section>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>

            <ManageCategoriesModal disclosure={modalDisclosure} />
        </>
    );
}
