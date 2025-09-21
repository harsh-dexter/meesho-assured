import { Crown, Medal, Award, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type TierType = "bronze" | "silver" | "gold" | "platinum";

interface TierBadgeProps {
  tier: TierType;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

const tierConfig = {
  bronze: {
    label: "Bronze",
    icon: Star,
    bgColor: "bg-bronze",
    textColor: "text-bronze-foreground",
  },
  silver: {
    label: "Silver", 
    icon: Medal,
    bgColor: "bg-silver",
    textColor: "text-silver-foreground",
  },
  gold: {
    label: "Gold",
    icon: Award,
    bgColor: "bg-gold", 
    textColor: "text-gold-foreground",
  },
  platinum: {
    label: "Platinum",
    icon: Crown,
    bgColor: "bg-platinum",
    textColor: "text-platinum-foreground",
  },
};

export const TierBadge = ({ tier, size = "md", showIcon = true, className }: TierBadgeProps) => {
  const config = tierConfig[tier];
  const Icon = config.icon;

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
      "inline-flex items-center rounded-full font-medium shadow-sm",
      config.bgColor,
      config.textColor,
      sizeClasses[size],
      className
    )}>
      {showIcon && <Icon className={iconSizes[size]} />}
      <span>{config.label}</span>
    </div>
  );
};