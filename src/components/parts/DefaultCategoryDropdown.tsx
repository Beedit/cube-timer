"use client";
import { Button, Dropdown, Header, Label } from "@heroui/react";
import { useContext, useEffect, useState, type ReactNode } from "react";
import type { Category } from "../../utils/interfaces/Category";
import { updateSetting } from "../../utils/config";
import { ArrowIcon } from "../icons/icons";
import { CategoryData } from "../../utils/data";

export default function DefaultCategoryDropdown() {
    const [children, setChildren] = useState<ReactNode[]>();
    const categories = useContext(CategoryData);

    const onItemClick = (category: Category) => {
        updateSetting("defaultCategory", category);
    };

    useEffect(() => {
        const f = () => {
            const nodes: ReactNode[] = [];

            categories.forEach((category: Category) => {
                nodes.push(
                    <Dropdown.Item key={category.categoryName} onAction={() => onItemClick(category)}>
                        <Label>
                            {category.categoryName}
                        </Label>
                    </Dropdown.Item>,
                );
            });

            setChildren(nodes);
        };

        f();
    }, [categories]);

    return (
        <>
            <Dropdown>
                <Button>
                    Select
                    <ArrowIcon />
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu>
                        <Dropdown.Section>
                            <Header>Categories</Header>
                            {children}
                        </Dropdown.Section>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
        </>
    );
}
