import type { ReactNode } from "react";
import { waLink } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

type WhatsAppLinkProps = {
  message: string;
  children?: ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "accent" | "outline" | "glass" | "soft" | "ghost";
};

export function WhatsAppLink({
  message,
  children = "Chat on WhatsApp",
  className,
  size = "default",
  variant = "default",
}: WhatsAppLinkProps) {
  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a href={waLink(message)} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon />
        <span>{children}</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </Button>
  );
}

export function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn(className)}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
