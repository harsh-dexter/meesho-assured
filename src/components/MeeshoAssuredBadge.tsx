import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface MeeshoAssuredBadgeProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const MeeshoAssuredBadge = ({ size = "md", className }: MeeshoAssuredBadgeProps) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs gap-1",
    md: "px-3 py-1.5 text-sm gap-1.5",
    lg: "px-4 py-2 text-base gap-2"
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4", 
    lg: "h-5 w-5"
  };

  return (
    <div className={cn(
      "inline-flex items-center rounded-full bg-trust text-trust-foreground font-medium shadow-sm",
      sizeClasses[size],
      className
    )}>
      <Shield className={iconSizes[size]} />
      <span>Meesho Assured</span>
    </div>
  );
};