"use client";

import * as React from "react";
import { CategoryTabs } from "@/components/category-tabs";
import { SearchBar } from "@/components/search-bar";
import { SkillCard } from "@/components/skill-card";
import { AgentCard } from "@/components/agent-card";
import { WorkflowCard } from "@/components/workflow-card";
import { InstallModal } from "@/components/install-modal";
import { GlassCard } from "@/components/ui/glass-card";
import {
    Sparkles,
    Bot,
    Wrench,
    GitBranch,
    Terminal,
    Zap,
    ArrowRight,
    Copy,
    Check,
    Code2,
    Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CategoryType } from "@/types";
import type {
    ContentFile,
    AgentFrontmatter,
    SkillFrontmatter,
    WorkflowFrontmatter
} from "@/lib/content";

interface HomePageProps {
    agents: ContentFile<AgentFrontmatter>[];
    skills: ContentFile<SkillFrontmatter>[];
    workflows: ContentFile<WorkflowFrontmatter>[];
}

// Animated typing effect
function TypeWriter({ words, className }: { words: string[], className?: string }) {
    const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
    const [currentText, setCurrentText] = React.useState("");
    const [isDeleting, setIsDeleting] = React.useState(false);

    React.useEffect(() => {
        const word = words[currentWordIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setCurrentText(word.substring(0, currentText.length + 1));
                if (currentText === word) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setCurrentText(word.substring(0, currentText.length - 1));
                if (currentText === "") {
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => (prev + 1) % words.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, words]);

    return (
        <span className={className}>
            {currentText}
            <span className="animate-pulse">|</span>
        </span>
    );
}

// Floating preview card
function FloatingCard({
    children,
    className,
    delay = 0
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    return (
        <div
            className={`absolute animate-float ${className}`}
            style={{ animationDelay: `${delay}s` }}
        >
            {children}
        </div>
    );
}

// Interactive code snippet
function CodeSnippet() {
    const [copied, setCopied] = React.useState(false);
    const code = "npx contexta install react-component-gen";

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="glass-card rounded-xl p-4 font-mono text-sm group cursor-pointer hover:border-orange-500/30 transition-all"
            onClick={handleCopy}>
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-orange-400" />
                    <span className="text-emerald-400">{code}</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {copied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                        <Copy className="w-4 h-4 text-[#a1a1a6]" />
                    )}
                </div>
            </div>
        </div>
    );
}

// Feature highlight
function FeatureHighlight({
    icon: Icon,
    title,
    description,
    color
}: {
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
}) {
    return (
        <div className="group relative p-6 rounded-2xl glass-card hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-heading mb-2">{title}</h3>
            <p className="text-sm text-body">{description}</p>
        </div>
    );
}

export function HomePage({ agents, skills, workflows }: HomePageProps) {
    const [category, setCategory] = React.useState<CategoryType>("skills");
    const [search, setSearch] = React.useState("");
    const [selectedSkill, setSelectedSkill] = React.useState<ContentFile<SkillFrontmatter> | null>(null);
    const [installModalOpen, setInstallModalOpen] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleInstall = (skill: ContentFile<SkillFrontmatter>) => {
        setSelectedSkill(skill);
        setInstallModalOpen(true);
    };

    // Filter items based on search
    const filteredAgents = agents.filter(
        (agent) =>
            agent.frontmatter.name.toLowerCase().includes(search.toLowerCase()) ||
            agent.frontmatter.description.toLowerCase().includes(search.toLowerCase())
    );

    const filteredSkills = skills.filter(
        (skill) =>
            skill.frontmatter.name.toLowerCase().includes(search.toLowerCase()) ||
            skill.frontmatter.description.toLowerCase().includes(search.toLowerCase()) ||
            skill.frontmatter.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
    );

    const filteredWorkflows = workflows.filter(
        (workflow) =>
            workflow.frontmatter.name.toLowerCase().includes(search.toLowerCase()) ||
            workflow.frontmatter.description.toLowerCase().includes(search.toLowerCase())
    );

    const stats = [
        { icon: Bot, label: "Agents", value: agents.length, color: "from-emerald-500/20 to-teal-500/20" },
        { icon: Wrench, label: "Skills", value: skills.length, color: "from-orange-500/20 to-amber-500/20" },
        { icon: GitBranch, label: "Workflows", value: workflows.length, color: "from-blue-500/20 to-cyan-500/20" },
    ];

    const features = [
        {
            icon: Bot,
            title: "AI Agents",
            description: "Specialized AI personalities for frontend, backend, DevOps, and more.",
            color: "from-emerald-500 to-teal-500"
        },
        {
            icon: Wrench,
            title: "Installable Skills",
            description: "Copy skills directly to your project with a single command.",
            color: "from-orange-500 to-amber-500"
        },
        {
            icon: GitBranch,
            title: "Workflows",
            description: "Step-by-step guides combining agents and skills for complex tasks.",
            color: "from-blue-500 to-cyan-500"
        },
    ];

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {/* Gradient orbs */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '2s' }} />

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <header className="min-h-[90vh] flex flex-col justify-center px-6 pt-10">
                    <div className="max-w-6xl mx-auto w-full">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left side - Text content */}
                            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-body border border-orange-500/20">
                                    <Sparkles className="w-4 h-4 text-orange-400" />
                                    <span>AI-Powered Development Playbook</span>
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                </div>

                                {/* Heading */}
                                <div className="space-y-4">
                                    <h1 className="text-5xl lg:text-6xl font-bold text-heading leading-tight">
                                        Build{" "}
                                        <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                                            <TypeWriter words={["faster", "smarter", "better"]} />
                                        </span>
                                        <br />
                                        with AI assistance
                                    </h1>
                                    <p className="text-xl text-body max-w-lg">
                                        Your agency&apos;s single source of truth for AI-assisted development.
                                        Agents, skills, and workflows that your devs can install in seconds.
                                    </p>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-wrap gap-4">
                                    <Button
                                        size="lg"
                                        className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white px-8 py-6 rounded-xl text-lg font-medium shadow-lg shadow-orange-500/20 transition-all hover:scale-105"
                                        onClick={() => document.getElementById('browse')?.scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        <Zap className="w-5 h-5 mr-2" />
                                        Explore Playbook
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-[#3a3a3c] bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white px-8 py-6 rounded-xl text-lg font-medium transition-all hover:scale-105"
                                    >
                                        <Code2 className="w-5 h-5 mr-2" />
                                        View Docs
                                    </Button>
                                </div>

                                {/* Quick install example */}
                                <div className="space-y-2">
                                    <p className="text-sm text-[#a1a1a6]">Try installing a skill:</p>
                                    <CodeSnippet />
                                </div>

                                {/* Stats row */}
                                <div className="flex gap-8 pt-4">
                                    {stats.map((stat) => (
                                        <div key={stat.label} className="group cursor-pointer" onClick={() => {
                                            setCategory(stat.label.toLowerCase() as CategoryType);
                                            document.getElementById('browse')?.scrollIntoView({ behavior: 'smooth' });
                                        }}>
                                            <p className="text-3xl font-bold text-heading group-hover:text-orange-400 transition-colors">
                                                {stat.value}
                                            </p>
                                            <p className="text-sm text-[#a1a1a6] group-hover:text-white transition-colors flex items-center gap-1">
                                                {stat.label}
                                                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right side - Interactive preview */}
                            <div className={`relative h-[500px] hidden lg:block transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                                {/* Floating cards preview */}
                                <FloatingCard className="top-0 right-0 w-72" delay={0}>
                                    <GlassCard className="p-4 border-emerald-500/20">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                                                <Bot className="w-5 h-5 text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-heading text-sm">@frontend-developer</p>
                                                <p className="text-xs text-[#a1a1a6]">React Specialist</p>
                                            </div>
                                        </div>
                                        <div className="glass-card-dark rounded-lg p-3 text-xs font-mono">
                                            <span className="text-emerald-400">@frontend-developer</span>
                                            <span className="text-body"> Create a responsive navbar</span>
                                        </div>
                                    </GlassCard>
                                </FloatingCard>

                                <FloatingCard className="top-32 left-0 w-64" delay={1}>
                                    <GlassCard className="p-4 border-orange-500/20">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                                                <Wrench className="w-4 h-4 text-orange-400" />
                                            </div>
                                            <p className="font-medium text-heading text-sm">react-component-gen</p>
                                        </div>
                                        <div className="flex gap-1">
                                            <span className="text-xs px-2 py-0.5 rounded bg-[#3a3a3c] text-[#a1a1a6]">react</span>
                                            <span className="text-xs px-2 py-0.5 rounded bg-[#3a3a3c] text-[#a1a1a6]">typescript</span>
                                        </div>
                                    </GlassCard>
                                </FloatingCard>

                                <FloatingCard className="bottom-20 right-10 w-60" delay={2}>
                                    <GlassCard className="p-4 border-blue-500/20">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                                                <GitBranch className="w-4 h-4 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-heading text-sm">Feature Dev</p>
                                                <p className="text-xs text-[#a1a1a6]">5 steps • 2-4 hours</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 mt-2">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className="h-1 flex-1 rounded-full bg-gradient-to-r from-blue-500/40 to-cyan-500/40" />
                                            ))}
                                        </div>
                                    </GlassCard>
                                </FloatingCard>

                                <FloatingCard className="bottom-0 left-10 w-56" delay={0.5}>
                                    <GlassCard className="p-3 border-purple-500/20">
                                        <div className="flex items-center gap-2 text-xs">
                                            <Check className="w-4 h-4 text-emerald-400" />
                                            <span className="text-body">Skill installed successfully!</span>
                                        </div>
                                    </GlassCard>
                                </FloatingCard>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Features Section */}
                <section className="py-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <p className="text-sm text-orange-400 uppercase tracking-wider mb-2">How it works</p>
                            <h2 className="text-3xl font-bold text-heading">Everything your team needs</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {features.map((feature) => (
                                <FeatureHighlight key={feature.title} {...feature} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Browse Section */}
                <section id="browse" className="px-6 pb-20 scroll-mt-10">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-heading mb-2">Browse the Playbook</h2>
                            <p className="text-body">Find the perfect agent, skill, or workflow for your task</p>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                            <CategoryTabs value={category} onValueChange={setCategory} />
                            <SearchBar
                                value={search}
                                onChange={setSearch}
                                placeholder={`Search ${category}...`}
                                className="w-full sm:flex-1"
                            />
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category === "agents" &&
                                filteredAgents.map((agent) => (
                                    <AgentCard key={agent.slug} agent={agent} />
                                ))}

                            {category === "skills" &&
                                filteredSkills.map((skill) => (
                                    <SkillCard
                                        key={skill.slug}
                                        skill={skill}
                                        onInstall={handleInstall}
                                    />
                                ))}

                            {category === "workflows" &&
                                filteredWorkflows.map((workflow) => (
                                    <WorkflowCard key={workflow.slug} workflow={workflow} />
                                ))}
                        </div>

                        {/* Empty State */}
                        {((category === "agents" && filteredAgents.length === 0) ||
                            (category === "skills" && filteredSkills.length === 0) ||
                            (category === "workflows" && filteredWorkflows.length === 0)) && (
                                <div className="text-center py-20">
                                    <Layers className="w-12 h-12 text-[#3a3a3c] mx-auto mb-4" />
                                    <p className="text-body">No {category} found matching your search.</p>
                                    <p className="text-sm text-[#a1a1a6] mt-1">Try a different search term</p>
                                </div>
                            )}
                    </div>
                </section>
            </div>

            {/* Install Modal */}
            <InstallModal
                skill={selectedSkill}
                open={installModalOpen}
                onOpenChange={setInstallModalOpen}
            />
        </div>
    );
}
