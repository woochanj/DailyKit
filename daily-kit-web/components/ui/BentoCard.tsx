import { ReactNode } from 'react';
import { Link } from '@/i18n/routing';

interface BentoCardProps {
    title: string;
    description: string;
    icon?: ReactNode;
    className?: string;
    href?: string;
    children?: ReactNode;
    size?: 'standard' | 'large' | 'tall';
}

export default function BentoCard({
    title,
    description,
    icon,
    className = '',
    href,
    children,
    size = 'standard',
}: BentoCardProps) {
    // Size mapping to grid classes
    const sizeClasses = {
        standard: '',
        large: 'md:col-span-2 md:row-span-2',
        tall: 'md:row-span-2',
    };

    const combinedClassName = `
        flex flex-col justify-center items-center text-center overflow-hidden relative h-full p-6 
        rounded-[1.5rem] border border-[var(--border)] bg-transparent shadow-none 
        transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] 
        hover:border-[var(--foreground)] hover:opacity-70 cursor-pointer 
        ${sizeClasses[size]} ${className}
    `.trim();

    const Content = (
        <div className={combinedClassName}>
            <div className="z-10 flex flex-col gap-3 items-center w-full h-full justify-center">
                {icon && (
                    <div className="mb-4 text-gray-900 dark:text-gray-100">
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
