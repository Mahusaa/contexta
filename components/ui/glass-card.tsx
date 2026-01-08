"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "elevated" | "interactive";
    glow?: boolean;
    gradientBorder?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, variant = "default", glow = false, gradientBorder = false, children, ...props }, ref) => {
        const baseClasses = "rounded-2xl transition-all duration-300";

        const variantClasses = {
            default: "glass-card",
            elevated: "glass-card-elevated",
            interactive: "glass-card hover-lift cursor-pointer",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    baseClasses,
                    variantClasses[variant],
                    glow && "glow-purple-sm",
                    gradientBorder && "gradient-border",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
