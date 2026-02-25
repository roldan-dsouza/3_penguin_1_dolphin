import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.97]",
    {
        variants: {
            variant: {
                default:
                    "bg-[#1E1E1E] text-white shadow-md hover:bg-[#333] hover:shadow-lg",
                outline:
                    "border-2 border-[#1E1E1E]/20 bg-transparent hover:bg-[#1E1E1E]/5",
                ghost: "hover:bg-[#1E1E1E]/5",
                secondary:
                    "bg-[#1E1E1E]/10 text-[#1E1E1E] hover:bg-[#1E1E1E]/20",
                destructive:
                    "bg-red-500 text-white hover:bg-red-600",
                accent:
                    "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-700",
            },
            size: {
                default: "h-12 px-6 py-3 text-base",
                sm: "h-9 px-4 text-sm",
                lg: "h-14 px-8 text-lg",
                xl: "h-16 px-10 text-xl",
                icon: "h-12 w-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
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
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
