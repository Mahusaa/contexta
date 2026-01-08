export interface Agent {
    slug: string;
    name: string;
    description: string;
    category: string;
    icon: string;
    capabilities: string[];
    useCases: string[];
    systemPrompt?: string;
}

export interface Skill {
    slug: string;
    name: string;
    description: string;
    category: string;
    icon: string;
    version: string;
    author: string;
    installCommand: string;
    files: SkillFile[];
    dependencies?: string[];
    tags: string[];
}

export interface SkillFile {
    path: string;
    content: string;
    description: string;
}

export interface Workflow {
    slug: string;
    name: string;
    description: string;
    category: string;
    icon: string;
    steps: WorkflowStep[];
    estimatedTime: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface WorkflowStep {
    title: string;
    description: string;
    action?: string;
}

export type CategoryType = 'agents' | 'skills' | 'workflows';
