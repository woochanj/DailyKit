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
            className={`h-full group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 ${className}`}
        >
            <div className="z-10 flex flex-col gap-3">
                {icon && (
                    <div className="mb-2 w-fit rounded-full bg-blue-50 p-3 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                        {icon}
                    </div>
                )}
                <h3 className="font-semibold text-2xl tracking-tight text-gray-900">
                    {title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">{description}</p>
            </div>
            {children && <div className="mt-6">{children}</div>}
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
