import { notFound } from "next/navigation";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wrench, FileText, Terminal } from "lucide-react";
import { getSkillBySlug, getAllSkills } from "@/lib/content";
import { CopyButton } from "@/components/copy-button";
import { MarkdownContent } from "@/components/markdown-content";
import { cn } from "@/lib/utils";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const skills = getAllSkills();
    return skills.map((skill) => ({
        slug: skill.slug,
    }));
}

export default async function SkillDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const skill = getSkillBySlug(slug);

    if (!skill) {
        notFound();
    }

    const { frontmatter, content, rawContent, lineCount, filePath } = skill;

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent" />
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
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/20 flex items-center justify-center shrink-0">
                        <Wrench className="w-10 h-10 text-orange-400" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-400 border-orange-500/20">
                                v{frontmatter.version || '1.0.0'}
                            </Badge>
                            <div className="flex items-center gap-1.5 text-sm text-[#a1a1a6]">
                                <FileText className="w-4 h-4" />
                                <span>{lineCount} lines</span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-heading mb-2">{frontmatter.name}</h1>
                        <p className="text-lg text-body mb-2">{frontmatter.description}</p>
                        <p className="text-sm text-[#a1a1a6]">by {frontmatter.author || 'Unknown'}</p>
                    </div>
                </div>

                {/* Tags */}
                {frontmatter.tags && frontmatter.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {frontmatter.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-[#3a3a3c] border-[#48484a] text-[#e5e5e5]">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Install Command */}
                {frontmatter.installCommand && (
                    <GlassCard className="p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-orange-400" />
                                <h2 className="text-lg font-semibold text-heading">Quick Install</h2>
                            </div>
                            <CopyButton text={frontmatter.installCommand} />
                        </div>
                        <div className="glass-card rounded-xl p-4 font-mono text-sm text-emerald-400 overflow-x-auto">
                            {frontmatter.installCommand}
                        </div>
                    </GlassCard>
                )}

                {/* Documentation */}
                <GlassCard className="p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-heading">Documentation</h2>
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
