import { ReactNode } from 'react';
import { Link } from '@/i18n/routing';

interface BentoCardProps {
    title: string;
    description: string;
    icon?: ReactNode;
    className?: string;
    href?: string;
    children?: ReactNode;
}

export default function BentoCard({
    title,
    description,
    icon,
    className = '',
    href,
    children,
}: BentoCardProps) {
    const Content = (
        <div
            className={`bento-card ${className}`}
        >
            <div className="z-10 flex flex-col gap-3 items-center w-full h-full justify-center">
                {icon && (
                    <div className="mb-4 text-gray-900 dark:text-gray-100">
                        {icon}
                    </div>
                )}
                <h3 className="text-gray-900 dark:text-gray-100">
                    {title}
                </h3>
                <p>{description}</p>
            </div>
            {children && <div className="mt-6 w-full">{children}</div>}
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="block h-full">
                {Content}
            </Link>
        );
    }

    return Content;
}
