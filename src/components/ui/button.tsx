import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20",
        destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:    "border border-clay bg-transparent text-ink hover:bg-clay/30 hover:border-moss",
        secondary:  "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:      "hover:bg-clay/30 text-ink",
        link:       "text-primary underline-offset-4 hover:underline",
        hero:       "bg-moss text-bg px-8 py-4 text-sm font-bold tracking-wide hover:bg-moss/90 shadow-xl shadow-moss/25 hover:shadow-moss/40 hover:scale-[1.02] transition-all",
        heroGlass:  "border-2 border-moss/40 text-ink bg-white/5 backdrop-blur-sm px-8 py-4 text-sm font-bold tracking-wide hover:bg-moss/10 hover:border-moss/70 transition-all",
        heroSolid:  "bg-ink text-bg px-8 py-4 text-sm font-bold tracking-wide hover:bg-ink/90 transition-all",
        gold:       "bg-gold text-bg px-8 py-4 text-sm font-bold tracking-wide hover:bg-gold/90 shadow-xl shadow-gold/20",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm:      "h-9 px-4 py-1.5 text-xs",
        lg:      "h-14 px-10 py-3 text-base",
        icon:    "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
