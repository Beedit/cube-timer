"use client";
import { Button, Dropdown, Header, Label, useOverlayState } from "@heroui/react";
import { useContext, useState, type ReactNode } from "react";
import WhiteBox from "../WhiteBox";
import { getAllCategories } from "../../utils/api";
import { Status } from "../../utils/enums/Status";
import type { Category } from "../../utils/interfaces/Category";
import { SetSolveData } from "../../app/page";
import { ManageCategoriesModal } from "./ManageCategoriesModal";

export default function CategoryDropdown() {
    const modalState = useOverlayState();
    const [children, setChildren] = useState<ReactNode[]>();
    const setSolveData = useContext(SetSolveData);

    const onItemOpen = (category: Category) => {
        setSolveData({ type: "category", data: category });
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
                <Button fullWidth>
                    Categories
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu>
                        <Dropdown.Section>
                            <Header>Categories</Header>
                            {children}
                        </Dropdown.Section>
                        <Dropdown.Section>
                            <Header>Manage</Header>
                            <Dropdown.Item key="manageCategories" onAction={() => modalState.setOpen(true)}>
                                <Label>
                                    Manage Categories
                                </Label>
                            </Dropdown.Item>
                        </Dropdown.Section>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>

            <ManageCategoriesModal disclosure={modalState} />
        </>
    );
}
