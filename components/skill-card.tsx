"use client";

import * as React from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ChevronRight, Wrench, FileText } from "lucide-react";
import type { ContentFile, SkillFrontmatter } from "@/lib/content";
import { cn } from "@/lib/utils";

interface SkillCardProps {
    skill: ContentFile<SkillFrontmatter>;
    onInstall: (skill: ContentFile<SkillFrontmatter>) => void;
}

export function SkillCard({ skill, onInstall }: SkillCardProps) {
    const { frontmatter, lineCount, slug } = skill;

    return (
        <GlassCard variant="interactive" className="p-6 group">
            <div className="flex items-start justify-between mb-4">
                <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    "bg-gradient-to-br from-orange-500/20 to-amber-500/20",
                    "border border-orange-500/20"
                )}>
                    <Wrench className="w-6 h-6 text-orange-400" />
                </div>
                <Badge variant="secondary" className="bg-[#3a3a3c] text-[#a1a1a6] border-[#48484a]">
                    v{frontmatter.version || '1.0.0'}
                </Badge>
            </div>

            <h3 className="text-lg font-semibold text-heading mb-2 group-hover:text-orange-300 transition-colors">
                {frontmatter.name}
            </h3>
            <p className="text-sm text-body mb-4 line-clamp-2">
                {frontmatter.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {frontmatter.tags?.slice(0, 3).map((tag) => (
                    <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs bg-[#3a3a3c] border-[#48484a] text-[#a1a1a6]"
                    >
                        {tag}
                    </Badge>
                ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-[#a1a1a6] mb-4">
                <FileText className="w-4 h-4" />
                <span>{lineCount} lines</span>
                <span className="text-[#48484a]">•</span>
                <span>{frontmatter.author || 'Unknown'}</span>
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
                <Link href={`/skills/${slug}`}>
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
