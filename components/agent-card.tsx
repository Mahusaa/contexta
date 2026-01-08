"use client";

import * as React from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Bot } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { Agent } from "@/types";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface AgentCardProps {
    agent: Agent;
}

// Helper to safely get icons
const getIcon = (iconName: string): LucideIcon => {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Bot;
};

export function AgentCard({ agent }: AgentCardProps) {
    const IconComponent = getIcon(agent.icon);

    return (
        <Link href={`/agents/${agent.slug}`}>
            <GlassCard variant="interactive" className="p-6 group h-full">
                <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        "bg-gradient-to-br from-emerald-500/20 to-teal-500/20",
                        "border border-emerald-500/20"
                    )}>
                        <IconComponent className="w-6 h-6 text-emerald-400" />
                    </div>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                        {agent.category}
                    </Badge>
                </div>

                <h3 className="text-lg font-semibold text-heading mb-2 group-hover:text-emerald-300 transition-colors">
                    {agent.name}
                </h3>
                <p className="text-sm text-body mb-4 line-clamp-2">
                    {agent.description}
                </p>

                <div className="space-y-2 mb-5">
                    <p className="text-xs text-muted-custom uppercase tracking-wider">Capabilities</p>
                    <div className="flex flex-wrap gap-1.5">
                        {agent.capabilities.slice(0, 3).map((cap) => (
                            <span
                                key={cap}
                                className="text-xs text-[#e5e5e5] bg-[#3a3a3c] px-2 py-0.5 rounded-md"
                            >
                                {cap}
                            </span>
                        ))}
                        {agent.capabilities.length > 3 && (
                            <span className="text-xs text-[#a1a1a6]">
                                +{agent.capabilities.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center text-sm text-[#a1a1a6] group-hover:text-emerald-400 transition-colors">
                    <span>View details</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
            </GlassCard>
        </Link>
    );
}
