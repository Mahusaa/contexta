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
    FileCode,
    Download,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import type { Skill } from "@/types";
import { cn } from "@/lib/utils";

interface InstallModalProps {
    skill: Skill | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function InstallModal({ skill, open, onOpenChange }: InstallModalProps) {
    const [copiedCommand, setCopiedCommand] = React.useState(false);
    const [copiedFile, setCopiedFile] = React.useState<string | null>(null);
    const [expandedFile, setExpandedFile] = React.useState<string | null>(null);

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

    if (!skill) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="glass-card-elevated border-[#48484a] max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-heading flex items-center gap-3">
                        <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center",
                            "bg-gradient-to-br from-orange-500/20 to-amber-500/20",
                            "border border-orange-500/20"
                        )}>
                            <Download className="w-5 h-5 text-orange-400" />
                        </div>
                        Install {skill.name}
                    </DialogTitle>
                    <DialogDescription className="text-[#a1a1a6]">
                        Copy the installation command or individual files to your project.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* Quick Install Command */}
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
                                {skill.installCommand}
                            </div>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(skill.installCommand, "command")}
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

                    {/* Manual Installation - Files */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-heading">
                            <FileCode className="w-4 h-4 text-blue-400" />
                            Manual Installation
                        </div>
                        <p className="text-xs text-[#a1a1a6]">
                            Or copy these files directly to your project:
                        </p>

                        <div className="space-y-2">
                            {skill.files.map((file) => (
                                <div key={file.path} className="glass-card rounded-xl overflow-hidden">
                                    <div
                                        className="flex items-center justify-between p-3 cursor-pointer hover:bg-[#3a3a3c] transition-colors"
                                        onClick={() => setExpandedFile(expandedFile === file.path ? null : file.path)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileCode className="w-4 h-4 text-[#a1a1a6]" />
                                            <div>
                                                <p className="text-sm font-mono text-body">{file.path}</p>
                                                <p className="text-xs text-[#a1a1a6]">{file.description}</p>
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
                                                className="h-8 px-3 rounded-lg bg-[#3a3a3c] hover:bg-[#48484a] text-xs"
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
                                                <ChevronDown className="w-4 h-4 text-[#a1a1a6]" />
                                            )}
                                        </div>
                                    </div>

                                    {expandedFile === file.path && (
                                        <div className="border-t border-[#3a3a3c] p-4 bg-[#1c1c1e]">
                                            <pre className="text-xs text-body font-mono whitespace-pre-wrap overflow-x-auto">
                                                {file.content}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dependencies */}
                    {skill.dependencies && skill.dependencies.length > 0 && (
                        <div className="space-y-3">
                            <div className="text-sm font-medium text-heading">Dependencies</div>
                            <div className="flex flex-wrap gap-2">
                                {skill.dependencies.map((dep) => (
                                    <Badge
                                        key={dep}
                                        variant="outline"
                                        className="bg-[#3a3a3c] border-[#48484a] text-[#e5e5e5]"
                                    >
                                        {dep}
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
