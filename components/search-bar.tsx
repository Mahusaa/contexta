"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search...", className }: SearchBarProps) {
    return (
        <div className={cn("relative", className)}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#a1a1a6]" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={cn(
                    "w-full h-12 pl-12 pr-4 rounded-xl",
                    "glass-card border-[#3a3a3c]",
                    "text-white placeholder:text-[#a1a1a6]",
                    "focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/30",
                    "transition-all duration-300"
                )}
            />
        </div>
    );
}
