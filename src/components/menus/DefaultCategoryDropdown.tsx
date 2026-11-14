"use client";
import { Dropdown, Header, Label } from "@heroui/react";
import { useState, type ReactNode } from "react";
import WhiteBox from "../WhiteBox";
import { getAllCategories } from "../../utils/api";
import { Status } from "../../utils/enums/Status";
import type { Category } from "../../utils/interfaces/Category";
import { updateSetting } from "../../utils/config";

export default function DefaultCategoryDropdown() {
    const [children, setChildren] = useState<ReactNode[]>();

    const onItemOpen = (category: Category) => {
        updateSetting("defaultCategory", category);
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
                        Default Category
                    </WhiteBox>
                </Dropdown.Trigger>
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
