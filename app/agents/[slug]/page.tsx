import { notFound } from "next/navigation";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bot, FileText, Copy, Check, Terminal } from "lucide-react";
import { getAgentBySlug, getAllAgents } from "@/lib/content";
import { CopyButton } from "@/components/copy-button";
import { MarkdownContent } from "@/components/markdown-content";
import { cn } from "@/lib/utils";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const agents = getAllAgents();
    return agents.map((agent) => ({
        slug: agent.slug,
    }));
}

export default async function AgentDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const agent = getAgentBySlug(slug);

    if (!agent) {
        notFound();
    }

    const { frontmatter, content, rawContent, lineCount, filePath } = agent;
    const tools = frontmatter.tools?.split(',').map(t => t.trim()) || [];

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
                {/* Back Button */}
                <Link href="/">
                    <Button variant="ghost" className="mb-8 text-[#a1a1a6] hover:text-white">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to browse
                    </Button>
                </Link>

                {/* Header */}
                <div className="flex items-start gap-6 mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Bot className="w-10 h-10 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                {frontmatter.model || 'ai'}
                            </Badge>
                            <div className="flex items-center gap-1.5 text-sm text-[#a1a1a6]">
                                <FileText className="w-4 h-4" />
                                <span>{lineCount} lines</span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-heading mb-2">{frontmatter.name}</h1>
                        <p className="text-lg text-body">{frontmatter.description}</p>
                    </div>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {tools.map((tool) => (
                        <Badge key={tool} variant="outline" className="bg-[#3a3a3c] border-[#48484a] text-[#e5e5e5]">
                            {tool}
                        </Badge>
                    ))}
                </div>

                {/* Usage */}
                <GlassCard className="p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-emerald-400" />
                            <h2 className="text-lg font-semibold text-heading">Usage</h2>
                        </div>
                    </div>
                    <div className="glass-card rounded-xl p-4 font-mono text-sm">
                        <p className="text-[#a1a1a6] mb-2"># Invoke this agent in your AI assistant:</p>
                        <p className="text-emerald-400">@{slug} [your request here]</p>
                    </div>
                </GlassCard>

                {/* Content */}
                <GlassCard className="p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-heading">Agent Instructions</h2>
                    </div>
                    <div className="prose prose-invert prose-sm max-w-none">
                        <MarkdownContent content={content} />
                    </div>
                </GlassCard>

                {/* Raw File */}
                <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-400" />
                            <h2 className="text-lg font-semibold text-heading">Raw File</h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-[#a1a1a6]">{filePath}</span>
                            <CopyButton text={rawContent} />
                        </div>
                    </div>
                    <div className="glass-card rounded-xl p-4 max-h-[400px] overflow-auto">
                        <pre className="text-xs text-body font-mono whitespace-pre-wrap">
                            {rawContent}
                        </pre>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
