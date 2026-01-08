"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
    text: string;
    label?: string;
}

export function CopyButton({ text, label }: CopyButtonProps) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="h-8 px-3 rounded-lg bg-[#3a3a3c] hover:bg-[#48484a] text-xs"
        >
            {copied ? (
                <>
                    <Check className="w-3 h-3 mr-1.5 text-emerald-400" />
                    Copied!
                </>
            ) : (
                <>
                    <Copy className="w-3 h-3 mr-1.5" />
                    {label || "Copy"}
                </>
            )}
        </Button>
    );
}
