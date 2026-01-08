import { notFound } from "next/navigation";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Target, Bot } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { Agent } from "@/types";
import type { LucideIcon } from "lucide-react";

import agentsData from "@/data/agents.json";

const agents = agentsData as Agent[];

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Helper to safely get icons
const getIcon = (iconName: string): LucideIcon => {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Bot;
};

export async function generateStaticParams() {
    return agents.map((agent) => ({
        slug: agent.slug,
    }));
}

export default async function AgentDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const agent = agents.find((a) => a.slug === slug);

    if (!agent) {
        notFound();
    }

    const IconComponent = getIcon(agent.icon);

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Spotlights */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent" />
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
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <IconComponent className="w-10 h-10 text-emerald-400" />
                    </div>
                    <div>
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-3">
                            {agent.category}
                        </Badge>
                        <h1 className="text-3xl font-bold text-heading mb-2">{agent.name}</h1>
                        <p className="text-lg text-body">{agent.description}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Capabilities */}
                    <GlassCard className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                            <h2 className="text-lg font-semibold text-heading">Capabilities</h2>
                        </div>
                        <ul className="space-y-3">
                            {agent.capabilities.map((capability, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                                    <span className="text-body">{capability}</span>
                                </li>
                            ))}
                        </ul>
                    </GlassCard>

                    {/* Use Cases */}
                    <GlassCard className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Target className="w-5 h-5 text-teal-400" />
                            <h2 className="text-lg font-semibold text-heading">Use Cases</h2>
                        </div>
                        <ul className="space-y-3">
                            {agent.useCases.map((useCase, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                                    <span className="text-body">{useCase}</span>
                                </li>
                            ))}
                        </ul>
                    </GlassCard>
                </div>

                {/* How to Use */}
                <GlassCard className="p-6 mt-6">
                    <h2 className="text-lg font-semibold text-heading mb-4">How to Use</h2>
                    <div className="glass-card rounded-xl p-4 font-mono text-sm">
                        <p className="text-zinc-500 mb-2"># Invoke this agent in your AI assistant:</p>
                        <p className="text-emerald-400">@{agent.slug} [your request here]</p>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
