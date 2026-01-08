"use client";

import * as React from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Clock, Workflow } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { Workflow as WorkflowType } from "@/types";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface WorkflowCardProps {
    workflow: WorkflowType;
}

const difficultyColors = {
    beginner: "bg-green-500/10 text-green-400 border-green-500/20",
    intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    advanced: "bg-red-500/10 text-red-400 border-red-500/20",
};

// Helper to safely get icons
const getIcon = (iconName: string): LucideIcon => {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Workflow;
};

export function WorkflowCard({ workflow }: WorkflowCardProps) {
    const IconComponent = getIcon(workflow.icon);

    return (
        <Link href={`/workflows/${workflow.slug}`}>
            <GlassCard variant="interactive" className="p-6 group h-full">
                <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
                        "border border-blue-500/20"
                    )}>
                        <IconComponent className="w-6 h-6 text-blue-400" />
                    </div>
                    <Badge variant="secondary" className={difficultyColors[workflow.difficulty]}>
                        {workflow.difficulty}
                    </Badge>
                </div>

                <h3 className="text-lg font-semibold text-heading mb-2 group-hover:text-blue-300 transition-colors">
                    {workflow.name}
                </h3>
                <p className="text-sm text-body mb-4 line-clamp-2">
                    {workflow.description}
                </p>

                <div className="flex items-center gap-4 mb-5">
                    <div className="flex items-center gap-1.5 text-sm text-[#a1a1a6]">
                        <Clock className="w-4 h-4" />
                        <span>{workflow.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                        <span>{workflow.steps.length} steps</span>
                    </div>
                </div>

                <div className="space-y-2 mb-5">
                    <div className="flex gap-1">
                        {workflow.steps.slice(0, 4).map((_, i) => (
                            <div
                                key={i}
                                className="h-1 flex-1 rounded-full bg-gradient-to-r from-blue-500/40 to-cyan-500/40"
                            />
                        ))}
                        {workflow.steps.length > 4 && (
                            <div className="h-1 flex-1 rounded-full bg-[#3a3a3c]" />
                        )}
                    </div>
                </div>

                <div className="flex items-center text-sm text-[#a1a1a6] group-hover:text-blue-400 transition-colors">
                    <span>Start workflow</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
            </GlassCard>
        </Link>
    );
}
