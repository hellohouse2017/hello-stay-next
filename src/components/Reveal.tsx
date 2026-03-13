import { ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export default function Reveal({ children, className = "" }: RevealProps) {
    return (
        <div className={`reveal ${className}`}>
            {children}
        </div>
    );
}
