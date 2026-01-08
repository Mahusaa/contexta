import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
    content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({ children }) => <h1 className="text-2xl font-bold text-heading mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl font-semibold text-heading mt-6 mb-3">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-medium text-heading mt-4 mb-2">{children}</h3>,
                p: ({ children }) => <p className="text-body mb-3 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-4 text-body">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-4 text-body">{children}</ol>,
                li: ({ children }) => <li className="text-body">{children}</li>,
                code: ({ className, children }) => {
                    const isInline = !className;
                    if (isInline) {
                        return <code className="bg-[#3a3a3c] px-1.5 py-0.5 rounded text-orange-400 text-sm">{children}</code>;
                    }
                    return <code className={className}>{children}</code>;
                },
                pre: ({ children }) => (
                    <pre className="bg-[#1c1c1e] rounded-xl p-4 overflow-x-auto mb-4 text-sm">
                        {children}
                    </pre>
                ),
                strong: ({ children }) => <strong className="font-semibold text-heading">{children}</strong>,
                a: ({ href, children }) => (
                    <a href={href} className="text-orange-400 hover:text-orange-300 underline" target="_blank" rel="noopener noreferrer">
                        {children}
                    </a>
                ),
                blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-orange-500/50 pl-4 italic text-[#a1a1a6] my-4">
                        {children}
                    </blockquote>
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
