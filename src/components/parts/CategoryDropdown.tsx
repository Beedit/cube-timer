"use client";
import { Button, Dropdown, Header, Label, useOverlayState } from "@heroui/react";
import { useContext, useState, type ReactNode } from "react";
import type { Category } from "../../utils/interfaces/Category";
import { ManageCategoriesModal } from "../menus/ManageCategoriesModal";
import { ArrowIcon } from "../icons/icons";
import { CategoryData, SetTimeData } from "../../utils/data";

export default function CategoryDropdown() {
    const modalState = useOverlayState();
    const [children, setChildren] = useState<ReactNode[]>();
    const setTimeData = useContext(SetTimeData);
    const categories = useContext(CategoryData);

    const onItemOpen = (category: Category) => {
        setTimeData({ type: "category", data: category });
        setTimeData({ type: "nextScramble" });
    };

    const f = async () => {
        const children: ReactNode[] = [];

        categories.forEach((category: Category) => {
            children.push(
                <Dropdown.Item key={category.categoryName} onAction={() => onItemOpen(category)}>
                    <Label>
                        {category.categoryName}
                    </Label>
                </Dropdown.Item>,
            );
        });

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
                    <ArrowIcon />
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
