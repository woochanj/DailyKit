import { ReactNode, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';

interface BentoCardProps {
    title: string;
    description: string;
    icon?: ReactNode;
    className?: string;
    href?: string;
    children?: ReactNode;
    size?: 'standard' | 'large' | 'tall';
    color?: string; // RGB string, e.g., "0, 113, 227"
}

export default function BentoCard({
    title,
    description,
    icon,
    className = '',
    href,
    children,
    size = 'standard',
    color = 'var(--accent-rgb)', // Default to accent color
}: BentoCardProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    // Size mapping to grid classes
    const sizeClasses = {
        standard: '',
        large: 'md:col-span-2 md:row-span-2',
        tall: 'md:row-span-2',
    };

    const combinedClassName = `
        group flex flex-col justify-center items-center text-center overflow-hidden relative h-full p-6 
        rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)] shadow-none 
        transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] 
        hover:border-[var(--foreground)] cursor-pointer 
        ${sizeClasses[size]} ${className}
    `.trim();

    const Content = (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={combinedClassName}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(${color}, 0.15), transparent 40%)`,
                }}
            />
            <div className="z-10 flex flex-col gap-3 items-center w-full h-full justify-center">
                {icon && (
                    <div
                        className="mb-4 transition-colors duration-300"
                        style={{ color: `rgb(${color})` }}
                    >
                        {icon}
                    </div>
                )}
                <h3 className="text-[1.25rem] font-medium mb-2 text-gray-900 dark:text-gray-100">
                    {title}
                </h3>
                <p className="text-[0.875rem] text-[var(--text-sub)]">{description}</p>
            </div>
            {children && <div className="mt-6 w-full">{children}</div>}
        </div>
    );

    if (href) {
        return (
            <Link href={href} className={`block h-full ${sizeClasses[size]} ${className}`}>
                {Content}
            </Link>
        );
    }

    return Content;
}
