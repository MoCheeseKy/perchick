import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-bold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-orange-600 text-white shadow-xs",
        secondary:
          "border-transparent bg-neutral-100 text-neutral-700",
        destructive:
          "border-transparent bg-red-600 text-white shadow-xs",
        outline: "text-neutral-700 border-neutral-200 bg-white",
        success:
          "border-transparent bg-emerald-50 text-emerald-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
