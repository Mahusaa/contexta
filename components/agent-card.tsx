"use client";

import * as React from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Bot, FileText } from "lucide-react";
import type { ContentFile, AgentFrontmatter } from "@/lib/content";
import { cn } from "@/lib/utils";

interface AgentCardProps {
    agent: ContentFile<AgentFrontmatter>;
}

export function AgentCard({ agent }: AgentCardProps) {
    const { frontmatter, lineCount, slug } = agent;
    const tools = frontmatter.tools?.split(',').map(t => t.trim()) || [];

    return (
        <Link href={`/agents/${slug}`}>
            <GlassCard variant="interactive" className="p-6 group h-full">
                <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        "bg-gradient-to-br from-emerald-500/20 to-teal-500/20",
                        "border border-emerald-500/20"
                    )}>
                        <Bot className="w-6 h-6 text-emerald-400" />
                    </div>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                        {frontmatter.model || 'ai'}
                    </Badge>
                </div>

                <h3 className="text-lg font-semibold text-heading mb-2 group-hover:text-emerald-300 transition-colors">
                    {frontmatter.name}
                </h3>
                <p className="text-sm text-body mb-4 line-clamp-2">
                    {frontmatter.description}
                </p>

                <div className="space-y-2 mb-5">
                    <p className="text-xs text-muted-custom uppercase tracking-wider">Tools</p>
                    <div className="flex flex-wrap gap-1.5">
                        {tools.slice(0, 4).map((tool) => (
                            <span
                                key={tool}
                                className="text-xs text-[#e5e5e5] bg-[#3a3a3c] px-2 py-0.5 rounded-md"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5 text-[#a1a1a6]">
                        <FileText className="w-4 h-4" />
                        <span>{lineCount} lines</span>
                    </div>
                    <div className="flex items-center text-[#a1a1a6] group-hover:text-emerald-400 transition-colors">
                        <span>View</span>
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </GlassCard>
        </Link>
    );
}
