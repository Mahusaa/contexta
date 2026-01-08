"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { CategoryType } from "@/types";

interface CategoryTabsProps {
    value: CategoryType;
    onValueChange: (value: CategoryType) => void;
    className?: string;
}

const categories: { value: CategoryType; label: string }[] = [
    { value: "agents", label: "Agents" },
    { value: "skills", label: "Skills" },
    { value: "workflows", label: "Workflows" },
];

export function CategoryTabs({ value, onValueChange, className }: CategoryTabsProps) {
    return (
        <Tabs value={value} onValueChange={(v) => onValueChange(v as CategoryType)} className={className}>
            <TabsList className="glass-card h-12 p-1 gap-1 bg-transparent border border-[#3a3a3c]">
                {categories.map((category) => (
                    <TabsTrigger
                        key={category.value}
                        value={category.value}
                        className={cn(
                            "px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                            "data-[state=inactive]:text-[#a1a1a6] data-[state=inactive]:hover:text-white",
                            "data-[state=inactive]:bg-transparent",
                            "data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/20 data-[state=active]:to-amber-500/20",
                            "data-[state=active]:text-white data-[state=active]:shadow-lg",
                            "data-[state=active]:border data-[state=active]:border-orange-500/30"
                        )}
                    >
                        {category.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}
