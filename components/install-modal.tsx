"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Copy,
    Check,
    Terminal,
    FileText,
    Download,
} from "lucide-react";
import type { ContentFile, SkillFrontmatter } from "@/lib/content";
import { cn } from "@/lib/utils";

interface InstallModalProps {
    skill: ContentFile<SkillFrontmatter> | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function InstallModal({ skill, open, onOpenChange }: InstallModalProps) {
    const [copiedCommand, setCopiedCommand] = React.useState(false);
    const [copiedContent, setCopiedContent] = React.useState(false);

    const copyToClipboard = async (text: string, type: "command" | "content") => {
        await navigator.clipboard.writeText(text);
        if (type === "command") {
            setCopiedCommand(true);
            setTimeout(() => setCopiedCommand(false), 2000);
        } else {
            setCopiedContent(true);
            setTimeout(() => setCopiedContent(false), 2000);
        }
    };

    if (!skill) return null;

    const { frontmatter, rawContent, filePath, lineCount } = skill;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="glass-card-elevated border-[#48484a] max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-heading flex items-center gap-3">
                        <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center",
                            "bg-gradient-to-br from-orange-500/20 to-amber-500/20",
                            "border border-orange-500/20"
                        )}>
                            <Download className="w-5 h-5 text-orange-400" />
                        </div>
                        Install {frontmatter.name}
                    </DialogTitle>
                    <DialogDescription className="text-[#a1a1a6]">
                        Copy the installation command or the entire file content to your project.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4 overflow-y-auto">
                    {/* Quick Install Command */}
                    {frontmatter.installCommand && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm font-medium text-heading">
                                <Terminal className="w-4 h-4 text-orange-400" />
                                Quick Install
                            </div>
                            <div className="relative">
                                <div className={cn(
                                    "glass-card rounded-xl p-4 pr-14 font-mono text-sm",
                                    "text-emerald-400 overflow-x-auto"
                                )}>
                                    {frontmatter.installCommand}
                                </div>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => copyToClipboard(frontmatter.installCommand || '', "command")}
                                    className={cn(
                                        "absolute right-2 top-1/2 -translate-y-1/2",
                                        "h-9 w-9 p-0 rounded-lg",
                                        "bg-[#3a3a3c] hover:bg-[#48484a]"
                                    )}
                                >
                                    {copiedCommand ? (
                                        <Check className="w-4 h-4 text-emerald-400" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-[#a1a1a6]" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* File Content */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-medium text-heading">
                                <FileText className="w-4 h-4 text-blue-400" />
                                File Content
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-[#a1a1a6]">{filePath} • {lineCount} lines</span>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => copyToClipboard(rawContent, "content")}
                                    className="h-8 px-3 rounded-lg bg-[#3a3a3c] hover:bg-[#48484a] text-xs"
                                >
                                    {copiedContent ? (
                                        <>
                                            <Check className="w-3 h-3 mr-1.5 text-emerald-400" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3 h-3 mr-1.5" />
                                            Copy All
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="glass-card rounded-xl p-4 max-h-[300px] overflow-auto">
                            <pre className="text-xs text-body font-mono whitespace-pre-wrap">
                                {rawContent}
                            </pre>
                        </div>
                    </div>

                    {/* Tags */}
                    {frontmatter.tags && frontmatter.tags.length > 0 && (
                        <div className="space-y-3">
                            <div className="text-sm font-medium text-heading">Tags</div>
                            <div className="flex flex-wrap gap-2">
                                {frontmatter.tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="outline"
                                        className="bg-[#3a3a3c] border-[#48484a] text-[#e5e5e5]"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
