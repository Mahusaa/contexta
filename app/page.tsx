"use client";

import * as React from "react";
import { CategoryTabs } from "@/components/category-tabs";
import { SearchBar } from "@/components/search-bar";
import { SkillCard } from "@/components/skill-card";
import { AgentCard } from "@/components/agent-card";
import { WorkflowCard } from "@/components/workflow-card";
import { InstallModal } from "@/components/install-modal";
import { GlassCard } from "@/components/ui/glass-card";
import { Sparkles, Bot, Wrench, GitBranch } from "lucide-react";
import type { CategoryType, Agent, Skill, Workflow } from "@/types";

import agentsData from "@/data/agents.json";
import skillsData from "@/data/skills.json";
import workflowsData from "@/data/workflows.json";

const agents = agentsData as Agent[];
const skills = skillsData as Skill[];
const workflows = workflowsData as Workflow[];

export default function Home() {
  const [category, setCategory] = React.useState<CategoryType>("skills");
  const [search, setSearch] = React.useState("");
  const [selectedSkill, setSelectedSkill] = React.useState<Skill | null>(null);
  const [installModalOpen, setInstallModalOpen] = React.useState(false);

  const handleInstall = (skill: Skill) => {
    setSelectedSkill(skill);
    setInstallModalOpen(true);
  };

  // Filter items based on search
  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.description.toLowerCase().includes(search.toLowerCase()) ||
      agent.category.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSkills = skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(search.toLowerCase()) ||
      skill.description.toLowerCase().includes(search.toLowerCase()) ||
      skill.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredWorkflows = workflows.filter(
    (workflow) =>
      workflow.name.toLowerCase().includes(search.toLowerCase()) ||
      workflow.description.toLowerCase().includes(search.toLowerCase()) ||
      workflow.category.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { icon: Bot, label: "Agents", value: agents.length, color: "from-emerald-500/20 to-teal-500/20" },
    { icon: Wrench, label: "Skills", value: skills.length, color: "from-purple-500/20 to-indigo-500/20" },
    { icon: GitBranch, label: "Workflows", value: workflows.length, color: "from-blue-500/20 to-cyan-500/20" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Spotlights */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 spotlight-purple" />
        <div className="absolute inset-0 spotlight-orange" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <header className="pt-20 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-body">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>AI-Powered Development Playbook</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-heading leading-tight">
              Build faster with{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                AI-assisted
              </span>
              <br />
              development
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-body max-w-2xl mx-auto">
              Browse our collection of agents, skills, and workflows. Install them
              directly to your project and supercharge your development workflow.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-4 pt-6">
              {stats.map((stat) => (
                <GlassCard key={stat.label} className="px-6 py-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5 text-white/80" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-heading">{stat.value}</p>
                    <p className="text-xs text-muted-custom">{stat.label}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </header>

        {/* Browse Section */}
        <main className="px-6 pb-20">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <CategoryTabs value={category} onValueChange={setCategory} />
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder={`Search ${category}...`}
                className="w-full sm:w-80"
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
                  <p className="text-body">No {category} found matching your search.</p>
                </div>
              )}
          </div>
        </main>
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
