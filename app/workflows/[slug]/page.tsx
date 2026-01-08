import { notFound } from "next/navigation";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, CheckCircle2, Workflow } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { Workflow as WorkflowType } from "@/types";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

import workflowsData from "@/data/workflows.json";

const workflows = workflowsData as WorkflowType[];

interface PageProps {
    params: Promise<{ slug: string }>;
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

export async function generateStaticParams() {
    return workflows.map((workflow) => ({
        slug: workflow.slug,
    }));
}

export default async function WorkflowDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const workflow = workflows.find((w) => w.slug === slug);

    if (!workflow) {
        notFound();
    }

    const IconComponent = getIcon(workflow.icon);

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Spotlights */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent" />
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
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center shrink-0">
                        <IconComponent className="w-10 h-10 text-blue-400" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                                {workflow.category}
                            </Badge>
                            <Badge variant="secondary" className={difficultyColors[workflow.difficulty]}>
                                {workflow.difficulty}
                            </Badge>
                        </div>
                        <h1 className="text-3xl font-bold text-heading mb-2">{workflow.name}</h1>
                        <p className="text-lg text-body">{workflow.description}</p>
                    </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center gap-2 text-body">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span>{workflow.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-body">
                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                        <span>{workflow.steps.length} steps</span>
                    </div>
                </div>

                {/* Steps */}
                <GlassCard className="p-6">
                    <h2 className="text-lg font-semibold text-heading mb-6">Workflow Steps</h2>

                    <div className="space-y-4">
                        {workflow.steps.map((step, index) => (
                            <div key={index} className="relative">
                                {/* Connector line */}
                                {index < workflow.steps.length - 1 && (
                                    <div className="absolute left-5 top-12 bottom-0 w-px bg-gradient-to-b from-blue-500/30 to-transparent" />
                                )}

                                <div className="flex gap-4">
                                    {/* Step number */}
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                                        "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
                                        "border border-blue-500/20 text-blue-400 font-semibold"
                                    )}>
                                        {index + 1}
                                    </div>

                                    {/* Step content */}
                                    <div className="flex-1 glass-card rounded-xl p-4">
                                        <h3 className="font-medium text-heading mb-1">{step.title}</h3>
                                        <p className="text-sm text-body mb-3">{step.description}</p>
                                        {step.action && (
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 text-xs text-blue-400 font-mono">
                                                {step.action}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Start Button */}
                <div className="mt-8 text-center">
                    <Button
                        size="lg"
                        className={cn(
                            "px-8 py-6 h-auto rounded-xl",
                            "bg-gradient-to-r from-blue-600 to-cyan-600",
                            "hover:from-blue-500 hover:to-cyan-500",
                            "text-white font-medium text-lg",
                            "shadow-lg shadow-blue-500/20",
                            "transition-all duration-300"
                        )}
                    >
                        Start Workflow
                    </Button>
                </div>
            </div>
        </div>
    );
}
