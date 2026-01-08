import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Base content directory
const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface AgentFrontmatter {
    name: string;
    description: string;
    tools: string;
    model: string;
}

export interface SkillFrontmatter {
    name: string;
    description: string;
    version: string;
    author: string;
    tags: string[];
    installCommand?: string;
}

export interface WorkflowFrontmatter {
    name: string;
    description: string;
    estimatedTime: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface ContentFile<T> {
    slug: string;
    frontmatter: T;
    content: string;
    rawContent: string;
    lineCount: number;
    filePath: string;
}

/**
 * Parse a markdown file with frontmatter
 */
function parseMarkdownFile<T>(filePath: string): ContentFile<T> | null {
    try {
        const rawContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(rawContent);
        const lineCount = rawContent.split('\n').length;
        const slug = path.basename(filePath, '.md');

        return {
            slug,
            frontmatter: data as T,
            content: content.trim(),
            rawContent,
            lineCount,
            filePath: path.relative(process.cwd(), filePath),
        };
    } catch (error) {
        console.error(`Error parsing ${filePath}:`, error);
        return null;
    }
}

/**
 * Get all files from a content subdirectory
 */
function getFilesFromDir<T>(subDir: string): ContentFile<T>[] {
    const dirPath = path.join(CONTENT_DIR, subDir);

    if (!fs.existsSync(dirPath)) {
        return [];
    }

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));

    return files
        .map(file => parseMarkdownFile<T>(path.join(dirPath, file)))
        .filter((f): f is ContentFile<T> => f !== null);
}

/**
 * Get a single file by slug
 */
function getFileBySlug<T>(subDir: string, slug: string): ContentFile<T> | null {
    const filePath = path.join(CONTENT_DIR, subDir, `${slug}.md`);
    return parseMarkdownFile<T>(filePath);
}

// =============
// Agents
// =============
export function getAllAgents(): ContentFile<AgentFrontmatter>[] {
    return getFilesFromDir<AgentFrontmatter>('agents');
}

export function getAgentBySlug(slug: string): ContentFile<AgentFrontmatter> | null {
    return getFileBySlug<AgentFrontmatter>('agents', slug);
}

// =============
// Skills
// =============
export function getAllSkills(): ContentFile<SkillFrontmatter>[] {
    return getFilesFromDir<SkillFrontmatter>('skills');
}

export function getSkillBySlug(slug: string): ContentFile<SkillFrontmatter> | null {
    return getFileBySlug<SkillFrontmatter>('skills', slug);
}

// =============
// Workflows
// =============
export function getAllWorkflows(): ContentFile<WorkflowFrontmatter>[] {
    return getFilesFromDir<WorkflowFrontmatter>('workflows');
}

export function getWorkflowBySlug(slug: string): ContentFile<WorkflowFrontmatter> | null {
    return getFileBySlug<WorkflowFrontmatter>('workflows', slug);
}
