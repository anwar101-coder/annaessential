import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 border text-xs font-semibold uppercase tracking-[0.16em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-primary bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90",
        default: "border-primary bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90",
        destructive: "border-destructive bg-destructive px-6 py-3 text-destructive-foreground hover:bg-destructive/90",
        secondary: "border-secondary bg-secondary px-6 py-3 text-secondary-foreground hover:bg-secondary/80",
        link: "min-h-0 border-transparent bg-transparent px-1 py-0 text-primary underline-offset-4 hover:underline",
        gold: "border-gold bg-gold px-6 py-3 text-gold-foreground hover:bg-gold-deep",
        outline: "border-primary/30 bg-transparent px-6 py-3 text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "border-transparent bg-transparent px-3 py-2 text-foreground hover:bg-muted",
        icon: "size-11 border-border bg-background text-foreground hover:border-primary hover:text-primary",
      },
      size: {
        default: "h-12",
        sm: "h-10 px-4 text-[0.7rem]",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});

export { Button, buttonVariants };