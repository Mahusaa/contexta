import { notFound } from "next/navigation";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GitBranch, FileText, Clock } from "lucide-react";
import { getWorkflowBySlug, getAllWorkflows } from "@/lib/content";
import { CopyButton } from "@/components/copy-button";
import { MarkdownContent } from "@/components/markdown-content";
import { cn } from "@/lib/utils";

interface PageProps {
    params: Promise<{ slug: string }>;
}

const difficultyColors = {
    beginner: "bg-green-500/10 text-green-400 border-green-500/20",
    intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    advanced: "bg-red-500/10 text-red-400 border-red-500/20",
};

export async function generateStaticParams() {
    const workflows = getAllWorkflows();
    return workflows.map((workflow) => ({
        slug: workflow.slug,
    }));
}

export default async function WorkflowDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const workflow = getWorkflowBySlug(slug);

    if (!workflow) {
        notFound();
    }

    const { frontmatter, content, rawContent, lineCount, filePath } = workflow;
    const difficulty = frontmatter.difficulty || 'beginner';

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent" />
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
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center shrink-0">
                        <GitBranch className="w-10 h-10 text-blue-400" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <Badge variant="secondary" className={difficultyColors[difficulty]}>
                                {difficulty}
                            </Badge>
                            <div className="flex items-center gap-1.5 text-sm text-[#a1a1a6]">
                                <Clock className="w-4 h-4" />
                                <span>{frontmatter.estimatedTime || '30 min'}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-[#a1a1a6]">
                                <FileText className="w-4 h-4" />
                                <span>{lineCount} lines</span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-heading mb-2">{frontmatter.name}</h1>
                        <p className="text-lg text-body">{frontmatter.description}</p>
                    </div>
                </div>

                {/* Workflow Content */}
                <GlassCard className="p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-heading">Workflow Guide</h2>
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
                            <CopyButton text={rawContent} label="Copy All" />
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
