export type CategoryType = 'agents' | 'skills' | 'workflows';

// Re-export content types for convenience
export type {
    ContentFile,
    AgentFrontmatter,
    SkillFrontmatter,
    WorkflowFrontmatter
} from '@/lib/content';
