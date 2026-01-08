"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Copy,
    Check,
    Terminal,
    FileCode,
    Package,
    ChevronDown,
    ChevronUp,
    Box
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { Skill } from "@/types";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

import skillsData from "@/data/skills.json";

const skills = skillsData as Skill[];

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Helper to safely get icons
const getIcon = (iconName: string): LucideIcon => {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Box;
};

export default function SkillDetailPage({ params }: PageProps) {
    const resolvedParams = React.use(params);
    const skill = skills.find((s) => s.slug === resolvedParams.slug);

    const [copiedCommand, setCopiedCommand] = React.useState(false);
    const [copiedFile, setCopiedFile] = React.useState<string | null>(null);
    const [expandedFile, setExpandedFile] = React.useState<string | null>(null);

    if (!skill) {
        notFound();
    }

    const IconComponent = getIcon(skill.icon);

    const copyToClipboard = async (text: string, type: "command" | "file", filePath?: string) => {
        await navigator.clipboard.writeText(text);
        if (type === "command") {
            setCopiedCommand(true);
            setTimeout(() => setCopiedCommand(false), 2000);
        } else if (filePath) {
            setCopiedFile(filePath);
            setTimeout(() => setCopiedFile(null), 2000);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Spotlights */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
                {/* Back Button */}
                <Link href="/">
                    <Button variant="ghost" className="mb-8 text-zinc-500 hover:text-zinc-200">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to browse
                    </Button>
                </Link>

                {/* Header */}
                <div className="flex items-start gap-6 mb-10">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/20 flex items-center justify-center shrink-0">
                        <IconComponent className="w-10 h-10 text-orange-400" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-400 border-orange-500/20">
                                {skill.category}
                            </Badge>
                            <Badge variant="outline" className="bg-zinc-800/50 text-zinc-400 border-zinc-700/50">
                                v{skill.version}
                            </Badge>
                        </div>
                        <h1 className="text-3xl font-bold text-heading mb-2">{skill.name}</h1>
                        <p className="text-lg text-body mb-3">{skill.description}</p>
                        <p className="text-sm text-zinc-500">by {skill.author}</p>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {skill.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-zinc-800/50 border-zinc-700/50 text-zinc-400">
                            {tag}
                        </Badge>
                    ))}
                </div>

                {/* Quick Install */}
                <GlassCard className="p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Terminal className="w-5 h-5 text-orange-400" />
                        <h2 className="text-lg font-semibold text-heading">Quick Install</h2>
                    </div>
                    <div className="relative">
                        <div className={cn(
                            "glass-card rounded-xl p-4 pr-14 font-mono text-sm",
                            "text-emerald-400 overflow-x-auto"
                        )}>
                            {skill.installCommand}
                        </div>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(skill.installCommand, "command")}
                            className={cn(
                                "absolute right-2 top-1/2 -translate-y-1/2",
                                "h-9 w-9 p-0 rounded-lg",
                                "bg-zinc-800/50 hover:bg-zinc-700/50"
                            )}
                        >
                            {copiedCommand ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                                <Copy className="w-4 h-4 text-zinc-400" />
                            )}
                        </Button>
                    </div>
                </GlassCard>

                {/* Files */}
                <GlassCard className="p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <FileCode className="w-5 h-5 text-blue-400" />
                        <h2 className="text-lg font-semibold text-heading">Files</h2>
                    </div>
                    <p className="text-sm text-zinc-500 mb-4">
                        Copy these files directly to your project for manual installation:
                    </p>

                    <div className="space-y-2">
                        {skill.files.map((file) => (
                            <div key={file.path} className="glass-card rounded-xl overflow-hidden">
                                <div
                                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-800/30 transition-colors"
                                    onClick={() => setExpandedFile(expandedFile === file.path ? null : file.path)}
                                >
                                    <div className="flex items-center gap-3">
                                        <FileCode className="w-4 h-4 text-zinc-500" />
                                        <div>
                                            <p className="text-sm font-mono text-body">{file.path}</p>
                                            <p className="text-xs text-zinc-500">{file.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                copyToClipboard(file.content, "file", file.path);
                                            }}
                                            className="h-8 px-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 text-xs"
                                        >
                                            {copiedFile === file.path ? (
                                                <>
                                                    <Check className="w-3 h-3 mr-1.5 text-emerald-400" />
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-3 h-3 mr-1.5" />
                                                    Copy
                                                </>
                                            )}
                                        </Button>
                                        {expandedFile === file.path ? (
                                            <ChevronUp className="w-4 h-4 text-zinc-500" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4 text-zinc-500" />
                                        )}
                                    </div>
                                </div>

                                {expandedFile === file.path && (
                                    <div className="border-t border-zinc-700/50 p-4 bg-zinc-900/50">
                                        <pre className="text-xs text-body font-mono whitespace-pre-wrap overflow-x-auto">
                                            {file.content}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Dependencies */}
                {skill.dependencies && skill.dependencies.length > 0 && (
                    <GlassCard className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Package className="w-5 h-5 text-amber-400" />
                            <h2 className="text-lg font-semibold text-heading">Dependencies</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skill.dependencies.map((dep) => (
                                <Badge
                                    key={dep}
                                    variant="outline"
                                    className="bg-amber-500/10 border-amber-500/20 text-amber-400"
                                >
                                    {dep}
                                </Badge>
                            ))}
                        </div>
                    </GlassCard>
                )}
            </div>
        </div>
    );
}
