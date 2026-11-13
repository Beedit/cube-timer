"use client";
import { Dropdown, Header, Label } from "@heroui/react";
import { useContext, useState, type ReactNode } from "react";
import WhiteBox from "./WhiteBox";
import { getAllCategories } from "../utils/api";
import { Status } from "../utils/enums/Status";
import type { Category } from "../utils/interfaces/Category";
import { SetSolveData } from "../app/page";
import { ManageCategoriesModal } from "./ManageCategoriesModal";
import { useDisclosure } from "@heroui/use-disclosure";

export default function CategoryDropdown() {
    const modalDisclosure = useDisclosure();
    const [children, setChildren] = useState<ReactNode[]>();
    const setSolveData = useContext(SetSolveData);

    const f = async () => {
        const children: ReactNode[] = [];
        const categories = await getAllCategories();

        if (categories.status == Status.Success && Array.isArray(categories.result)) {
            categories.result.forEach((category: Category) => {
                children.push(
                    <Dropdown.Item
                      key={category.categoryName}
                      onAction={() => {
                            setSolveData({ type: "category", data: category.categoryName });
                            setSolveData({ type: "puzzle", data: category.puzzleType });
                            setSolveData({ type: "nextScramble" });
                        }}
                    >
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
                            <Dropdown.Item key="manageCategories" onAction={() => { modalDisclosure.onOpen(); }}>
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
