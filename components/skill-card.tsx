"use client";

import * as React from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ChevronRight, Box } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { Skill } from "@/types";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SkillCardProps {
    skill: Skill;
    onInstall: (skill: Skill) => void;
}

// Helper to safely get icons
const getIcon = (iconName: string): LucideIcon => {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Box;
};

export function SkillCard({ skill, onInstall }: SkillCardProps) {
    const IconComponent = getIcon(skill.icon);

    return (
        <GlassCard variant="interactive" className="p-6 group">
            <div className="flex items-start justify-between mb-4">
                <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    "bg-gradient-to-br from-orange-500/20 to-amber-500/20",
                    "border border-orange-500/20"
                )}>
                    <IconComponent className="w-6 h-6 text-orange-400" />
                </div>
                <Badge variant="secondary" className="bg-[#3a3a3c] text-[#a1a1a6] border-[#48484a]">
                    v{skill.version}
                </Badge>
            </div>

            <h3 className="text-lg font-semibold text-heading mb-2 group-hover:text-orange-300 transition-colors">
                {skill.name}
            </h3>
            <p className="text-sm text-body mb-4 line-clamp-2">
                {skill.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
                {skill.tags.slice(0, 3).map((tag) => (
                    <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs bg-[#3a3a3c] border-[#48484a] text-[#a1a1a6]"
                    >
                        {tag}
                    </Badge>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onInstall(skill);
                    }}
                    size="sm"
                    className={cn(
                        "flex-1 h-9 rounded-xl",
                        "bg-gradient-to-r from-orange-600 to-amber-600",
                        "hover:from-orange-500 hover:to-amber-500",
                        "text-white font-medium",
                        "shadow-lg shadow-orange-500/20",
                        "transition-all duration-300"
                    )}
                >
                    <Download className="w-4 h-4 mr-2" />
                    Install
                </Button>
                <Link href={`/skills/${skill.slug}`}>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 rounded-xl bg-[#3a3a3c] hover:bg-[#48484a] text-[#a1a1a6]"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </GlassCard>
    );
}
